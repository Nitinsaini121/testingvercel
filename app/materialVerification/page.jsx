'use client'
import LayoutHeader from '@/components/layoutHeader'
import MaterialQuotesServices from '@/components/services/material-api'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { useRouter, useSearchParams } from 'next/navigation'

const MaterialVerification = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const router = useRouter()

  const handleClick = async status => {
    const formData = {
      status: status
    }
    try {
      const response = await MaterialQuotesServices.materialQuoteStatusUpdate(
        token,
        formData
      )

      if (response.data.status === true) {
        successMessage({ description: response?.data?.message })
        router.push('/materialVerification/thankspage')
      }
    } catch (error) {
      errorMessage({ description: error?.response?.data?.message })
    }
  }
  return (
    <>
      <div className='verification-head m-0 rounded-t-md bg-gray-100 px-2 py-2 text-xl'>
        <LayoutHeader pageTitle={'Verify Material Quotes Status'} />
      </div>

      {token ? (
        <>
          <div className='grid grid-cols-2 gap-4 p-4'>
            <Button
              className='site-button bg-green'
              type='button '
              onClick={() => handleClick('approved')}
            >
              Approve
            </Button>
            <Button
              className='site-button bg-red'
              type='button '
              onClick={() => handleClick('reject')}
            >
              Reject
            </Button>
          </div>
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
                You are not authorized to verify the material quotes
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

export default MaterialVerification
