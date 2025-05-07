'use client'
import LayoutHeader from '@/components/layoutHeader'
import SubContractorService from '@/components/services/subContractor'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Spinner } from '@/components/ui/spinner'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { toast } from '@/hooks/use-toast'
import { Merge } from 'lucide-react'
import { useEffect, useState } from 'react'

const MergeSubContractor = () => {
  useDocumentTitle('Bulk Merge')
  const [mergeData, setMergeData] = useState([])
  const [selectedData, setSelectedData] = useState({})

  // Fetch merged contracts
  const getMergedContracts = async () => {
    try {
      const res = await SubContractorService.getDuplicateContractors()
      setMergeData(res.data.data)
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: err.message
      })
    }
  }

  useEffect(() => {
    getMergedContracts()
  }, [])
  // Handle checkbox selection
  const handleSelection = (originalId, duplicateId, field, value) => {
    setSelectedData(prev => {
      const isCurrentlyChecked = prev[duplicateId]?.[field] === value

      if (isCurrentlyChecked) {
        const updatedData = { ...prev }
        delete updatedData[duplicateId]?.[field]

        if (Object.keys(updatedData[duplicateId] || {}).length === 1) {
          delete updatedData[duplicateId]
        }

        return updatedData
      } else {
        return {
          ...prev,
          [duplicateId]: {
            ...prev[duplicateId],
            parentId: originalId,
            [field]: value
          }
        }
      }
    })
  }

  // Merge all selected contracts
  const handleMergeAll = async () => {
    try {
      const payload = Object.entries(selectedData).map(
        ([duplicateId, data]) => ({
          childContractId: duplicateId,
          parentContractId: data.parentId,
          ...data
        })
      )

      if (payload.length === 0) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'No data selected for merging'
        })
        return
      }


      const res = await SubContractorService.mergeContractors(payload)

      toast({
        variant: 'success',
        title: 'Success',
        description: 'All contracts merged successfully'
      })

      getMergedContracts()
      setSelectedData({})
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: err.message
      })
    }
  }

  return (
    <div>
      <LayoutHeader pageTitle='Sub Contractor Duplicate Leads' />
      <div className='overflow-hidden rounded-6 border'>
        <Table>
          {/* Table Header */}
          <TableHeader>
            <TableRow>
              <TableHead className='theme-bg border-e-2 text-center text-xl !text-white p-2'>
                Original Contractor
              </TableHead>
              <TableHead className='theme-bg text-center text-xl !text-white p-2'>
                Duplicate Contractor
              </TableHead>
            </TableRow>
            <TableRow>
              <TableHead colSpan={2} className='p-4'>
                <Table className='bg-gray-100 table-fixed'>
                  <TableRow>
                    <TableHead className='border-e-2'>Contact Detail</TableHead>
                    <TableHead className='border-e-2'>Address</TableHead>
                    <TableHead className='border-e-2'>Contact Detail</TableHead>
                    <TableHead>Address</TableHead>
                  </TableRow>
                </Table>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className='p-4'>
            {mergeData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} className='text-center'>
                  <Spinner
                    size='lg'
                    className='m-auto bg-black dark:bg-white'
                  />
                </TableCell>
              </TableRow>
            ) : (
              mergeData?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={2} className='p-4'>
                    <Table className='table-fixed bg-gray-100'>
                      <TableRow className='border-0'>
                        {/* Original Contractor */}
                        <TableCell className='bg-green-100 px-5'>
                          <div className='grid grid-cols-2'>
                            <div>
                              <p className='font-semibold'>
                                {row.contractorName}
                              </p>
                              <p className='text-sm'>{row.contractorPhone}</p>
                              <p className='text-sm text-gray-600'>
                                {row.contractorEmail}
                              </p>
                            </div>
                            <div className='relative'>
                              {row.contractorAddress}
                              <Button
                                size='icon'
                                variant='outline'
                                className='merge-button absolute'
                              >
                                <Merge className='-rotate-90' />
                              </Button>
                            </div>
                          </div>
                        </TableCell>

                        {/* Duplicate Contractors */}
                        <TableCell className='bg-orange-100 px-6'>
                          {row.duplicateRecords.map((duplicate, i) => (
                            <div
                              key={duplicate?.id}
                              className='grid grid-cols-2'
                            >
                              <div>
                                {/* Contractor Name */}
                                <label className='flex cursor-pointer items-center gap-2'>
                                  <Checkbox
                                    checked={
                                      selectedData[duplicate.id]
                                        ?.contractorName ===
                                      duplicate.contractorName
                                    }
                                    onCheckedChange={() =>
                                      handleSelection(
                                        row.id,
                                        duplicate.id,
                                        'contractorName',
                                        duplicate.contractorName
                                      )
                                    }
                                  />
                                  <p>{duplicate.contractorName}</p>
                                </label>
                                {/* Contractor Phone */}
                                <label className='flex cursor-pointer items-center gap-2'>
                                  <Checkbox
                                    checked={
                                      selectedData[duplicate.id]
                                        ?.contractorPhone ===
                                      duplicate.contractorPhone
                                    }
                                    onCheckedChange={() =>
                                      handleSelection(
                                        row.id,
                                        duplicate.id,
                                        'contractorPhone',
                                        duplicate.contractorPhone
                                      )
                                    }
                                  />
                                  <p>{duplicate.contractorPhone}</p>
                                </label>
                                {/* Contractor Email */}
                                <label className='flex cursor-pointer items-center gap-2'>
                                  <Checkbox
                                    checked={
                                      selectedData[duplicate.id]
                                        ?.contractorEmail ===
                                      duplicate.contractorEmail
                                    }
                                    onCheckedChange={() =>
                                      handleSelection(
                                        row.id,
                                        duplicate.id,
                                        'contractorEmail',
                                        duplicate.contractorEmail
                                      )
                                    }
                                  />
                                  <p>{duplicate.contractorEmail}</p>
                                </label>
                              </div>
                              {/* Contractor Address */}
                              <label className='flex cursor-pointer items-center gap-2'>
                                <Checkbox
                                  checked={
                                    selectedData[duplicate.id]
                                      ?.contractorAddress ===
                                    duplicate.contractorAddress
                                  }
                                  onCheckedChange={() =>
                                    handleSelection(
                                      row.id,
                                      duplicate.id,
                                      'contractorAddress',
                                      duplicate.contractorAddress
                                    )
                                  }
                                />
                                <p>{duplicate.contractorAddress}</p>
                              </label>
                              {/* Separator */}
                              {i < row.duplicateRecords.length - 1 && (
                                <hr className='my-3 border-t border-gray-300' />
                              )}
                            </div>
                          ))}
                        </TableCell>
                      </TableRow>
                    </Table>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {/* Action Buttons */}
      <div className='flex items-end justify-end gap-2 p-2'>
        <Button className='site-button bg-red'>Cancel</Button>
        <Button onClick={handleMergeAll} className='site-button'>Merge All</Button>
      </div>
    </div>
  )
}

export default MergeSubContractor
