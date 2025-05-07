import api from '@/lib/api'
const AppliedWorkOrderServices = {
  // attribute add api
  addApplyWorkOrder: formData => {
    return api.post(`/applyWorkOrder/addApplyWorkOrder`, formData)
  },

  // list all contractor
  getAllApplyWorkOrder: () => {
    return api.get(`/applyWorkOrder/getAllApplyWorkOrder`)
  },
  deleteApplyWorkOrderById: deleteIndex => {
    return api.delete(
      `/applyWorkOrder/deleteApplyWorkOrderById?applyWorkOrderId=${deleteIndex}`
    )
  },
  getApplyWorkOrderById: editId => {
    return api.get(`/applyWorkOrder/getApplyWorkOrderById?applyWorkOrderId=${editId}`)
  },
  updateApplyWorkOrderById: (editId, values) => {
    return api.put(
      `/applyWorkOrder/updateApplyWorkOrderById?applyWorkOrderId=${editId}`,
      values
    )
  }
}
export default AppliedWorkOrderServices
