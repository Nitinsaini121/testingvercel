import { Button } from '@/components/ui/button'
import * as React from 'react'
import { Spinner } from '../ui/spinner'

export type ff = {
  setPublishTo: React.Dispatch<React.SetStateAction<string>>
  setSelectedCont: React.Dispatch<React.SetStateAction<number[]>>
  loader: boolean
}

export function DrawerForWorkOrder({
  loader,
  setPublishTo,
  setSelectedCont
}: ff) {
  const [crfOpen, setCrfOpen] = React.useState('')
  const isDesktop = 'min-width: 768px'

  const handleSubmitPublishToAllInRegion = () => {
    setPublishTo('allRegion')
    setCrfOpen('allRegion')
  }

  const handleSubmitPublishToEveryone = () => {
    setPublishTo('toEveryone')
    setCrfOpen('toEveryone')
  }

  if (isDesktop) {
    return (
      <>
        <div>
          <title>New Work Order</title>
        </div>
        <Table setSelectedCont={setSelectedCont} />
        <div className='flex justify-end gap-6'>
          <Button
            onClick={() => handleSubmitPublishToAllInRegion()}
            className='site-button'
            variant='outline'
          >
            Publish to all in Region
          </Button>

          {loader ? (
            <div className='spinner-button bg-amber-300 rounded-6 text-base py-3 px-10'><Spinner size='md' className='bg-black dark:bg-white ' /></div>
          ) : (
            <Button
              onClick={() => handleSubmitPublishToEveryone()} //+
              className='site-button'
              variant='outline'
            >
              Publish to Everyone{' '}
            </Button>
          )}
        </div>
      </>
    )
  }
}

interface Contractor {
  contractor: string
  company: string
  compliance: string
  categories: string
  state: string
  additional_states: number
  rating: number
  reviews: number
}

const contractors: Contractor[] = [
  {
    contractor: 'Jeremy Hart',
    company: 'Paint from the Hart',
    compliance: 'Compliant',
    categories: 'Roof Top',
    state: 'FL',
    additional_states: 2,
    rating: 4.5,
    reviews: 2
  },
  {
    contractor: 'Jeremy Hart',
    company: 'Paint from the Hart',
    compliance: 'Lead',
    categories: 'Roof Top',
    state: 'FL',
    additional_states: 2,
    rating: 4.5,
    reviews: 2
  },
  {
    contractor: 'Jeremy Hart',
    company: 'Paint from the Hart',
    compliance: 'Pending',
    categories: 'Roof Top',
    state: 'FL',
    additional_states: 2,
    rating: 4.5,
    reviews: 2
  }
]

interface selectContr {
  setSelectedCont: React.Dispatch<React.SetStateAction<number[]>>
}
const Table: React.FC<selectContr> = ({ setSelectedCont }) => {
  const [selectedRows, setSelectedRows] = React.useState<number[]>([])

  const handleCheckboxChange = (index: number) => {
    setSelectedRows(
      prevSelected =>
        prevSelected.includes(index)
          ? prevSelected.filter(i => i !== index) // Uncheck: Remove index
          : [...prevSelected, index] // Check: Add index
    )
    setSelectedCont(prevSelected =>
      prevSelected.includes(index)
        ? prevSelected.filter(i => i !== index) // Uncheck: Remove index
        : [...prevSelected, index]
    )
  }

  return (
    <div className='overflow-x-auto rounded-lg border bg-white p-4 shadow-lg my-6 '>
      <table className='w-full'>
        <thead>
          <tr className='bg-gray-100 text-left'>
            <th className='p-3'>
              <input
                type='checkbox'
                onChange={e => {
                  setSelectedRows(
                    e.target.checked ? contractors.map((_, index) => index) : []
                  )
                }}
                checked={selectedRows.length === contractors.length}
              />
            </th>
            <th className='p-3'>Contractor</th>
            <th className='p-3'>Compliance</th>
            <th className='p-3'>Categories</th>
            <th className='p-3'>States</th>
            <th className='p-3'>Rating</th>
          </tr>
        </thead>
        <tbody>
          {contractors.map((contractor, index) => (
            <tr key={index} className='border-b hover:bg-gray-50'>
              <td className='p-3'>
                <input
                  type='checkbox'
                  checked={selectedRows.includes(index)}
                  onChange={() => handleCheckboxChange(index)}
                />
              </td>
              <td className='p-3'>
                <div className='flex items-center space-x-3'>
                  <img
                    src='/images/Sample_User_Icon.png'
                    alt='Contractor'
                    className='h-10 w-10 rounded-full'
                  />

                  <div>
                    <p className='font-semibold'>{contractor.contractor}</p>
                    <p className='text-sm text-gray-500'>
                      {contractor.company}
                    </p>
                  </div>
                </div>
              </td>
              <td className='p-3'>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    contractor.compliance === 'Compliant'
                      ? 'bg-green-100 text-green-700'
                      : contractor.compliance === 'Pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-orange-100 text-orange-700'
                  }`}
                >
                  {contractor.compliance}
                </span>
              </td>
              <td className='p-3 '>
                <span className=' items-center justify-center rounded-md bg-gray-100 text-gray-600 p-3'>⚒ {contractor.categories}</span>
              </td>
              <td className='p-3'>
                📞 {contractor.state}{' '}
                <span className='ml-2 rounded-md bg-gray-200 px-2 py-1 text-gray-700'>
                  +{contractor.additional_states}
                </span>
              </td>
              <td className='p-3'>
                ⭐ {contractor.rating} ({contractor.reviews} reviews)
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
