'use client'

import { cn } from '@a/ui'
import * as React from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'

const Drawer = ({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
    <DrawerPrimitive.Root data-slot='drawer' {...props} />
  ),
  DrawerTrigger = ({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Trigger>) => (
    <DrawerPrimitive.Trigger data-slot='drawer-trigger' {...props} />
  ),
  DrawerPortal = ({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Portal>) => (
    <DrawerPrimitive.Portal data-slot='drawer-portal' {...props} />
  ),
  DrawerClose = ({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Close>) => (
    <DrawerPrimitive.Close data-slot='drawer-close' {...props} />
  ),
  DrawerOverlay = ({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Overlay>) => (
    <DrawerPrimitive.Overlay
      className={cn(
        'bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed inset-0 z-50',
        className
      )}
      data-slot='drawer-overlay'
      {...props}
    />
  ),
  DrawerContent = ({ children, className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Content>) => (
    <DrawerPortal data-slot='drawer-portal'>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        className={cn(
          'bg-background fixed flex flex-col group/drawer-content h-auto z-50',
          'data-[vaul-drawer-direction=top]:border-b data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:top-0',
          'data-[vaul-drawer-direction=bottom]:border-t data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:rounded-t-lg',
          'data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:sm:max-w-sm data-[vaul-drawer-direction=right]:w-3/4',
          'data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:sm:max-w-sm data-[vaul-drawer-direction=left]:w-3/4',
          className
        )}
        data-slot='drawer-content'
        {...props}>
        <div className='bg-muted group-data-[vaul-drawer-direction=bottom]/drawer-content:block h-2 hidden mt-4 mx-auto rounded-full shrink-0 w-[100px]' />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  ),
  DrawerHeader = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div className={cn('flex flex-col gap-1.5 p-4', className)} data-slot='drawer-header' {...props} />
  ),
  DrawerFooter = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div className={cn('flex flex-col gap-2 mt-auto p-4', className)} data-slot='drawer-footer' {...props} />
  ),
  DrawerTitle = ({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Title>) => (
    <DrawerPrimitive.Title
      className={cn('font-semibold text-foreground', className)}
      data-slot='drawer-title'
      {...props}
    />
  ),
  DrawerDescription = ({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Description>) => (
    <DrawerPrimitive.Description
      className={cn('text-muted-foreground text-sm', className)}
      data-slot='drawer-description'
      {...props}
    />
  )

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger
}
