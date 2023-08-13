import { ArrowRightIcon } from '@radix-ui/react-icons'
import { Link } from '@remix-run/react'

export default function Index() {
  return (
    <div className="grid h-screen w-screen place-items-center">
      <h1>Improving my padel. One game at a time.</h1>

      <Link
        to="/matches"
        className="flex items-center gap-2 rounded-lg p-4 transition-colors hover:bg-slate-200 focus:bg-slate-200"
      >
        Watch all matches
        <ArrowRightIcon />
      </Link>
    </div>
  )
}
