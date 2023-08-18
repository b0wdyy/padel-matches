import { Outlet } from '@remix-run/react'

import { MatchesNav } from '~/components/matches/matches-nav'

export default function MatchesWrapper() {
  return (
    <div>
      <MatchesNav />
      <Outlet />
    </div>
  )
}
