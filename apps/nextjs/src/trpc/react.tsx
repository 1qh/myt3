'use client'

import type { AppRouter } from '@a/api'
import type { QueryClient } from '@tanstack/react-query'

import { QueryClientProvider } from '@tanstack/react-query'
import { createTRPCClient, loggerLink, unstable_httpBatchStreamLink } from '@trpc/client'
import { createTRPCContext } from '@trpc/tanstack-react-query'
import { useState } from 'react'
import SuperJSON from 'superjson'

import { env } from '~/env'

import { createQueryClient } from './query-client'

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return window.location.origin
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`
  // eslint-disable-next-line no-restricted-properties
  return `http://localhost:${process.env.PORT ?? 3000}`
}
let clientQueryClientSingleton: QueryClient | undefined
const getQueryClient = () => {
  if (typeof window === 'undefined') return createQueryClient()
  return (clientQueryClientSingleton ??= createQueryClient())
}
export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>()
export const TRPCReactProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient(),
    [trpcClient] = useState(() =>
      createTRPCClient<AppRouter>({
        links: [
          loggerLink({
            enabled: op => env.NODE_ENV === 'development' || (op.direction === 'down' && op.result instanceof Error)
          }),
          unstable_httpBatchStreamLink({
            headers: () => {
              const headers = new Headers()
              headers.set('x-trpc-source', 'nextjs-react')
              return headers
            },
            transformer: SuperJSON,
            url: `${getBaseUrl()}/api/trpc`
          })
        ]
      })
    )
  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider queryClient={queryClient} trpcClient={trpcClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  )
}
