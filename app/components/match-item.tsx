import { Box, Card, Flex, Text } from '@mantine/core'
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
    <Card
      component={Link}
      to={match.id.toString()}
      className="rounded-lg bg-slate-200 p-4"
    >
      <Flex align="center" justify="space-between" gap={8}>
        <Box>
          <Text>{match.title}</Text>
          <Text size="sm" color="dimmed">
            {match.players.map((player) => player.player.name).join(', ')}
          </Text>
        </Box>

        <DoubleArrowRightIcon />
      </Flex>
    </Card>
  )
}
