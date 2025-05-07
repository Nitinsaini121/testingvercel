'use client'
import { Download } from 'lucide-react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './ui/dialog'

// Define the prop types
interface QualifiedCoontractorPopOver {
  description: string
  onQualifiedCoontractorPopOver: () => void
  onClose: () => void
  isOpen: boolean
  documentTypeData: any
}

const QualifiedCoontractorPopUp = ({
  description,
  documentTypeData,
  onClose,
  isOpen
}: QualifiedCoontractorPopOver) => {


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='custom-modal !w-100 !max-w-2xl'>
        <DialogHeader className='!text-center'>
        <div className='relative flex justify-between'>
          <DialogTitle className='!text-2xl'>{documentTypeData} </DialogTitle>
          <div className='h-8 w-8 flex justify-center items-center rounded-full bg-red-500 cursor-pointer'>
            {' '}
            <Download className='text-white w-4 h-4' />
          </div>
          </div>
          {/* <DialogDescription>{description}</DialogDescription> */}
        </DialogHeader>
        <div className='flex justify-center rounded-lg border-2 border-dashed p-2'>
          <img src='/images/form-image.png' />
        </div>


    
        <DialogFooter className='!justify-end'>
          <Button
            onClick={onClose}
            className='site-button-small bg-red'
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default QualifiedCoontractorPopUp
