import { cache } from 'react'
import NextAuth from 'next-auth'

import { authConfig } from './config'

export type { Session } from 'next-auth'

const { auth: defaultAuth, handlers, signIn, signOut } = NextAuth(authConfig),
  auth = cache(defaultAuth)

export { auth, handlers, signIn, signOut }

export { invalidateSessionToken, isSecureContext, validateToken } from './config'
