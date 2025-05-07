import api from '@/lib/api'

const PipelineStatusServices = {
  addPipelineStatus: formData => {
    return api.post(`/sales-pipelines`, formData)
  },
  getPipelineStatus: (page, length) => {
    return api.get(`/sales-pipelines?limit=100&page=${page}&per_page=${length}`)
  },

  deletePipelineStatusById: deleteIndex => {
    return api.delete(`/sales-pipelines/${deleteIndex}`)
  },
  getPipelineStatusBYId: id => {
    return api.get(`/sales-pipelines/${id}`)
  },
  updatePipelineStatusById: (formData, id) => {
    return api.put(`/sales-pipelines/${id}`, formData)
  }
}
export default PipelineStatusServices
