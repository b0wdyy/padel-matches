import { type LoaderArgs } from '@remix-run/node'
import { getMatch } from '~/controllers/match.server'
import invariant from 'tiny-invariant'
import { isRouteErrorResponse, useRouteError } from '@remix-run/react'
import { typedjson, useTypedLoaderData } from 'remix-typedjson'

export async function loader({ params }: LoaderArgs) {
  invariant(params.id, 'id is required')
  const match = await getMatch(+params.id)

  if (!match) {
    throw new Response('Not Found', { status: 404 })
  }

  return typedjson({ match })
}

export default function Match() {
  const data = useTypedLoaderData<typeof loader>()

  return (
    <div>
      <p>{data.match.title}</p>
    </div>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()

  if (error instanceof Error) {
    return <div>An unexpected error occurred: {error.message}</div>
  }

  if (!isRouteErrorResponse(error)) {
    return <h1>Unknown Error</h1>
  }

  if (error.status === 404) {
    return <div>Note not found</div>
  }

  return <div>An unexpected error occurred: {error.statusText}</div>
}
