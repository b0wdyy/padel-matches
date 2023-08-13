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
    <div className="grid h-screen w-screen place-items-center">
      <div>
        <h1 className="mb-4 mt-8 text-4xl font-bold">Matches</h1>

        <div className="flex flex-col gap-4">
          {data.matches.map((match) => (
            <MatchItem key={match.id} match={match} />
          ))}
        </div>
      </div>
    </div>
  )
}
