import api from '@/lib/api'
const InventoryService = {
  // add data
  addInventory: formData => {
    return api.post(`/inventory/addInventory`, formData)
  },

  // get data by id
  getInventorById: editId => {
    return api.get(`/inventory/getInventoryById?inventoryId=${editId}`)
  },

  // delete row
  deleteInventory: deleteIndex => {
    return api.delete(`/inventory/deleteInventory?inventoryId=${deleteIndex}`)
  },
  // list all data
  listInventory: (page, length) => {
    return api.get(`/inventory/getAllInventory?page=${page}&length=${length}`)
  },

  // update data
  updateInventor: (editId, data) => {
    return api.put(`/inventory/updateInventorById?inventoryId=${editId}`, data)
  }
}
export default InventoryService
