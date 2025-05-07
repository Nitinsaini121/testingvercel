'use client'
import SidebarFilters from '@/components/catalog-items/app-sidebar/nav-main'
import FormInputField from '@/components/share/form/FormInputField'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { FormProvider, useForm } from 'react-hook-form'

function Catelog() {
  const formMethods = useForm({
    defaultValues: { search: '' }
  })
  useDocumentTitle('Roofing Catalog')
  return (
    <div className='flex'>
      {/* Main Content */}
      <div className='flex-1'>
        <div className='container m-auto'>
          <div className='flex justify-between pb-12 pt-6'>
          <h1 className='text-6xl font-bold text-color-blue'>Roofing Catalog</h1>
          <FormProvider {...formMethods}>
          <form className='relative mb-4 search-form'>
            <Search className='absolute  top-1/2 -translate-y-1/2 text-gray-400 right-4' size={18} />
            <FormInputField
              className='w-96 pl-10' // Add left padding to make space for the icon
              name='search'
              form={formMethods}
              placeholder='Search by product name, manufacturer name...'
              type='text'
            />
          </form>
          </FormProvider>
        </div>
        </div>

        <div className='mt-4 bg-white py-12'>
          <div className='container m-auto'>
            <div className='flex'>
              {/* Filters Sidebar */}
              <div className='w-1/4 pl-4 pr-12 pt-2'>
                <SidebarFilters />
              </div>


              {/* Product List */}
              <div className='w-3/4 px-4'>
                {/* sort by:--- */}
                <div className='flex items-center justify-between'>
                  {/* <p>20 of 97 results</p> */}
                  Sort by:
                  <select className='rounded border p-2'>
                    <option>Recommended</option>
                    <option>Newest</option>
                  </select>
                </div>
                {/* Card:-*/}
                <div className='mt-4 grid grid-cols-3 gap-4'>
                  {[
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                    19, 20
                  ].map(item => (
                    <div
                      key={item}
                      className='overflow-hidden rounded-lg border shadow-sm'
                    >
                      <Link href={`catalog/${item}`}>
                        <div className='relative'>
                          <img
                            src='/images/roof.jpg'
                            alt='Roofing Product'
                            className='h-72 w-full object-cover'
                          />
                          <span className='absolute left-2 top-2 rounded bg-orange-500 px-2 py-1 text-xs text-white'>
                            Most Popular
                          </span>
                        </div>
                        <div className='p-5'>
                          <h3 className='text-lg font-bold mb-3'>
                            Owens Corning TruDefinition® Duration® Shingles
                          </h3>
                          <p className='text-base mb-2'><b className='text-gray-600'>Type:</b> Asphalt Shingle</p>
                          <p className='text-base  mb-2'>
                            <b className='text-gray-600'>Warranty:</b> Limited Lifetime Warranty
                          </p>
                          <p className='text-base'>
                            <b className='text-gray-600'>Top Features:</b> Offers ultimate protection
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Catelog