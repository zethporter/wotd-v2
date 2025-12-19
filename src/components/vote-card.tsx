import { IconSend } from '@tabler/icons-react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from './ui/item'
import type { WrestlerInsert } from '@/db/schema/app'

export const VoteCard = ({
  wrestler,
  setVotee,
}: {
  wrestler: WrestlerInsert
  setVotee: (id: string) => void
}) => {
  return (
    <Item variant="outline">
      <ItemContent>
        <ItemTitle>{wrestler.name}</ItemTitle>
        <ItemDescription>{wrestler.school}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          variant="outline"
          size="icon-lg"
          onClick={() => setVotee(wrestler.id)}
        >
          <IconSend />
        </Button>
      </ItemActions>
    </Item>
  )
}
