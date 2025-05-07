import api from '@/lib/api'
const ManufacturerService = {
  // add data
  addManufacturer: formData => {
    return api.post(`/manufacturer/addManufacturer`, formData)
  },

  // get data by id
  getManufacturerById: editId => {
    return api.get(`/manufacturer/getManufacturerById?manufacturerId=${editId}`)
  },

  // delete row
  deleteManufacturer: deleteIndex => {
    return api.delete(
      `/manufacturer/deleteManufacturerById?manufacturerId=${deleteIndex}`
    )
  },
  // list all data
  listManufacturer: (page,length) => {
    return api.get(`/manufacturer/getAllManufacturer?page=${page}&length=${length}`)
  },

  // update data
  updateContractor: (editId, formData) => {
    return api.put(
      `/manufacturer/updateManufacturerById?manufacturerId=${editId}`,
      formData
    )
  }
}
export default ManufacturerService
