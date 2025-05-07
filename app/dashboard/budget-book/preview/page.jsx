'use client'
import BudgetBookService from '@/services/budget-book-api'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const QuotePreview = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [invoiceLink, setInvoiceLink] = useState([])

  const getInvoice = async () => {
    try {
      const response = await BudgetBookService.GetQuotesPreview(id)
      setInvoiceLink(response?.data?.data)
    } catch (error) {
      console.log('error', error)
    }
  }
  useEffect(() => {
    getInvoice()
  }, [])
  return (
    <>
      {invoiceLink ? (
        <iframe
          src={invoiceLink}
          className='h-full w-full border-none'
          title='Invoice Preview'
        />
      ) : (
        <p>Loading preview...</p>
      )}
    </>
  )
}

export default QuotePreview
