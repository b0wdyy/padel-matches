import { Box, Container, Flex, Text, Title } from '@mantine/core'
import type { V2_MetaFunction, LoaderArgs } from '@remix-run/node'
import {
  isRouteErrorResponse,
  useParams,
  useRouteError,
} from '@remix-run/react'
import { typedjson, useTypedLoaderData } from 'remix-typedjson'
import invariant from 'tiny-invariant'

import { CommentList } from '~/components/comments/list'
import { PlayerList } from '~/components/players/list'
import { getMatch } from '~/controllers/match.server'
import { CommentType } from '~/models/comment'

export async function loader({ params }: LoaderArgs) {
  invariant(params.id, 'id is required')
  const match = await getMatch(+params.id)

  if (!match) {
    throw new Response('Not Found', { status: 404 })
  }

  const mappedMatch = {
    ...match,
    comments: {
      negative: match.comments.filter(
        (comment) => comment.type === CommentType.NEGATIVE
      ),
      positive: match.comments.filter(
        (comment) => comment.type === CommentType.POSITIVE
      ),
    },
  }

  return typedjson({ match: mappedMatch })
}

export const meta: V2_MetaFunction = ({ params }) => {
  return [
    { title: `My padel matches | Match ${params.id}` },
    { name: 'description', content: 'Database for my padel matches' },
  ]
}

export default function Match() {
  const data = useTypedLoaderData<typeof loader>()

  return (
    <Container py={32}>
      <Title>{data.match.title}</Title>

      <Box mt={32}>
        <Title mb={8} order={2}>
          Players
        </Title>

        <PlayerList players={data.match.players} />
      </Box>

      <Box component="section" mt={32}>
        <Title order={2} mb={8}>
          Comments
        </Title>

        <Text>Sommige comments over hoe de match is gegaan.</Text>

        <Flex gap={32} mt={24}>
          <Box>
            <Title order={3} mb={8}>
              Positieve comments
            </Title>

            {data.match.comments.positive.length === 0 ? (
              <Text>Geen positieve comments</Text>
            ) : (
              <CommentList
                type={CommentType.POSITIVE}
                comments={data.match.comments.positive}
              />
            )}
          </Box>

          <Box component="section" mt={16}>
            <Title order={3} mb={8}>
              Negatieve comments
            </Title>

            {data.match.comments.positive.length === 0 ? (
              <Text>Geen negatieve comments</Text>
            ) : (
              <CommentList
                type={CommentType.NEGATIVE}
                comments={data.match.comments.negative}
              />
            )}
          </Box>
        </Flex>
      </Box>

      <Box>
        <Title order={2}>Location</Title>

        <Text>Gespeeld {data.match.location.city}</Text>
      </Box>
    </Container>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
  const params = useParams()

  if (error instanceof Error) {
    return <div>An unexpected error occurred: {error.message}</div>
  }

  if (!isRouteErrorResponse(error)) {
    return <h1>Unknown Error</h1>
  }

  if (error.status === 404) {
    return <div>Match with id "{params.id}" not found</div>
  }

  return <div>An unexpected error occurred: {error.statusText}</div>
}
