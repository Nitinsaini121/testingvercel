'use client'
import DialogBox from '@/components/DialogBox'
import LayoutHeader from '@/components/layoutHeader'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
// import { SalePipelineColumns } from './salePipeline-columns'
import { DataTable } from '@/components/Table'
import PipelineStatusServices from '@/services/pipeline-status-group'
import { PipelineStatusColumns } from './PipelineStatusColumns'

const PipelineStatusList = () => {
  useDocumentTitle('Leads Type')
  const router = useRouter()
  const [getList, setList] = useState([])
  const [page, setPage] = useState(1)
  const [totalRecord, setTotalRecord] = useState()

  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [length, setLength] = useState(10)

  const methods = useForm({
    defaultValues: {
      length: '10'
    }
  })

  const getListSalesPipeline = async () => {
    try {
      setLoading(true)
      const res = await PipelineStatusServices.getPipelineStatus(page, length)
      console.log('reslisttttt-', res)

      if (res?.status === 200) {
        setList(res?.data?.data)
        setTotalRecord(res?.meta?.total)
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListSalesPipeline()
  }, [page, length])

  // delete table row
  const onDelete = async () => {
    if (deleteIndex !== null) {
      try {
        const res =
          await PipelineStatusServices.deletePipelineStatusById(deleteIndex)
        setDeleteOpenModal(false)
        if (res?.status === 200) {
          getListSalesPipeline()
          successMessage({ description: res?.data?.message })
        }
      } catch (error) {
        console.log('error', error)
        errorMessage({
          description: error?.response?.data?.message
        })
      }
    }
  }
  const handleDeleteLeads = row => {
    setDeleteOpenModal(true)
    setDeleteIndex(row?.original?.id)
  }
  // edit table row
  const handleEditLeads = row => {
    console.log('row', row)
    router.push(`/dashboard/settings/pipeline/edit?id=${row.original.id}`)
  }
  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }
  // const dummyTableData = [
  //   [
  //     {
  //       id: 1,
  //       name: 'pipeline1',
  //       materialType: 'material',
  //       statusGroup: {
  //         status: [
  //           {
  //             id: '1',
  //             order: '1',
  //             status: 'test-1'
  //           },
  //           {
  //             id: '2',
  //             order: '2',
  //             status: 'test-2'
  //           }
  //         ]
  //       }
  //     },
  //     {
  //       id: '2',
  //       name: 'pipeline1',
  //       materialType: 'job',
  //       statusGroup: {
  //         status: [
  //           {
  //             id: '3',
  //             order: '1',
  //             status: 'abc'
  //           },
  //           {
  //             id: '4',
  //             order: '2',
  //             status: 'abc2'
  //           }
  //         ]
  //       }
  //     }
  //   ]
  // ]

  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        <LayoutHeader pageTitle='Pipeline' />
        <Button
          className='site-button'
          onClick={() => router.push(`/dashboard/settings/pipeline/add`)}
        >
          <Plus />
          Add Pipeline
        </Button>
      </div>
      <DataTable
        data={getList}
        columns={PipelineStatusColumns(handleDeleteLeads, handleEditLeads)}
        loading={loading}
        setPage={setPage}
        page={page}
        length={length}
        totalRecord={totalRecord}
      />

      <DialogBox
        onDelete={onDelete}
        description='Are you certain you want to proceed with this deletion?'
        deleteOpenModal={deleteOpenModal}
        deleteHandleModalClose={deleteHandleModalClose}
      />
    </>
  )
}

export default PipelineStatusList
