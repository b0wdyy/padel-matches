import { MantineProvider, createEmotionCache } from '@mantine/core'
import { StylesPlaceholder } from '@mantine/remix'
import type { V2_MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

import { theme } from './theme'

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'My padel matches' },
    { name: 'description', content: 'Database for my padel matches' },
  ]
}

createEmotionCache({ key: 'mantine' })

export default function App() {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <html lang="en">
        <head>
          <StylesPlaceholder />
          <Meta />
          <Links />
        </head>
        <body>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </MantineProvider>
  )
}
