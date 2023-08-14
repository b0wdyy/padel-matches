import { List, Text } from '@mantine/core'
import type { Player } from '@prisma/client'

type PlayerListProps = {
  players: { player: Player }[]
}

export const PlayerList: React.FC<PlayerListProps> = ({ players }) => {
  return (
    <List listStyleType="none">
      {players.map(({ player }) => (
        <List.Item key={player.id}>
          {player.name} -{' '}
          <Text component="span" color="dimmed">
            (level: {player.level})
          </Text>
        </List.Item>
      ))}
    </List>
  )
}
