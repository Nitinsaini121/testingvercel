import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

export function CarouselForSingleItem() {
  return (
    <Carousel className='mx-auto w-full max-w-[800px]'>
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className='p-1'>
              <Card>
                <CardContent className='p-0'>
                  <img
                    src='/images/roof.jpg'
                    alt='Roofing Product'
                    className='object-cover'
                    style={{ height: '100%', width: '100%' }}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
