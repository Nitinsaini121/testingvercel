import api from '@/lib/api'
const SalesPipelineServices = {
  addSalesPipeline: data => {
    return api.post(`/sales-pipelines`, data)
  },
  getSalesPipeline: () => {
    return api.get(`/sales-pipelines-leads`)
  },
  updateSalesPipelineRow: (data) => {
    return api.post(`/pipelines-leads-reorder`,data)
  }
}
export default SalesPipelineServices
