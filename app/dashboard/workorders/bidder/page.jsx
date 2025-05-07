'use client'

import LayoutHeader from '@/components/layoutHeader'
import ContractorProposalServices from '@/components/services/contractorProposal-api'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import api from '@/lib/api'
import { format } from 'date-fns'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import BiddersPage from './accept-reject'

const BidderDetails = () => {
  const searchParams = useSearchParams()
  const contractorId = searchParams.get('contractorId')
  const workOrderId = searchParams.get('workOrderId')
  const [contractorData, setContractorData] = useState(null)

  const [workOrder, setWorkOrder] = useState([])

  console.log('workOrder--bids', workOrder)

  const contractorName = workOrder?.biders?.find(
    bid => contractorId == bid?.contractorId
  )?.contractorInfo?.firstName

  // const form = useForm({})
  const fetchWorkOrderById = async () => {
    try {
      const getWorkOrder = await api.get(
        `/workOrder/getWorkOrderById?workOrderId=${workOrderId}`
      )
      setWorkOrder(getWorkOrder.data.data)
    } catch (err) {
      console.error('Fetch Error:', err)
    }
  }

  useEffect(() => {
    // contractorName()
    if (workOrderId) {
      fetchWorkOrderById()
    }
  }, [workOrderId])

  const getContractorProposal = async () => {
    try {
      const response = await ContractorProposalServices.getContractorProposal(
        workOrderId,
        contractorId
      )
      if (response?.data?.status) {
        setContractorData(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching contractor proposal', error)
    }
  }

  useEffect(() => {
    if (contractorId && workOrderId) {
      getContractorProposal()
    }
  }, [contractorId, workOrderId])

  return (
    <div>
      <div className='verification-head m-0 rounded-t-md bg-gray-100 px-2 py-2 text-xl'>
        <LayoutHeader pageTitle={`${contractorName || ''} Proposal Details`} />
      </div>

      <div className='mx-auto max-w-4xl px-4 py-6'>
        {contractorData && (
          <Card className='border shadow-md'>
            <CardHeader></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className='bg-gray-50'>
                    <TableHead className='w-1/3'>Field</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className='hover:bg-muted/40'>
                    <TableCell className='font-medium'>Project Name</TableCell>
                    <TableCell>{contractorData.projectName}</TableCell>
                  </TableRow>
                  <TableRow className='hover:bg-muted/40'>
                    <TableCell className='font-medium'>
                      Project Location
                    </TableCell>
                    <TableCell>{contractorData.projectLocation}</TableCell>
                  </TableRow>
                  <TableRow className='hover:bg-muted/40'>
                    <TableCell className='font-medium'>Description</TableCell>
                    <TableCell>{contractorData.description}</TableCell>
                  </TableRow>
                  <TableRow className='hover:bg-muted/40'>
                    <TableCell className='font-medium'>Labour Cost</TableCell>
                    <TableCell>{contractorData.labourCost}</TableCell>
                  </TableRow>
                  <TableRow className='hover:bg-muted/40'>
                    <TableCell className='font-medium'>
                      Estimated Cost
                    </TableCell>
                    <TableCell>{contractorData.totalEstimatedCost}</TableCell>
                  </TableRow>
                  <TableRow className='hover:bg-muted/40'>
                    <TableCell className='font-medium'>Bid Date</TableCell>
                    <TableCell>
                      {contractorData.bidDate
                        ? format(new Date(contractorData.bidDate), 'yyyy-MM-dd')
                        : '-'}
                    </TableCell>
                  </TableRow>
                  <TableRow className='hover:bg-muted/40'>
                    <TableCell className='font-medium'>Start Date</TableCell>
                    <TableCell>
                      {contractorData.startDate
                        ? format(
                            new Date(contractorData.startDate),
                            'yyyy-MM-dd'
                          )
                        : '-'}
                    </TableCell>
                  </TableRow>
                  <TableRow className='hover:bg-muted/40'>
                    <TableCell className='font-medium'>
                      Completion Date
                    </TableCell>
                    <TableCell>
                      {contractorData.completionDate
                        ? format(
                            new Date(contractorData.completionDate),
                            'yyyy-MM-dd'
                          )
                        : '-'}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>

      <BiddersPage />
    </div>
  )
}

export default BidderDetails
