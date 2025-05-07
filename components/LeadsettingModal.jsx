import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from './ui/dialog'

const LeadSettingModal = ({
  description,
  submitHandleModalClose,
  submitOpenModal,
  message
}) => {
  return (
    <Dialog open={submitOpenModal} onOpenChange={submitHandleModalClose}>
      <DialogContent className='max-h-[90vh] max-w-[40%] overflow-y-auto transition-all duration-300'>
        <DialogHeader>
          <DialogTitle className='!text-2xl'>{message}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default LeadSettingModal
