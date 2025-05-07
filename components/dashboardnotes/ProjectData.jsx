import { CardContent, CardDescription } from '../ui/card'

const ProjectData = () => {
  return (
    <>
      <CardContent className='p-0'>
        <div className='flex justify-between border-b border-solid p-3'>
          <CardDescription className='text-sm'># of BLDGS</CardDescription>
          <CardContent className='text-dark-color p-0 text-sm font-medium'>
            {/* {editData?.project?.name} */}
          </CardContent>
        </div>
        <div className='flex justify-between border-b border-solid p-3'>
          <CardDescription className='text-sm'>Gross SQFT</CardDescription>
          <CardContent className='text-dark-color p-0 text-sm font-medium'>
            {/* {editData?.company?.name} */}1
          </CardContent>
        </div>
        <div className='flex justify-between border-b border-solid p-3'>
          <CardDescription className='text-sm'>Type of Project</CardDescription>
          <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
            {/* {editData?.contact?.name} */}2
          </CardContent>
        </div>
        <div className='flex justify-between border-b border-solid p-3'>
          <CardDescription className='text-sm'>
            Construction Type
          </CardDescription>
          <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
            {/* {editData?.salePerson?.address} */}3
          </CardContent>
        </div>
      </CardContent>
    </>
  )
}

export default ProjectData
