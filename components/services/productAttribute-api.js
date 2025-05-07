import api from '@/lib/api'
const ProductAttributeServices = {
  // material add api
  addProductAttribute: formData => {
    return api.post(`/productAttribute/addProductAttribute`, formData)
  },

  getAllProductAttributes: () => {
    return api.get(`/productAttribute/getAllProductAttributes`)
  },
  deleteProductAttributesById: materialId => {
    return api.delete(`/productAttribute/deleteProductAttributesById?productAttributeId=${materialId}`)
  },
  getProductAttributesById: editId =>{
    return api.get(`/productAttribute/getProductAttributesById?productAttributeId=${editId}`)
  },
  updateProductAttributesById: (editId,formData) =>{
    return api.put(`/productAttribute/updateProductAttributesById?productAttributeId=${editId}`,formData)
  },
}
export default ProductAttributeServices
