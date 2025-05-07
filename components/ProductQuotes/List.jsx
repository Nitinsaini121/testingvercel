'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import DialogBox from '../DialogBox'
import ProductQuote from '../services/ProductQuote'
import { DataTable } from '../Table'
import { errorMessage, successMessage } from '../ToasterMessage'
import ProductCatogriesSection from '../viewpages/ProductCatogriesSection'
import { columns } from './quotes-Column'

const List = () => {
  const searchParam = useSearchParams()
  const id = searchParam.get('id')
  const formRef = useRef(null)
  const [takeOfList, setTakeOfList] = useState([])
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [loading, setLoading] = useState(true) // Loading state
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState()
  const [page, setPage] = useState(1)
  const [totalRecord, setTotalRecord] = useState()
  const [sendValue,setSendValue]= useState()
  const length = 10
  const fetchTakeOfData = async () => {
    setLoading(true)
    try {
      const response = await ProductQuote.getAllTakeOffQuote(page, length, id)
      console.log("response",response)
      if (response?.status === 200) {
        setTakeOfList(response?.data?.data?.takeOffQuotes)
        setTotalRecord(response?.data?.data?.totalRecords)
      }
    } catch (error) {
      console.log("erroer",error)
      // errorMessage({
      //   description: error?.response?.data?.message
      // })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTakeOfData()
  }, [page])

  const onDelete = async () => {
    if (deleteIndex !== null) {
      try {
        const response = await ProductQuote.deleteTakeOffQuoteById(deleteIndex)
        setDeleteOpenModal(false)
        if (response?.status === 200) {
          fetchTakeOfData()
          successMessage({ description: response?.data?.message })
        }
      } catch (error) {
        errorMessage({ description: error?.response?.data?.message })
      }
    }
  }

  const handleDeleteQuotes = row => {
    setDeleteIndex(row.original.id)
    setDeleteOpenModal(true)
  }

  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }
  const handleEditQuotes = row => {
    setEditId(row?.original?.id)
    // Delay scroll a bit to ensure the form renders first
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  // Fetch contract data only if editId is valid
  useEffect(() => {
    if (!editId) return

    const fetchTakeOfDataByid = async () => {
      try {
        const response = await ProductQuote.getTakeOffQuoteById(editId)
        console.log("response",response)
        if (response?.status === 200) {
          setEditData(response?.data?.data?.quotes)
          setSendValue(response?.data?.data?.materialQuality)
        }
      } catch (error) {
        errorMessage({
          description: error?.response?.data?.message
        })
      } finally {
      }
    }

    fetchTakeOfDataByid()
  }, [editId]) // Run effect only when `editId` changes
  return (
    <>
      <div ref={formRef}>
        <ProductCatogriesSection
          editId={editId}
          editData={editData}
          fetchTakeOfData={fetchTakeOfData}
          setEditData={setEditData}
          setEditId={setEditId}
          sendValue={sendValue}
          setSendValue={setSendValue}
        />
      </div>

      <div className='mx-auto mt-5 w-full'>
        <DataTable
          loading={loading}
          data={takeOfList}
          columns={columns(handleDeleteQuotes, handleEditQuotes)}
          totalRecord={totalRecord}
          page={page}
          setPage={setPage}
          length={length}
        />
        <DialogBox
          onDelete={onDelete}
          description='Are you certain you want to proceed with this deletion?'
          deleteOpenModal={deleteOpenModal}
          deleteHandleModalClose={deleteHandleModalClose}
        />
      </div>
    </>
  )
}

export default List
