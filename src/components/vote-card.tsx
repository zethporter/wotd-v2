import { IconHeartFilled } from '@tabler/icons-react'
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
  setVotee: (id: WrestlerInsert) => void
}) => {
  return (
    <Item variant="outline">
      <ItemContent>
        <ItemTitle>{wrestler.name}</ItemTitle>
        <ItemDescription>{wrestler.school}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          type="button"
          variant="outline"
          size="icon-lg"
          onClick={() => setVotee(wrestler)}
        >
          <IconHeartFilled className="fill-primary" />
        </Button>
      </ItemActions>
    </Item>
  )
}
