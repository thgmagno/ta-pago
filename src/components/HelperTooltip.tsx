import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { BadgeHelp } from 'lucide-react'

export function HelperTooltip({
  title,
  text,
}: {
  title: string
  text: string
}) {
  return (
    <div className="flex">
      <HoverCard>
        <HoverCardTrigger asChild>
          <BadgeHelp className="h-4 w-4 cursor-help text-blue-400 hover:text-blue-500" />
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex justify-between space-x-4">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">{title}</h4>
              <p className="text-sm">{text}</p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}
