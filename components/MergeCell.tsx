'use client'
import { FormProvider, useForm } from 'react-hook-form'
import FormCheckBox from './share/form/CheckBox'
import { Button } from './ui/button'
import { CardHeader } from './ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './ui/dialog'

// Define the prop types
interface MergeCellProps {
  description: string
  onMergeCell: () => void
  onClose: () => void
  isOpen: boolean
  selectedRow: any | null // Accept row data
  filteredContracts: any | null
}

const MergeCell = ({
  description,
  onMergeCell,
  onClose,
  isOpen,
  selectedRow,
  filteredContracts
}: MergeCellProps) => {
  const formMethods = useForm()

  const { watch } = formMethods
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='custom-modal !w-100 !max-w-4xl'>
        <DialogHeader className='!text-center'>
          <DialogTitle className='!text-2xl'>Merge Confirmation</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className='grid grid-cols-2 gap-2'>
          <div className='my-4 rounded-md border p-0'>
            {filteredContracts &&
              filteredContracts.map(item => (
                <>
                  <div className=''>
                    <CardHeader className='!bg-muted p-2 text-2xl text-xl font-semibold'>
                      Original Contractor
                    </CardHeader>
                    <div className='grid grid-cols-1 gap-2 p-4'>
                      <p>
                        <strong>Contractor Name:</strong> {item.contractorName}
                      </p>
                      <p>
                        <strong>Email:</strong> {item.contractorEmail}
                      </p>
                      <p>
                        <strong>Ref ID:</strong> {item.refId}
                      </p>
                      <p>
                        <strong>Phone:</strong> {item.contractorPhone}
                      </p>
                      <p>
                        <strong>Region:</strong> {item.contractorRegion}
                      </p>
                    </div>
                  </div>
                </>
              ))}
          </div>
          <div className='my-4 rounded-md border p-0'>
            {selectedRow && (
              <>
                <div>
                  <CardHeader className='!bg-muted p-2 text-2xl text-xl font-semibold'>
                    Duplicated Contractor
                  </CardHeader>
                  <div className='grid grid-cols-1 gap-2 p-4'>
                    <p>
                      <strong>Contractor Name:</strong>{' '}
                      {selectedRow.contractorName}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedRow.contractorEmail}
                    </p>
                    <p>
                      <strong>Ref ID:</strong> {selectedRow.refId}
                    </p>
                    <p>
                      <strong>Phone:</strong> {selectedRow.contractorPhone}
                    </p>
                    <p>
                      <strong>Region:</strong> {selectedRow.contractorRegion}
                    </p>
                  </div>

                  <div className='px-4 pb-4'>
                    <div>
                      <h6 className='border-t pt-2 font-semibold'>
                        Select the fields you want to merge.
                      </h6>

                      <div className='mt-2 grid grid-cols-2 gap-2'>
                        <FormProvider {...formMethods}>
                          <FormCheckBox
                            name='contractorName'
                            form={formMethods}
                            description={selectedRow.contractorName}
                          />
                          <FormCheckBox
                            name='contractorPhone'
                            form={formMethods}
                            description={selectedRow.contractorPhone}
                          />
                          <FormCheckBox
                            name='contractorEmail'
                            form={formMethods}
                            description={selectedRow.contractorEmail}
                          />
                        </FormProvider>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <DialogFooter className='!justify-center'>
          <Button
            onClick={onClose}
            className='rounded-6 !bg-red-700 !shadow-none hover:bg-gray-400'
          >
            Cancel
          </Button>
          <Button
            onClick={onMergeCell}
            className='rounded-6 button-bg text-white !shadow-none'
          >
            Merge
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default MergeCell
