'use client'

import { cn } from '@a/ui'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import * as React from 'react'

const HoverCard = ({ ...props }: React.ComponentProps<typeof HoverCardPrimitive.Root>) => (
    <HoverCardPrimitive.Root data-slot='hover-card' {...props} />
  ),
  HoverCardTrigger = ({ ...props }: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) => (
    <HoverCardPrimitive.Trigger data-slot='hover-card-trigger' {...props} />
  ),
  HoverCardContent = ({
    align = 'center',
    className,
    sideOffset = 4,
    ...props
  }: React.ComponentProps<typeof HoverCardPrimitive.Content>) => (
    <HoverCardPrimitive.Portal data-slot='hover-card-portal'>
      <HoverCardPrimitive.Content
        align={align}
        className={cn(
          'bg-popover border data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 origin-(--radix-hover-card-content-transform-origin) outline-hidden p-4 rounded-md shadow-md text-popover-foreground w-64 z-50',
          className
        )}
        data-slot='hover-card-content'
        sideOffset={sideOffset}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  )

export { HoverCard, HoverCardContent, HoverCardTrigger }
