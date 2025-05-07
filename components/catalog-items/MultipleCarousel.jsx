import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

export function MultipleCarousel() {
  return (
    <Carousel
      opts={{
        align: 'start'
      }}
      className='w-full max-w-full overflow-x-auto'
    >
      <CarouselContent className='flex gap-1'>
        {Array.from({ length: 35 }).map((_, index) => (
          <CarouselItem key={index} className='basis-1/8'>
            <div className='p-1'>
              <Card className='border'>
                <CardContent className='flex items-center justify-center p-1'>
                  <img
                    src='/images/roof.jpg'
                    alt='Roofing Product'
                    className='rounded-md object-cover'
                    style={{ height: '60px', width: '100%' }}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md' />
      <CarouselNext className='absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md' />
    </Carousel>
  );
}
