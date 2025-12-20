import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'
import { atomWithStorage } from 'jotai/utils'
import { useAtom } from 'jotai'
import { AnimatePresence, motion } from 'motion/react'
import {
  IconConfettiFilled,
  IconExclamationCircleFilled,
  IconLoader3,
} from '@tabler/icons-react'
import type { WrestlerInsert } from '@/db/schema/app'
import { getAllWrestlers, submitVote } from '@/serverFunctions/tursoFunctions'
import { useFingerprint } from '@/components/fingerprint-provider'
import { VoteCard } from '@/components/vote-card'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog'
import { VoteSearch } from '@/components/vote-search'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type VoteStatus = 'selecting' | 'voting' | 'submitted' | 'error'
const voteStatusAtom = atomWithStorage<VoteStatus>('voteStatus', 'selecting')

export const Route = createFileRoute('/vote')({
  loader: async () => {
    return await getAllWrestlers()
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AnimatePresence>
      <RouteContent />
    </AnimatePresence>
  )
}

function RouteContent() {
  const { data } = Route.useLoaderData()
  const { fingerprint } = useFingerprint()

  const [voteStatus, setVoteStatus] = useAtom(voteStatusAtom)
  const [votee, setVotee] = useState<WrestlerInsert | null>(null)
  const [search, setSearch] = useState<string>('')

  const handleVote = async () => {
    if (votee && fingerprint) {
      setVoteStatus('voting')
      const res = await submitVote({
        data: { wrestlerId: votee.id, fingerprint: fingerprint },
      })
      if (res.success) {
        setVoteStatus('submitted')
      } else {
        setVoteStatus('error')
      }
    }
    toast.error('Something went wrong. Please refresh and try again')
  }

  switch (voteStatus) {
    case 'selecting':
      return (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="h-screen flex flex-col p-4 gap-4 overflow-hidden"
        >
          <VoteSearch value={search} search={setSearch} />
          <div className="grow overflow-auto pt-10 pb-32">
            <div className="flex w-full max-w-md flex-col gap-4 mx-auto">
              {data
                .filter(
                  (wrestler) =>
                    wrestler.name
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    wrestler.school
                      .toLowerCase()
                      .includes(search.toLowerCase()),
                )
                .map((wrestler) => (
                  <VoteCard
                    key={wrestler.id}
                    wrestler={wrestler}
                    setVotee={setVotee}
                  />
                ))}
            </div>
            <ProgressiveBlur height="25%" position="bottom" />
          </div>
          <Dialog open={!!votee} onOpenChange={() => setVotee(null)}>
            <DialogPortal>
              <DialogContent>
                <DialogTitle className="text-2xl font-semibold">
                  Confirm Vote For
                </DialogTitle>
                <div>
                  <div className="flex flex-row flex-wrap gap-2">
                    <p className="w-full text-lg font-bold">
                      {votee ? votee.name : ''}
                    </p>
                    <Badge variant="outline">{votee ? votee.school : ''}</Badge>
                  </div>
                  <div className="flex justify-start flex-row-reverse gap-4 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleVote()}
                    >
                      Confirm
                    </Button>
                    <DialogClose>
                      <Button type="button" variant="destructive">
                        Cancel
                      </Button>
                    </DialogClose>
                  </div>
                </div>
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </motion.div>
      )
    case 'voting':
      return (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="w-full h-screen flex flex-col justify-center"
        >
          <div className="flex flex-row gap-5 justify-center items-center">
            <span className="animate-spin duration-200">
              <IconLoader3 />
            </span>
            <span>Submitting Vote</span>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setVoteStatus('submitted')}
          >
            Confirm
          </Button>
        </motion.div>
      )
    case 'submitted':
      return (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="w-full h-screen flex flex-col justify-center"
        >
          <div className="flex flex-row gap-5 justify-center items-center">
            <span>
              <IconConfettiFilled />
            </span>
            <span>Thanks For Voting!</span>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setVoteStatus('error')}
          >
            Confirm
          </Button>
        </motion.div>
      )
    case 'error':
      return (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="w-full h-screen flex flex-col justify-center gap-10"
        >
          <div className="flex flex-row gap-5 justify-center">
            <span>
              <IconExclamationCircleFilled />
            </span>
            <span>Something Went wrong please try again</span>
          </div>
          <div className="flex justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => setVoteStatus('selecting')}
            >
              Select Wrestler
            </Button>
          </div>
        </motion.div>
      )
  }
}
