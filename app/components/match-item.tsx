import type { Match } from '@prisma/client'
import { DoubleArrowRightIcon } from '@radix-ui/react-icons'
import { Link } from '@remix-run/react'

type MatchItemProps = {
  match: Match & {
    players: {
      player: {
        name: string
      }
    }[]
  }
}

export const MatchItem: React.FC<MatchItemProps> = ({ match }) => {
  return (
    <Link to={match.id.toString()} className="rounded-lg bg-slate-200 p-4">
      <div className="flex items-center justify-between gap-8">
        <div>
          <p>{match.title}</p>
          <p className="text-sm text-gray-400">
            {match.players.map((player) => player.player.name).join(', ')}
          </p>
        </div>

        <DoubleArrowRightIcon />
      </div>
    </Link>
  )
}
