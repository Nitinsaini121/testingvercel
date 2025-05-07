import { useState } from 'react'
import { Card, CardHeader, CardTitle } from '../ui/card'
import QualifiedCoontractorPopUp from '../QualifiedCoontractor'

const QualifiedCoontractor = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [documentTypeData, setDocumentTypeData] = useState()
    const handleOpenDocument = event => {
      const card = event.target.closest('[data-doc]')
      if (card) {
        const documentType = card.getAttribute('data-doc')
        setDocumentTypeData(documentType)
        setModalOpen(true)
      }
    }
  const onQualifiedCoontractorPopOver = () => {}
  return (
    <>
      <Card
        className='relative w-full overflow-auto rounded border border-color-grey'
        onClick={handleOpenDocument}
      >
        <CardHeader className='min-h-14 p-3 theme-bg-light-rgba border-b border-color-grey'>
          <CardTitle className='flex justify-between'>
            <div className='!text-lg'>Contractor Documents</div>
          </CardTitle>
        </CardHeader>
        <div className='py-4 pl-4 pr-2'>
          <div className='scoller max-h-96 space-y-5 overflow-x-auto pr-2'>
            <Card
              data-doc='Business License'
              className='rounded-6 flex items-center gap-2 border border-solid border-green-600 bg-green-100 p-2 cursor-pointer' 
            >
              <img src='/images/green-document.png' />
              <p className='font-medium text-green-600'>Business License</p>
            </Card>
            <Card
              data-doc='Certificate Of Insurance'
              className='rounded-6 !mt-3 flex items-center gap-2 border border-solid border-green-600 bg-green-100 p-2 cursor-pointer'
            >
              <img src='/images/green-document.png' />
              <p className='font-medium text-green-600'>
                Certificate Of Insurance
              </p>
            </Card>
            <Card
              data-doc='Change Order Process Acknoweledgement'
              className='rounded-6 !mt-3 flex items-center gap-2 border border-solid border-green-600 bg-green-100 p-2 cursor-pointer'
            >
              <img src='/images/green-document.png' />
              <p className='font-medium text-green-600'>
                Change Order Process Acknoweledgement
              </p>
            </Card>
            <Card
              data-doc='Direct Deposit Authorization'
              className='rounded-6 !mt-3 flex items-center gap-2 border border-solid border-green-600 bg-green-100 p-2 cursor-pointer'
            >
              <img src='/images/green-document.png' />
              <p className='font-medium text-green-600'>
                Direct Deposit Authorization
              </p>
            </Card>
            <Card
              data-doc='Drug Free Work Place'
              className='rounded-6 !mt-3 flex items-center gap-2 border border-solid border-green-600 bg-green-100 p-2 cursor-pointer'
            >
              <img src='/images/green-document.png' />
              <p className='font-medium text-green-600'>Drug Free Work Place</p>
            </Card>
            <Card
              data-doc='I-9 Employment Verification'
              className='rounded-6 !mt-3 flex items-center gap-2 border border-solid border-green-600 bg-green-100 p-2 cursor-pointer'
            >
              <img src='/images/green-document.png' />
              <p className='font-medium text-green-600'>
                I-9 Employment Verification
              </p>
            </Card>
            <Card
              data-doc='Lien Waivers & Releases'
              className='rounded-6 !mt-3 flex items-center gap-2 border border-solid border-green-600 bg-green-100 p-2 cursor-pointer'
            >
              <img src='/images/green-document.png' />
              <p className='font-medium text-green-600'>
                Lien Waivers & Releases
              </p>
            </Card>
            <Card
              data-doc='Material Procurement Agreement'
              className='rounded-6 !mt-3 flex items-center gap-2 border border-solid border-green-600 bg-green-100 p-2 cursor-pointer'
            >
              <img src='/images/green-document.png' />
              <p className='font-medium text-green-600'>
                Material Procurement Agreement
              </p>
            </Card>
            <Card
              data-doc='Non Compete Agreement'
              className='rounded-6 !mt-3 flex items-center gap-2 border border-solid border-green-600 bg-green-100 p-2 cursor-pointer'
            >
              <img src='/images/green-document.png' />
              <p className='font-medium text-green-600'>Non Compete Agreement</p>
            </Card>
            <Card
              data-doc='OSHA Certification'
              className='rounded-6 !mt-3 flex items-center gap-2 border border-solid border-green-600 bg-green-100 p-2 cursor-pointer'
            >
              <img src='/images/green-document.png' />
              <p className='font-medium text-green-600'>OSHA Certification</p>
            </Card>
            <Card
              data-doc='Job Expectation'
              className='rounded-6 !mt-3 flex items-center gap-2 border border-solid border-green-600 bg-green-100 p-2 cursor-pointer'
            >
              <img src='/images/green-document.png' />
              <p className='font-medium text-green-600'>Job Expectation</p>
            </Card>
          </div>
        </div>
        
      </Card>
      <QualifiedCoontractorPopUp
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)} // No argument needed
        description='Qualified Sub Contractor Document'
        onQualifiedCoontractorPopOver={onQualifiedCoontractorPopOver}
        documentTypeData={documentTypeData}
      />
    </>
  )
}

export default QualifiedCoontractor
