'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { useRouter } from 'next/navigation'

const ThanksPage = () => {
  const router = useRouter()
  return (
    <>
      <div className='flex min-h-96 items-center justify-center'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center justify-center'>
              <img src='/images/circle.png' width='12%' />
            </CardTitle>
            <CardDescription className='flex items-center justify-center text-3xl font-bold'>
              Thank You!
            </CardDescription>
          </CardHeader>
          <CardContent className='flex items-center justify-center text-2xl'>
            Your document was submitted successfully.
          </CardContent>
          <p className='flex items-center justify-center font-extralight'>
            We will let you know when the document is verified.
          </p>
          <div className='mt-5 flex justify-center'>
            <div></div>
            <Button
              className='site-button text-center'
              onClick={() => router.push('/catalog')}
            >
              Back To Catalog Page
            </Button>
          </div>
        </Card>
      </div>
    </>
  )
}

export default ThanksPage
