import api from '@/lib/api'
const ConfigureAttributeServices = {
  // attribute add api
  addConfigureAttribute: payload => {
    return api.post(`/configureAttribute/addConfigureAttribute`, payload)
  },

  // list all contractor
  getAllConfigAttributes: (attributeId) => {
    return api.get(`/configureAttribute/getAllConfigAttributes?attributeId=${attributeId}`)
  },
  deleteConfigAttributesById: deleteIndex => {
    return api.delete(`/configureAttribute/deleteConfigAttributesById?configAttributeId=${deleteIndex}`)
  },
  getConfigAttributesById: editId => {
    return api.get(`/configureAttribute/getConfigAttributesById?configAttributeId=${editId}`)
  },
  updateConfigAttributesById: (editId, values) => {
    return api.put(`/configureAttribute/updateConfigAttributesById?configAttributeId=${editId}`, values)
  }


}
export default ConfigureAttributeServices
