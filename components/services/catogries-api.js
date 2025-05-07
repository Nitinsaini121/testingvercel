import api from '@/lib/api'

const ProductCatogriesServices = {
  addProductCategory: formData => {
    return api.post(`/productCategory/addProductCategory`, formData)
  },
  getAllProductCategory: (page, length) => {
    return api.get(
      `productCategory/getAllProductCategory?page=${page}&length=${length}`
    )
  },
  getProductCategoryById: editId => {
    return api.get(
      `productCategory/getProductCategoryById?productCategoryId=${editId}`
    )
  },
  updateProductCategoryById: (editId, formData) => {
    return api.put(
      `productCategory/updateProductCategoryById?productCategoryId=${editId}`,
      formData
    )
  },
  deleteProductCategoryById: deleteId => {
    return api.delete(
      `productCategory/deleteProductCategoryById?productCategoryId=${deleteId}`
    )
  }
,
getCategory : ()=>{
 return api.get('/productCategory/getAllProductCategory') 
}

}
export default ProductCatogriesServices
