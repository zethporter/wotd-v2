import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { IconUsersPlus, IconUserPlus } from '@tabler/icons-react'
import { Input } from './ui/input'
import { toast } from 'sonner'
import { type ChangeEvent, type FormEvent, useState } from 'react'
import Papa from 'papaparse'
import z from 'zod'
import { addWrestlers } from '@/serverFunctions/tursoFunctions'
import { Button } from './ui/button'
import type { BaseWrestlers } from '@/db/schema/app'

const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  toast.loading('Validating Wrestlers list', { id: 'wrestlers' })

  const files = event.target.files

  if (files && files.length > 0) {
    const file = files[0]

    // Optional: Validate file type client-side (browser might allow others despite 'accept')
    if (file.type !== 'text/csv' && !file.name.toLowerCase().endsWith('.csv')) {
      toast.error('Error: Please select a valid .csv file.', {
        id: 'wrestlers',
      })
      // Clear the file input value so the user can select the same file again if needed
      event.target.value = ''
      return
    }

    // Use PapaParse to parse the CSV file
    Papa.parse<{ name: string; school: string }>(file, {
      header: true, // Treat the first row as headers
      skipEmptyLines: true, // Skip empty rows
      dynamicTyping: false, // Keep as strings for validation
      complete: async (results) => {
        if (results.data.length > 0) {
          // Transform and validate the data
          const wrestlersData = results.data.map((row) => ({
            id: '', // Will be transformed by zod schema
            name: row.name,
            school: row.school,
          }))

          toast.success('Wrestlers Validated', { id: 'wrestlers' })
          const res = await addWrestlers({ data: wrestlersData })
          if (res.success) {
            toast.success('Wrestlers Added Successfully')
          } else {
            toast.error(res.message)
          }
        } else {
          toast.warning('No Valid Wrestlers Found', { id: 'wrestlers' })
        }
      },
      error: (err) => {
        toast.error(`PapaParse Error: ${err}`, { id: 'wrestlers' })
      },
    })
  } else {
    toast.warning('No file selected.', { id: 'wrestlers' })
  }
}

export const WrestlersUpload = () => (
  <Dialog>
    <DialogTrigger>
      <Button variant="secondary">
        <IconUsersPlus /> Upload Wrestlers
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Upload Wrestlers</DialogTitle>{' '}
        <DialogDescription>
          Upload CSV Files to mass insert wrestlers
        </DialogDescription>
      </DialogHeader>
      <Input type="file" onChange={handleFileChange} />
    </DialogContent>
  </Dialog>
)

export const AddSingleWrestler = () => {
  const [name, setName] = useState('')
  const [school, setSchool] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name.trim() || !school.trim()) {
      toast.error('Please fill in both name and school')
      return
    }

    toast.loading('Adding wrestler', { id: 'add-wrestler' })

    const wrestlerData = [
      {
        id: '',
        name: name.trim(),
        school: school.trim(),
      },
    ]

    const res = await addWrestlers({ data: wrestlerData })
    if (res.success) {
      toast.success('Wrestler added successfully', { id: 'add-wrestler' })
      setName('')
      setSchool('')
      setIsOpen(false)
    } else {
      toast.error(res.message, { id: 'add-wrestler' })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button>
          <IconUserPlus /> Add Wrestler
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Wrestler</DialogTitle>
          <DialogDescription>
            Add a single wrestler to the database
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter wrestler name"
              required
            />
          </div>
          <div>
            <label htmlFor="school" className="text-sm font-medium">
              School
            </label>
            <Input
              id="school"
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder="Enter school name"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Add Wrestler
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
