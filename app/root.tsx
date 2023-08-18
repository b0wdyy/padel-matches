import { useEffect, useState } from 'react'

import type { ColorScheme } from '@mantine/core'
import {
  ColorSchemeProvider,
  MantineProvider,
  createEmotionCache,
} from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
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

import { DarkModeToggle } from '~/components/common/dark-mode-toggle'
import { Nav } from '~/components/common/nav'
import { PageLoader } from '~/components/common/page-loader'

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'My padel matches' },
    { name: 'description', content: 'Database for my padel matches' },
  ]
}

createEmotionCache({ key: 'mantine' })

export default function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  })
  const [pageLoaderVisible, setPageLoaderVisible] = useState(true)

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPageLoaderVisible(false)
    }, 500)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <html lang="en">
          <head>
            <StylesPlaceholder />
            <Meta />
            <Links />
          </head>
          <body>
            <Nav />
            {pageLoaderVisible ? <PageLoader /> : null}
            <Outlet />
            <DarkModeToggle />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </body>
        </html>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
