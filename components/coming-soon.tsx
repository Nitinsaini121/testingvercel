'use client'

import { Button } from '@/components/ui/button'
import comingSoonImg from '@/public/images/coming-soon.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function ComingSoon() {
  const router = useRouter()

  return (
    <section className='min-h-screen-minus-header flex flex-col items-center justify-center space-y-4 text-center'>
      <Image
        src={comingSoonImg}
        alt='Coming Soon'
        width={250}
        height={250}
        priority={true}
      />
      <h1 className='text-4xl font-semibold text-secondary'>Coming Soon!</h1>
      <p>We will notify you once ready.</p>
      <Button onClick={() => router.back()}>Back</Button>
    </section>
  )
}
