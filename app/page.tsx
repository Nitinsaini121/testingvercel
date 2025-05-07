"use client"
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect, useRouter } from 'next/navigation'
import Home from './catalog-view/page'
import useDocumentTitle from '@/components/utils/useDocumentTitle'

export default  function AdminPage() {
  // const session = await getServerSession(authOptions)

  // if (session?.user) {
  //   redirect('/login')
  // }

  // redirect('/catalog-view')
  const router = useRouter()
  useDocumentTitle('Home')
  router.replace('/catalog')
  return (<>
  <Home />
  </>)
}
