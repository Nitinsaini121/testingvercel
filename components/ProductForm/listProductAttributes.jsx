'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Edit, Trash2 } from 'lucide-react'
import { useState } from 'react'
import DialogBox from '../DialogBox'
import ProductAttributeServices from '../services/productAttribute-api'
import { errorMessage, successMessage } from '../ToasterMessage'
import { Button } from '../ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip'
import EditAttribute from './editProductAttribute'

const ListAttributes = ({ allAttributeList, getListAttributes }) => {
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editData, setEditData] = useState(null)

  const onDelete = async () => {
    try {
      const response =
        await ProductAttributeServices.deleteProductAttributesById(deleteIndex)
        setDeleteOpenModal(false)
      if (response?.status === 200) {
        getListAttributes()
        successMessage({
          description: response?.data?.message
        })
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  const deleteProductAttribute = (e, id) => {
    e.preventDefault()

    setDeleteOpenModal(true)
    setDeleteIndex(id)
  }

  // Open edit modal and load data
  const editProductAttribute = async (e, id) => {
    e.preventDefault()

    try {
      const response =
        await ProductAttributeServices.getProductAttributesById(id)
      if (response?.status === 200) {
        setEditData(response?.data?.data)
        setEditModalOpen(true)
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAttributeList?.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                {Array.isArray(item.value) ? item.value.join(', ') : item.value}
              </TableCell>
              <TableCell className='whitespace-nowrap'>
                <TooltipProvider>
                  {/* Edit Button */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='text-green-600 hover:bg-green-300'
                        onClick={e => editProductAttribute(e, item.id)}
                      >
                        <Edit className='h-5 w-5' />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Edit</TooltipContent>
                  </Tooltip>

                  {/* Delete Button */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='text-red-600 hover:bg-red-300'
                        onClick={e => deleteProductAttribute(e, item.id)}
                      >
                        <Trash2 className='h-5 w-5' />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DialogBox
        onDelete={onDelete}
        description='Are you certain you want to proceed with this deletion?'
        deleteOpenModal={deleteOpenModal}
        deleteHandleModalClose={deleteHandleModalClose}
      />

      {/* Edit Modal */}
      {editModalOpen && (
        <EditAttribute
          editData={editData}
          onClose={() => setEditModalOpen(false)}
          getListAttributes={getListAttributes}
        />
      )}
    </>
  )
}

export default ListAttributes
