'use client'

import { cn } from '@a/ui'
import { buttonVariants } from '@a/ui/button'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import * as React from 'react'

const AlertDialog = ({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Root>) => (
    <AlertDialogPrimitive.Root data-slot='alert-dialog' {...props} />
  ),
  AlertDialogTrigger = ({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) => (
    <AlertDialogPrimitive.Trigger data-slot='alert-dialog-trigger' {...props} />
  ),
  AlertDialogPortal = ({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) => (
    <AlertDialogPrimitive.Portal data-slot='alert-dialog-portal' {...props} />
  ),
  AlertDialogOverlay = ({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) => (
    <AlertDialogPrimitive.Overlay
      className={cn(
        'bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed inset-0 z-50',
        className
      )}
      data-slot='alert-dialog-overlay'
      {...props}
    />
  ),
  AlertDialogContent = ({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Content>) => (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        className={cn(
          'bg-background border data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 duration-200 fixed gap-4 grid left-[50%] max-w-[calc(100%-2rem)] p-6 rounded-lg shadow-lg sm:max-w-lg top-[50%] translate-x-[-50%] translate-y-[-50%] w-full z-50',
          className
        )}
        data-slot='alert-dialog-content'
        {...props}
      />
    </AlertDialogPortal>
  ),
  AlertDialogHeader = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div
      className={cn('flex flex-col gap-2 sm:text-left text-center', className)}
      data-slot='alert-dialog-header'
      {...props}
    />
  ),
  AlertDialogFooter = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div
      className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
      data-slot='alert-dialog-footer'
      {...props}
    />
  ),
  AlertDialogTitle = ({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Title>) => (
    <AlertDialogPrimitive.Title
      className={cn('font-semibold text-lg', className)}
      data-slot='alert-dialog-title'
      {...props}
    />
  ),
  AlertDialogDescription = ({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Description>) => (
    <AlertDialogPrimitive.Description
      className={cn('text-muted-foreground text-sm', className)}
      data-slot='alert-dialog-description'
      {...props}
    />
  ),
  AlertDialogAction = ({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Action>) => (
    <AlertDialogPrimitive.Action className={cn(buttonVariants(), className)} {...props} />
  ),
  AlertDialogCancel = ({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) => (
    <AlertDialogPrimitive.Cancel className={cn(buttonVariants({ variant: 'outline' }), className)} {...props} />
  )

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger
}
