import { IconSearch, IconX } from '@tabler/icons-react'

import { Button } from './ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'

export function VoteSearch({
  value,
  search,
}: {
  value: string
  search: (e: string) => void
}) {
  return (
    <InputGroup className="max-w-2xl self-center">
      <InputGroupInput
        value={value}
        onChange={(e) => search(e.target.value)}
        placeholder="Search..."
        className="bg-primary"
      />
      <InputGroupAddon>
        <IconSearch />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <Button
          disabled={value === ''}
          onClick={() => search('')}
          size="icon-xs"
          variant="ghost"
        >
          <IconX />
        </Button>
      </InputGroupAddon>
    </InputGroup>
  )
}
