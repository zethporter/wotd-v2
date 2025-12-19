import {
  IconArrowUp,
  IconCheck,
  IconInfoCircle,
  IconPlus,
  IconSearch,
} from '@tabler/icons-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export function VoteSearch({
  value,
  search,
}: {
  value: string
  search: (e: string) => void
}) {
  return (
    <InputGroup>
      <InputGroupTextarea
        value={value}
        onChange={(e) => search(e.target.value)}
        placeholder="Search..."
      />
      <InputGroupAddon align="block-end">
        <InputGroupButton
          variant="outline"
          className="rounded-full"
          size="icon-xs"
        >
          <IconPlus />
        </InputGroupButton>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <InputGroupButton variant="ghost">Auto</InputGroupButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            align="start"
            className="[--radius:0.95rem]"
          >
            <DropdownMenuItem>Auto</DropdownMenuItem>
            <DropdownMenuItem>Agent</DropdownMenuItem>
            <DropdownMenuItem>Manual</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <InputGroupText className="ml-auto">52% used</InputGroupText>
        <Separator orientation="vertical" className="!h-4" />
        <InputGroupButton
          variant="default"
          className="rounded-full"
          size="icon-xs"
          disabled
        >
          <IconArrowUp />
          <span className="sr-only">Send</span>
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
