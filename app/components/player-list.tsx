import type { Player } from '@prisma/client'

type PlayerListProps = {
  players: { player: Player }[]
}

export const PlayerList: React.FC<PlayerListProps> = ({ players }) => {
  return (
    <ul>
      {players.map(({ player }) => (
        <li key={player.id}>
          {player.name} -{' '}
          <span className="text-gray-500">(level: {player.level})</span>
        </li>
      ))}
    </ul>
  )
}
