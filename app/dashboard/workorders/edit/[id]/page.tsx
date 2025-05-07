import EditWorkOrder from '@/components/work-order/EditWorkOrder'

function page({ params }) {
  return (
    <div>
      <EditWorkOrder params={params} />
    </div>
  )
}

export default page
