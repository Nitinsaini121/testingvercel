"use client"

import { redirect, useRouter } from 'next/navigation'

import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { useEffect } from 'react'

export default  function AdminPage () {

  // const redirectUser =async()=>{
  //   const session = await getServerSession(authOptions)
    
  //     if (session?.user) {
  //       redirect('/login')
  //     }
    
  //     redirect('/catalog-view')

  // }


  useEffect(()=>{
    redirect('/login')
  },[])
  const router = useRouter()
  useDocumentTitle('Home')
  return (<>
Home page
  </>)
}
