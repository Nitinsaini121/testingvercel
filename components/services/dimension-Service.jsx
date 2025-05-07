import api from '@/lib/api'

const DimensionService = {
    addRoofMeasure: formData => {
    return api.post(`/lead/addRoofMeasure`, formData)
  },
//   Product catogries in the lead
  getAllCategoryWithProduct: () => {
    return api.get(`productCategory/getAllCategoryWithProduct`)
  },
  roofMeasureId: leadId => {
    return api.get(
      `lead/getRoofMeasureByLeadId?roofMeasureId=${leadId}`
    )
  },
  updateRoofMeasure: (leadId, formData) => {
    return api.put(
      `lead/updateRoofMeasure?roofMeasureId=${leadId}`,
      formData
    )
  },
  deleteProductCategoryById: deleteId => {
    return api.delete(
      `productCategory/deleteProductCategoryById?productCategoryId=${deleteId}`
    )
  }
}
export default DimensionService
