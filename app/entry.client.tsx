import { startTransition, StrictMode } from 'react'

import { ClientProvider } from '@mantine/remix'
import { RemixBrowser } from '@remix-run/react'
import { hydrateRoot } from 'react-dom/client'

startTransition(() => {
  hydrateRoot(
    document,
    <ClientProvider>
      <StrictMode>
        <RemixBrowser />
      </StrictMode>
    </ClientProvider>
  )
})
