import type { V2_MetaFunction } from '@remix-run/node'

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'My padel matches | New match' },
    { name: 'description', content: 'Database for my padel matches' },
  ]
}

export default function NewMatch() {
  return (
    <div>
      <h1>New Match</h1>
    </div>
  )
}
