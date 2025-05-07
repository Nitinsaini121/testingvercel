import { CarouselForSingleItem } from '@/components/catalog-items/CarouselForSingleItem'
import { MultipleCarousel } from '@/components/catalog-items/MultipleCarousel'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

function Page() {
  return (
    <div className='container mx-auto px-4 py-6'>
      <h1 className='text-2xl font-semibold text-gray-800'>
        Owens Corning TruDefinition® Duration® Shingles - Williamsburg Gray
      </h1>
      {/* Product Image & Carousel */}
      <div className='flex flex-col items-center'>
        <CarouselForSingleItem />
      </div>

      {/* Multiple Carousel - Color Options */}
      <div className='mt-4'>
        <MultipleCarousel />
      </div>

      {/* Product Details */}
      <div className='mt-6 bg-white p-4'>
        <h1 className='text-2xl font-semibold text-gray-800'>
          Owens Corning TruDefinition® Duration® Shingles - Williamsburg Gray
        </h1>
        <p className='mt-2 text-sm text-gray-600'>
          <strong>Type:</strong> TruDefinition® <br />
          <strong>Grade:</strong> TruDefinition® <br />
          <strong>Warranty:</strong> TruDefinition® colors platform Lifetime
          Warranty*/‡ TruDefinition® colors platform <br />
          <strong>Top Features:</strong> Includes SureNail® TechnologyIncludes
          SureNail® TechnologyIncludes SureNail® TechnologyIncludes SureNail®
          TechnologyIncludes SureNail® Technology
        </p>

        <p className='mt-4 text-gray-700'>
          want Duration® . They are specially formulated on a want Duration® .
          They are specially formulated on a want Duration® . They are
          specially formulated on a want Duration® . They are specially
          formulated on a want Duration® . They are specially formulated on a
          want Duration® . They are specially formulated on a
        </p>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue='installation-package'>
        <div className='flex border-b border-gray-300'>
          <TabsList className='flex space-x-6 bg-white p-0'>
            <TabsTrigger
              value='installation-package'
              className='relative !rounded-none border-b-2 border-transparent px-4 py-2 text-lg font-medium text-gray-700 hover:border-black hover:text-black'
            >
              Installation Package
            </TabsTrigger>
            <TabsTrigger
              value='specifications'
              className='relative !rounded-none border-b-2 border-transparent px-4 py-2 text-lg font-medium text-gray-700 hover:border-black hover:text-black'
            >
              Specifications
            </TabsTrigger>
            <TabsTrigger
              value='reviews'
              className='relative !rounded-none border-b-2 border-transparent px-4 py-2 text-lg font-medium text-gray-700 hover:border-black hover:text-black'
            >
              Reviews
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Installation Package Content */}
        <TabsContent className='mt-5' value='installation-package'>
          <Card className='bg-gray-100 p-6'>
            <CardTitle className='text-xl font-semibold'>
              What’s Included with your Installation
            </CardTitle>
            <CardDescription className='text-gray-700'>
              All Roofle Pricing includes the <strong>Roofle Guarantee</strong>&
              the following line items:
            </CardDescription>
            <ul className='mt-2 list-inside list-disc text-gray-700'>
              <li>Remove existing shingles</li>
              <li>Install ice and water shield (colder climates only)</li>
              <li>Remove existing shingles</li>
              <li>Remove existing shingles per specifications</li>
              <li>Remove existing shingles ridge</li>
              <li>Replace existing attic vents with same but new</li>
              <li>Install Remove existing shingles and chimney flashings</li>
              <li>Remove existing shingles</li>
              <li>Remove existing shingles City Permit is included in the price</li>
            </ul>
          </Card>

          <Card className='bg-gray-100 p-6'>
            <CardTitle className='text-xl font-semibold'>
              Additional Costs
            </CardTitle>
            <CardDescription className='text-gray-700'>
              The following items are not included in this price but will be
              added to your final proposal or during online checkout:
            </CardDescription>
            <ul className='mt-2 list-inside list-disc text-gray-700'>
              <li>more than 1 story hig 1 story high</li>
              <li>more than 1 story hig existing roof layer tear off</li>
              <li>more than 1 story hig required</li>
              <li>more than 1 story hig complex</li>
              <li>more than 1 story hig skylights</li>
              <li>Chimney flashing</li>
            </ul>
          </Card>
        </TabsContent>

        <TabsContent className='mt-5' value='specifications'>
          <Card className='p-6 shadow-md'>
            <p>Specifications content goes here...</p>
          </Card>
        </TabsContent>

        <TabsContent className='mt-5' value='reviews'>
          <Card className='p-6 shadow-md'>
            <p>Reviews content goes here...</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Page
