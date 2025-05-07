


import api from '@/lib/api'
const ProductQuote = {
  // material add api
  addTakeOffQuote: formData => {
    return api.post(`/takeOffQuote/addTakeOffQuote`, formData)
  },

  getAllTakeOffQuote: (page,length,id) => {
    return api.get(`takeOffQuote/getAllTakeOffQuote?page=${page}&length=${length}&leadId=${id}`)
  },
  deleteTakeOffQuoteById: deleteIndex => {
    return api.delete(`/takeOffQuote/deleteTakeOffQuoteById?takeOffQuoteId=${deleteIndex}`)
  },
  getTakeOffQuoteById: editId =>{
    return api.get(`/takeOffQuote/getTakeOffQuoteById?takeOffQuoteId=${editId}`)
  },
  updateTakeOffQuoteById: (editId,formData) =>{
    return api.put(`/takeOffQuote/updateTakeOffQuoteById?takeOffQuoteId=${editId}`,formData)
  },
}
export default ProductQuote
