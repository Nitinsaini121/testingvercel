'use client'
import LayoutHeader from '@/components/layoutHeader'
import MaterialQuotesServices from '@/components/services/material-api'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const customerInfo = {
  name: 'John232323322322',
  address: '1 World Wy',
  phone: '+1 (324) 348-8745'
}

const billDetails = [
  { itemName: 'Joint', price: 24, quantity: 4 },
  { itemName: 'Tile', price: 24, quantity: 4 },
  { itemName: 'Pipe', price: 24, quantity: 4 }
]

const MaterialDashboard = () => {
  const searchParams = useSearchParams()
  const materialId = searchParams.get('id')
  // const [materialDetail,setMaterialDetail]= useState([])
  // console.log("response.data.data",materialDetail.map((item)=>item?.personalDetail))
  console.log('materialId', materialId)
  const [approvalStatus, setApprovalStatus] = useState(null)
  const router = useRouter()
  const handleClick = status => {
    setApprovalStatus(status)
    console.log('Action taken:', status)
  }

  const fetchMaterialQuotesDetail = async () => {
    try {
      const response =
        await MaterialQuotesServices.getMaterialDetailById(materialId)
      if (response.status === 200) {
        if (response?.data?.status === true) {
          setMaterialDetail(response.data.data)
          console.log('response', response.data.message)
        }
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  useEffect(() => {
    fetchMaterialQuotesDetail()
  }, [])
  const calculateTotal = () => {
    return billDetails.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <LayoutHeader pageTitle={' Material Quotes Details'} />
        <Button
          className='site-button'
          onClick={() => router.push('/dashboard/product/material-quotes')}
        >
          Material List
        </Button>
      </div>
      <Separator />
      <Card>
        <CardContent>
          <div className='customer-details mb-4 rounded-md border p-4'>
            <h2>Customer Details</h2>
            <p>
              <strong>Name:</strong> <span>{customerInfo.name}</span>
            </p>
            <p>
              <strong>Address:</strong> <span>{customerInfo.address}</span>
            </p>
            <p>
              <strong>Phone:</strong> <span>{customerInfo.phone}</span>
            </p>
          </div>

          <div className='bill-details mb-4 rounded-md border p-4'>
            <h2>Bill Details</h2>
            <Table className='rounded-md border p-4'>
              <TableHeader>
                <TableRow>
                  <TableCell>Item Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Item Total</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {billDetails.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.itemName}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.price * item.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p>
              <strong>Grand Total:</strong> <span>{calculateTotal()}</span>
            </p>
          </div>

          {approvalStatus && (
            <div className='mt-4'>
              <p>
                Action Status:{' '}
                <strong>
                  {approvalStatus === 'approved' ? 'Approved' : 'Rejected'}
                </strong>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default MaterialDashboard
