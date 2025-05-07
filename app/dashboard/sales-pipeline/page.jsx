'use client'
import DialogBox from '@/components/DialogBox'
import LayoutHeader from '@/components/layoutHeader'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { SalePipelineDataTable } from '@/components/Sales-Pipeline/Table'
import LeadsSettingServices from '@/services/LeadSetting'
import SalesPipelineServices from '@/services/salea-pipeline-api'
import {
  closestCorners,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { useForm } from 'react-hook-form'
import { SalePipelineColumns } from './salePipeline-columns'

const SalesPipeline = () => {
  const [editData, setEditData] = useState(null)
  useDocumentTitle('Leads Type')
  const router = useRouter()
  const [getList, setList] = useState([])
  const [page, setPage] = useState(1)
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [OpenModal, setOpenModal] = useState(false)
  const [length, setLength] = useState(10)

  const methods = useForm({
    defaultValues: {
      length: '10'
    }
  })

  const getListSalesPipeline = async () => {
    try {
      setLoading(true)
      const res = await SalesPipelineServices.getSalesPipeline()

      if (res?.status === 200) {
        setList(res.data)
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
          await LeadsSettingServices.deleteInteractionTypesById(deleteIndex)
        setDeleteOpenModal(false)
        if (res?.status === 200) {
          getListLeads()
          successMessage({ description: res?.data?.message })
        }
      } catch (error) {
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
    setEditData(row.original)
    setOpenModal(true)
  }
  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }
  const handleModalClose = () => {
    setOpenModal(false)
  }

  // Drag & Drop-----------------------------------------------------------
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4 // user must move pointer 4px before dragging starts
      }
    })
  )

  const handleDragEnd = event => {
    const { active, over } = event
    const leadId = active?.id
    const newObject = active?.data.current
    const leadIdRelatedObject = getList?.find(section =>
      section.opportunities.some(item => item?.id == leadId)
    )
    const leadIdRelatedType = leadIdRelatedObject?.type || null
    const newIGroupId = getList.find(item => {
      if (item?.type == over?.id) {
        return item?.id
      }
    })

    if (newIGroupId?.id == leadIdRelatedObject?.id) return
    // Manipulate getList state
    const manipulateStateGetListData = (leadId, leadIdRelatedType) => {
      if (!leadId || !leadIdRelatedType || !Array.isArray(getList))
        return getList

      const newList = [...getList]
      let movedItem = null

      for (let section of newList) {
        const index = section.opportunities.findIndex(item => item.id == leadId)
        if (index !== -1) {
          movedItem = section.opportunities.splice(index, 1)[0]
          break
        }
      }

      if (!movedItem) return getList

      // Step 2: Push to the section that matches the `over` target type
      const targetType = over?.id // Use the ID of the drop target as type

      const targetSection = newList.find(section => section.type === targetType)

      if (targetSection) {
        targetSection.opportunities.push(movedItem)
      } else {
        newList.push({
          type: targetType,
          opportunities: [movedItem]
        })
      }

      return newList
    }

    const updatedList = manipulateStateGetListData(leadId, leadIdRelatedType)

    setTimeout(() => {
      setList(updatedList)
    }, 0)

    // api work :-
    handleRowChangeApi(leadId, newIGroupId.id)
  }

  const handleRowChangeApi = async (leadId, newIGroupId) => {
    const data = {
      targetStatusId: newIGroupId,
      leads: [{ id: leadId }]
    }
    try {
      await SalesPipelineServices.updateSalesPipelineRow(data)
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleOnDragMove = event => {}

  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        <div>
          <LayoutHeader pageTitle='Sales Pipeline' />
        </div>
        <div className='flex gap-4'>
          <select className='border-color-blue text-theme-color rounded border bg-white px-3 text-sm'>
            <option>Job Quote</option>
            <option>Material Quote</option>
          </select>
          {/* <Button
            className='site-button'
            onClick={() => router.push(`/dashboard/sales-pipeline/add`)}
          >
            <Plus />
            Add Sales Pipeline
          </Button> */}
        </div>
      </div>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
        onDragMove={handleOnDragMove}
      >
        <SalePipelineDataTable
          apiData={getList}
          columns={SalePipelineColumns({
            onEdit: setEditData,
            onDelete: id => {
              setDeleteIndex(id)
              setDeleteOpenModal(true)
            }
          })}
          loading={loading}
        />
      </DndContext>

      <DialogBox
        onDelete={onDelete}
        description='Are you certain you want to proceed with this deletion?'
        deleteOpenModal={deleteOpenModal}
        deleteHandleModalClose={deleteHandleModalClose}
      />
    </>
  )
}

export default SalesPipeline
