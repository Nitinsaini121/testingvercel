'use client'
import LayoutHeader from '@/components/layoutHeader'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import ContractorValidateProof from '@/components/vlidateContractor/ContractorValidateProof'
import { useSearchParams } from 'next/navigation'

const KycContractor = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  return (
    <>
      <div className='verification-head m-0 rounded-t-md bg-gray-100 px-2 py-2 text-xl'>
        <LayoutHeader pageTitle={'Sub Contractor Verification Form'} />
      </div>
      {token ? (
        <>
          {' '}
          <ContractorValidateProof />
        </>
      ) : (
        <>
          <div className='flex min-h-96 items-center justify-center'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center justify-center'>
                  <img src='/images/notallowed.jpg' width='12%' />
                </CardTitle>
                <CardDescription className='flex items-center justify-center text-3xl font-bold'>
                  Not Authorized
                </CardDescription>
              </CardHeader>
              <CardContent className='flex items-center justify-center text-2xl'>
                You are not authorized to submit the verification form
              </CardContent>
              <p className='flex items-center justify-center font-extralight'>
                Please contact the customer support for more information
              </p>
            </Card>
          </div>
        </>
      )}
    </>
  )
}

export default KycContractor
