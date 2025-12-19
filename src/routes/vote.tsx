import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { getAllWrestlers, submitVote } from '@/serverFunctions/tursoFunctions'
import { useFingerprint } from '@/components/fingerprint-provider'
import { VoteCard } from '@/components/vote-card'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { VoteSearch } from '@/components/vote-search'

export const Route = createFileRoute('/vote')({
  loader: async () => {
    return await getAllWrestlers()
  },
  component: RouteComponent,
})

type VoteStatus = 'voting' | 'submitted' | 'error'

function RouteComponent() {
  const { data } = Route.useLoaderData()
  const { fingerprint } = useFingerprint()

  const [voteStatus, setVoteStatus] = useState<VoteStatus>('voting')
  const [votee, setVotee] = useState<string | null>(null)
  const [search, setSearch] = useState<string>('')

  return (
    <div className="h-screen flex flex-col p-4 gap-4 overflow-hidden">
      <VoteSearch value={search} search={setSearch} />
      <div className="grow overflow-auto pt-10 pb-32">
        <div className="flex w-full max-w-md flex-col gap-4 mx-auto">
          {data
            .filter((wrestler) =>
              wrestler.name.toLowerCase().includes(search.toLowerCase()),
            )
            .map((wrestler) => (
              <VoteCard
                key={wrestler.id}
                wrestler={wrestler}
                setVotee={setVotee}
              />
            ))}
        </div>
        <ProgressiveBlur height="20%" position="bottom" />
      </div>
    </div>
  )
}
