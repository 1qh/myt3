'use client'

import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { cn } from '@a/ui'

const Avatar = ({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Root>) => (
    <AvatarPrimitive.Root
      className={cn('flex overflow-hidden relative rounded-full shrink-0 size-8', className)}
      data-slot='avatar'
      {...props}
    />
  ),
  AvatarImage = ({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) => (
    <AvatarPrimitive.Image
      className={cn('aspect-square size-full', className)}
      data-slot='avatar-image'
      {...props}
    />
  ),
  AvatarFallback = ({
    className,
    ...props
  }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) => (
    <AvatarPrimitive.Fallback
      className={cn('bg-muted flex items-center justify-center rounded-full size-full', className)}
      data-slot='avatar-fallback'
      {...props}
    />
  )

export { Avatar, AvatarFallback, AvatarImage }
