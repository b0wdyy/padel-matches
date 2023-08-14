import { Box, Flex, Stack, Title } from '@mantine/core'
import { typedjson, useTypedLoaderData } from 'remix-typedjson'

import { MatchItem } from '~/components/match-item'
import { prisma } from '~/db.server'

export async function loader() {
  const matches = await prisma.match.findMany({
    include: {
      players: {
        select: {
          player: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })

  return typedjson({ matches })
}

export default function Matches() {
  const data = useTypedLoaderData<typeof loader>()

  return (
    <Flex h="100vh" w="100vw" justify="center" align="center">
      <Box>
        <Title mb={16}>Matches</Title>

        <Stack>
          {data.matches.map((match) => (
            <MatchItem key={match.id} match={match} />
          ))}
        </Stack>
      </Box>
    </Flex>
  )
}
