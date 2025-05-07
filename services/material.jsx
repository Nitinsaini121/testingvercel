import api from '@/lib/api'

const MaterialQuotesService = {
  // Leads Setting Status
  getMaterialList: (page, length) => {
    return api.get(`/material-quotes?limit=100&sort_column=id&sort_direction=asc&per_page=${10}&page=${1}`)
  },
  AddMaterial: formData => {
    return api.post(`/material-quotes`, formData)
  },

  deleteMaterialQuoteById: deleteIndex => {
    return api.delete(`/material-quotes/${deleteIndex}`)
  },
  GetLeadStatusBYId: scopId => {
    return api.get(`/lead-statuses/${scopId}`)
  },
  UpdateLeadStatusById: (scopId, formData) => {
    return api.post(`/lead-statuses/${scopId}`, formData)
  }
}
export default MaterialQuotesService
