import { useEffect, useState } from 'react'
import DocumentViewPopOver from '../DocumentViewPopOver'
import ContractorService from '../services/contractor'
import { errorMessage, successMessage } from '../ToasterMessage'
import { Button } from '../ui/button'
import { Card, CardHeader, CardTitle } from '../ui/card'

const DocumentView = ({ editId }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [documentTypeData, setDocumentTypeData] = useState()
  const [documentData, setDocumentData] = useState([])
  const [popOverData, setPopOverData] = useState()
  const handleOpenDocument = item => {
    setPopOverData(item)
    setModalOpen(true)
  }
  const onDocumentViewPopOver = () => {}
  const fetchDocumentView = async () => {
    try {
      const response = await ContractorService.getContractorVerification(editId)
      if (response.status === 200) {
        setDocumentData(response.data.data)
        successMessage({ description: response?.data?.message })
      }
    } catch (error) {
      if (error) {
        errorMessage({ description: error?.response?.data?.message })
      }
    }
  }

  useEffect(() => {
    fetchDocumentView()
  }, [])

  const handleVerificationClick = async () => {
    try {
      const response = await ContractorService.linkForDocumentUpload(editId)
      if(response?.status===200){

        successMessage({ description: response.data.message })
      }
    } catch (error) {
      if (error) {
        errorMessage({ description: error?.response?.data?.message })
      }
    }
  }

  return (
    <>
      <Card className='relative w-full overflow-auto rounded border border-color-grey'>
        <CardHeader className='min-h-14 theme-bg-light-rgba p-3 border-b border-color-grey'>
          <CardTitle className='flex justify-between'>
            <div className='flex w-full items-center justify-between !text-lg'>
              Contractor Documents{' '}
              <Button onClick={handleVerificationClick} className='site-button-small'>
                Send Verification Link
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <div className='py-4 pl-4 pr-2'>
          <div className='scoller max-h-96 space-y-5 overflow-x-auto pr-2'>
            {documentData?.map(item => (
              <>
                <Card
                  className={
                    (item.status == 'approved' &&
                      'rounded-6 flex cursor-pointer items-center gap-2 border border-solid border-green-400 bg-green-100 p-2') ||
                    (item.status == 'rejected' &&
                      'rounded-6 flex cursor-pointer items-center gap-2 border border-solid border-red-400 bg-red-100 p-2') ||
                    (item.status == 'documentUploaded' &&
                      'rounded-6 flex cursor-pointer items-center gap-2 border border-solid border-blue-400 bg-blue-100 p-2')
                  }
                  onClick={
                    item.status == 'notSubmited'
                      ? null
                      : () => handleOpenDocument(item)
                  }
                >
                  <img
                    src={
                      (item.status == 'approved' &&
                        '/images/green-document.png') ||
                      (item.status == 'rejected' &&
                        '/images/red-document.png') ||
                      (item.status == 'documentUploaded' &&
                        '/images/blue-document.png')
                    }
                  />
                  <p
                    className={
                      (item.status == 'approved' &&
                        'font-medium text-green-400') ||
                      (item.status == 'rejected' &&
                        'font-medium text-red-400') ||
                      (item.status == 'documentUploaded' &&
                        'font-medium text-blue-400')
                    }
                    // className='font-medium text-blue-400'
                  >
                    {item.name}
                  </p>
                </Card>
              </>
            ))}
          </div>
        </div>
      </Card>
      <DocumentViewPopOver
        isOpen={modalOpen}
        editId={editId}
        popOverData={popOverData}
        onClose={() => setModalOpen(false)} // No argument needed
        description='Validate the Sub Contractor Document '
        setModalOpen={setModalOpen}
        onDocumentViewPopOver={onDocumentViewPopOver}
        documentTypeData={documentTypeData}
        fetchDocumentView={fetchDocumentView}
      />
    </>
  )
}

export default DocumentView
