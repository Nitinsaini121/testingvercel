'use client'
import ContractorProposalServices from '@/components/services/contractorProposal-api'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'

const BiddersPage = () => {
  const searchParams = useSearchParams()
  const contractorId = searchParams.get('contractorId')
  const workOrderId = searchParams.get('workOrderId')
  const router = useRouter()
  console.log('contractorId', contractorId)
  const handleClick = async status => {
    console.log('status', status)
    const formData = {
      status: status
    }
    try {
      const response = await ContractorProposalServices.acceptRejectProposal(
        workOrderId,
        contractorId,
        formData
      )
      console.log('response', response)
      if (response?.status === 200) {
        successMessage({ description: response?.data?.message })
        router.push(`/dashboard/workorders`)
      }
    } catch (error) {
      console.log('error', error?.response?.data?.message)
      errorMessage({ description: error?.response?.data?.message })
    }
  }
  return (
    <>
      <div className='flex justify-center gap-4 p-4'>
        <Button
          className='site-button bg-green w-52'
          type='button'
          onClick={() => handleClick('accept')}
        >
          Accept
        </Button>
        <Button
          className='site-button bg-red w-52'
          type='button '
          onClick={() => handleClick('reject')}
        >
          Reject
        </Button>
      </div>
    </>
  )
}

export default BiddersPage
