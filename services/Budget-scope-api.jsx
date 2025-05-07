import api from '@/lib/api'
const BudgetScopeService = {
  AddScopes: formData => {
    return api.post(`/scopes`, formData)
  },

  GetAllScopes: (page, length) => {
    return api.get(`/scopes?limit=100&page=${page}&per_page=${length}`)
  },
  deleteScopeById: deleteIndex => {
    return api.delete(`/scopes/${deleteIndex}`)
  },
  GetScopesBYId: scopId => {
    return api.get(`/scopes/${scopId}`)
  },
  UpdateScopesById: (scopId, formData) => {
    return api.post(`/scopes/${scopId}`, formData)
  }
}
export default BudgetScopeService
