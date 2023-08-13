import type { V2_MetaFunction, LoaderArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import {
  isRouteErrorResponse,
  useParams,
  useRouteError,
} from '@remix-run/react'
import { typedjson, useTypedLoaderData } from 'remix-typedjson'

import { getMatch } from '~/controllers/match.server'
import { CommentType } from '~/models/comment'
import { PlayerList } from '~/components/player-list'
import { CommentList } from '~/components/comments/list'

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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{data.match.title}</h1>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">Players</h2>

        <PlayerList players={data.match.players} />
      </section>

      <section className="mt-8">
        <h2 className="mb-2 text-2xl font-bold">Comments</h2>

        <p>Sommige comments over hoe de match is gegaan.</p>

        <section className="mt-4">
          <h3 className="mb-2 text-xl font-bold">Positieve comments</h3>

          {data.match.comments.positive.length === 0 ? (
            <p>Geen positieve comments</p>
          ) : (
            <CommentList
              type={CommentType.POSITIVE}
              comments={data.match.comments.positive}
            />
          )}
        </section>

        <section className="mt-4">
          <h3 className="mb-2 text-xl font-bold">Negatieve comments</h3>

          {data.match.comments.positive.length === 0 ? (
            <p>Geen negatieve comments</p>
          ) : (
            <CommentList
              type={CommentType.NEGATIVE}
              comments={data.match.comments.negative}
            />
          )}
        </section>
      </section>
    </div>
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
