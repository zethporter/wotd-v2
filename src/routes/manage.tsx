import { createFileRoute } from '@tanstack/react-router'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type PaginationState,
} from '@tanstack/react-table'
import { useState } from 'react'
import {
  getWrestlersWithVoteCounts,
  deleteWrestler,
  updateWrestler,
} from '@/serverFunctions/tursoFunctions'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IconDotsVertical, IconSearch } from '@tabler/icons-react'
import { toast } from 'sonner'
import {
  AddSingleWrestler,
  WrestlersUpload,
} from '@/components/wrestler-upload'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'

export const Route = createFileRoute('/manage')({
  loader: async () => {
    const result = await getWrestlersWithVoteCounts()
    return { wrestlers: result.data, totalVotes: result.totalVotes }
  },
  component: RouteComponent,
})

type WrestlerWithVoteCount = {
  id: string
  name: string
  school: string
  voteCount: number
}

function RouteComponent() {
  const { wrestlers, totalVotes } = Route.useLoaderData()
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [globalFilter, setGlobalFilter] = useState('')
  const [editingWrestler, setEditingWrestler] =
    useState<WrestlerWithVoteCount | null>(null)
  const [deletingWrestler, setDeletingWrestler] =
    useState<WrestlerWithVoteCount | null>(null)
  const [editForm, setEditForm] = useState({ name: '', school: '' })

  const handleEdit = (wrestler: WrestlerWithVoteCount) => {
    setEditingWrestler(wrestler)
    setEditForm({ name: wrestler.name, school: wrestler.school })
  }

  const handleDelete = (wrestler: WrestlerWithVoteCount) => {
    setDeletingWrestler(wrestler)
  }

  const confirmDelete = async () => {
    if (!deletingWrestler) return

    try {
      const result = await deleteWrestler({ data: deletingWrestler.id })
      if (result.success) {
        toast.success(result.message)
        window.location.reload()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error('Failed to delete wrestler')
    } finally {
      setDeletingWrestler(null)
    }
  }

  const submitEdit = async () => {
    if (!editingWrestler) return

    const updates: { name?: string; school?: string } = {}
    if (editForm.name !== editingWrestler.name) updates.name = editForm.name
    if (editForm.school !== editingWrestler.school)
      updates.school = editForm.school

    if (Object.keys(updates).length === 0) {
      toast.info('No changes to save')
      setEditingWrestler(null)
      return
    }

    try {
      const result = await updateWrestler({
        data: {
          id: editingWrestler.id,
          newValues: updates,
        },
      })
      if (result.success) {
        toast.success(result.message)
        window.location.reload()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error('Failed to update wrestler')
    } finally {
      setEditingWrestler(null)
    }
  }

  const columns: ColumnDef<WrestlerWithVoteCount>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'school',
      header: 'School',
    },
    {
      accessorKey: 'voteCount',
      header: 'Votes',
    },
    {
      id: 'actions',
      header: () => null,
      cell: ({ row }) => {
        const wrestler = row.original
        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="ghost" size="icon-sm" />}
              >
                <IconDotsVertical className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleEdit(wrestler)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => handleDelete(wrestler)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: wrestlers,
    columns,
    state: {
      pagination,
      globalFilter,
    },
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const search = filterValue.toLowerCase()
      const name = row.original.name.toLowerCase()
      const school = row.original.school.toLowerCase()
      return name.includes(search) || school.includes(search)
    },
  })

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Manage Wrestlers</h1>
        <p className="text-muted-foreground mt-1">
          View and manage all wrestlers and their votes
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Total votes: <span className="font-semibold">{totalVotes}</span>
        </p>
      </div>

      <div className="flex flex-row justify-between gap-2 py-4">
        {/* Search */}
        <InputGroup className="max-w-2xl self-center">
          <InputGroupInput
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-8"
            placeholder="Search Name or School"
          />
          <InputGroupAddon>
            <IconSearch />
          </InputGroupAddon>
        </InputGroup>
        <div className="flex flex-row gap-2 justify-between">
          <AddSingleWrestler />
          <WrestlersUpload />
        </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No wrestlers found.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {table.getPageCount() > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing{' '}
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}{' '}
            to{' '}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length,
            )}{' '}
            of {table.getFilteredRowModel().rows.length} results
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => table.previousPage()}
                  className={
                    !table.getCanPreviousPage()
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer'
                  }
                />
              </PaginationItem>
              {generatePaginationLinks(
                table.getState().pagination.pageIndex,
                table.getPageCount(),
              ).map((page, idx) =>
                page === '...' ? (
                  <PaginationItem key={`ellipsis-${idx}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => table.setPageIndex(page as number)}
                      isActive={table.getState().pagination.pageIndex === page}
                      className="cursor-pointer"
                    >
                      {(page as number) + 1}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() => table.nextPage()}
                  className={
                    !table.getCanNextPage()
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer'
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog
        open={!!editingWrestler}
        onOpenChange={(open) => !open && setEditingWrestler(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Wrestler</DialogTitle>
            <DialogDescription>
              Update the wrestler's name or school
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="school" className="text-sm font-medium">
                School
              </label>
              <Input
                id="school"
                value={editForm.school}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, school: e.target.value }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingWrestler(null)}>
              Cancel
            </Button>
            <Button onClick={submitEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deletingWrestler}
        onOpenChange={(open) => !open && setDeletingWrestler(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {deletingWrestler?.name} from{' '}
              {deletingWrestler?.school}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingWrestler(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function generatePaginationLinks(currentPage: number, totalPages: number) {
  const pages: (number | '...')[] = []

  if (totalPages <= 7) {
    for (let i = 0; i < totalPages; i++) {
      pages.push(i)
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 0; i < 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(totalPages - 1)
    } else if (currentPage >= totalPages - 4) {
      pages.push(0)
      pages.push('...')
      for (let i = totalPages - 5; i < totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(0)
      pages.push('...')
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(totalPages - 1)
    }
  }

  return pages
}
