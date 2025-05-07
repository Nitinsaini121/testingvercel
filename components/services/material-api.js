import api from '@/lib/api'
const MaterialQuotesServices = {
  // material add api
  materialAdd: formData => {
    return api.post(`/material/addMaterial`, formData)
  },

  // list all contractor
  getMaterialList: (page, length) => {
    return api.get(`/material/getMaterialList?page=${page}&length=${length}`)
  },
  deleteMaterial: materialId => {
    return api.delete(`/material/deleteMaterial?materialId=${materialId}`)
  },
  getMaterialListByid: editId => {
    return api.get(`/material/getMaterialById?materialId=${editId}`)
  },
  updateMaterialById: (editId, formData) => {
    return api.put(`/material/updateMaterial?materialId=${editId}`, formData)
  },
  getMaterialDetailById: materialId => {
    return api.get(`/material/getMaterialDetailById?materialId=${materialId}`)
  },
  sendMaterialQuotePdf: editId => {
    return api.get(`/material/sendMaterialQuotePdf?materialId=${editId}`)
  },
  materialQuoteStatusUpdate: (token, formData) => {
    return api.post(
      `material/materialQuoteStatusUpdate?token=${token}`,
      formData,
      {
        headers: {
          'x-access-token': token
        }
      }
    )
  }
}
export default MaterialQuotesServices
