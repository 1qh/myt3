'use client'

import type { UseEmblaCarouselType } from 'embla-carousel-react'

import { cn } from '@a/ui'
import { Button } from '@a/ui/button'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import * as React from 'react'

type CarouselApi = UseEmblaCarouselType[1]
type CarouselContextProps = CarouselProps & {
  api: ReturnType<typeof useEmblaCarousel>[1]
  canScrollNext: boolean
  canScrollPrev: boolean
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  scrollNext: () => void
  scrollPrev: () => void
}
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

interface CarouselProps {
  opts?: CarouselOptions
  orientation?: 'horizontal' | 'vertical'
  plugins?: CarouselPlugin
  setApi?: (api: CarouselApi) => void
}

type UseCarouselParameters = Parameters<typeof useEmblaCarousel>

const CarouselContext = React.createContext<CarouselContextProps | null>(null),
  Carousel = ({
    children,
    className,
    opts,
    orientation = 'horizontal',
    plugins,
    setApi,
    ...props
  }: CarouselProps & React.ComponentProps<'div'>) => {
    const [carouselRef, api] = useEmblaCarousel(
        {
          ...opts,
          axis: orientation === 'horizontal' ? 'x' : 'y'
        },
        plugins
      ),
      [canScrollPrev, setCanScrollPrev] = React.useState(false),
      [canScrollNext, setCanScrollNext] = React.useState(false),
      onSelect = React.useCallback((_api: CarouselApi) => {
        if (!_api) return
        setCanScrollPrev(_api.canScrollPrev())
        setCanScrollNext(_api.canScrollNext())
      }, []),
      scrollPrev = React.useCallback(() => {
        api?.scrollPrev()
      }, [api]),
      scrollNext = React.useCallback(() => {
        api?.scrollNext()
      }, [api]),
      handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault()
            scrollPrev()
          } else if (event.key === 'ArrowRight') {
            event.preventDefault()
            scrollNext()
          }
        },
        [scrollPrev, scrollNext]
      )
    React.useEffect(() => {
      if (!api || !setApi) return
      setApi(api)
    }, [api, setApi])
    React.useEffect(() => {
      if (!api) return
      onSelect(api)
      api.on('reInit', onSelect)
      api.on('select', onSelect)
      return () => {
        api.off('select', onSelect)
      }
    }, [api, onSelect])
    return (
      <CarouselContext.Provider
        value={{
          api,
          canScrollNext,
          canScrollPrev,
          carouselRef,
          opts,
          orientation: opts?.axis === 'y' ? 'vertical' : 'horizontal',
          scrollNext,
          scrollPrev
        }}>
        <div
          aria-roledescription='carousel'
          className={cn('relative', className)}
          data-slot='carousel'
          onKeyDownCapture={handleKeyDown}
          role='region'
          {...props}>
          {children}
        </div>
      </CarouselContext.Provider>
    )
  },
  useCarousel = () => {
    const context = React.useContext(CarouselContext)
    if (!context) throw new Error('useCarousel must be used within a <Carousel />')
    return context
  },
  CarouselContent = ({ className, ...props }: React.ComponentProps<'div'>) => {
    const { carouselRef, orientation } = useCarousel()
    return (
      <div className='overflow-hidden' data-slot='carousel-content' ref={carouselRef}>
        <div className={cn('flex', orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col', className)} {...props} />
      </div>
    )
  },
  CarouselItem = ({ className, ...props }: React.ComponentProps<'div'>) => {
    const { orientation } = useCarousel()
    return (
      <div
        aria-roledescription='slide'
        className={cn('basis-full grow-0 min-w-0 shrink-0', orientation === 'horizontal' ? 'pl-4' : 'pt-4', className)}
        data-slot='carousel-item'
        role='group'
        {...props}
      />
    )
  },
  CarouselNext = ({ className, size = 'icon', variant = 'outline', ...props }: React.ComponentProps<typeof Button>) => {
    const { canScrollNext, orientation, scrollNext } = useCarousel()
    return (
      <Button
        className={cn(
          'absolute rounded-full size-8',
          orientation === 'horizontal'
            ? '-right-12 -translate-y-1/2 top-1/2'
            : '-bottom-12 -translate-x-1/2 left-1/2 rotate-90',
          className
        )}
        data-slot='carousel-next'
        disabled={!canScrollNext}
        onClick={scrollNext}
        size={size}
        variant={variant}
        {...props}>
        <ArrowRight />
        <span className='sr-only'>Next slide</span>
      </Button>
    )
  },
  CarouselPrevious = ({
    className,
    size = 'icon',
    variant = 'outline',
    ...props
  }: React.ComponentProps<typeof Button>) => {
    const { canScrollPrev, orientation, scrollPrev } = useCarousel()
    return (
      <Button
        className={cn(
          'absolute rounded-full size-8',
          orientation === 'horizontal'
            ? '-left-12 -translate-y-1/2 top-1/2'
            : '-top-12 -translate-x-1/2 left-1/2 rotate-90',
          className
        )}
        data-slot='carousel-previous'
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        size={size}
        variant={variant}
        {...props}>
        <ArrowLeft />
        <span className='sr-only'>Previous slide</span>
      </Button>
    )
  }

export { Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious }
