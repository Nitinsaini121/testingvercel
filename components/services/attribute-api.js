import api from '@/lib/api'
const AttributeServices = {
  // attribute add api
  addAttribute: formData => {
    return api.post(`/attribute/addAttribute`, formData)
  },

  // list all contractor
  getAllAttributes: () => {
    return api.get(`/attribute/getAllAttributes`)
  },
  deleteAttributesById: deleteIndex => {
    return api.delete(`/attribute/deleteAttributesById?attributeId=${deleteIndex}`)
  },
  getAttributesById: editId => {
    return api.get(`/attribute/getAttributesById?attributeId=${editId}`)
  },
  updateAttributesById: (editId, values) => {
    return api.put(`/attribute/updateAttributesById?attributeId=${editId}`, values)
  }


}
export default AttributeServices
