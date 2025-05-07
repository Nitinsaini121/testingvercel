import api from '@/lib/api'
const CatalogServices = {
  // add Contractor
  catalogAddApi: formData => {
    return api.post(`/catalog/addCatalog`, formData)
  },

  // list all contractor
  allCatalog: (page, length) => {
    return api.get(`/catalog/getAllCatalog?page=${page}&length=${length}`)
  },
  deleteCatalog: deleteIndex => {
    return api.delete(`/catalog/deleteCatalogById?catalogId=${deleteIndex}`)
  },
  getCatalogById: editId => {
    return api.get(`/catalog/getCatalogById?catalogId=${editId}`)
  },
  updateCatalog: (editId, formData) => {
    return api.put(`/catalog/updateCatalogById?catalogId=${editId}`, formData)
  },

  // material add api
  materialAdd: data => {
    return api.post(`/material/addMaterial`, data)
  },

  aAdd: data => {
    return api.post(`/material/addMaterial`, data)
  },

}
export default CatalogServices
