import api from '@/lib/api'
const SubContractorService = {
  // add Contractor
  addContractor: formData => {
    return api.post(`/contract/addContract`, formData)
  },

  // list all contractor
  allContractor: (page, length, dateStart, dateEnd, status, regionF) => {
    return api.get(
      `/contract/getAllContract?page=${page}&length=${length}&status=${status || ''}&region=${regionF || ''}&startDate=${dateStart || ''}&endDate=${dateEnd || ''}`
    )
  },

  // edit contractor
  getContractById: editId => {
    return api.get(`/contract/getContractById?contractId=${editId}`)
  },

  // get Duplicate Contractors
  getDuplicateContractors: () => {
    return api.get(`/contract/getDuplicateContracts`)
  },

  // merge Contractors
  mergeContractors: payload => {
    return api.put('/contract/mergeContracts', payload)
  },

  // delete Contractors
  deleteContractor: deleteIndex => {
    return api.delete(`/contract/deleteContract?contractId=${deleteIndex}`)
  },
  // delete Contractors
  updateContractor: (editId, formData) => {
    return api.put(`/contract/updateContract?contractId=${editId}`, formData)
  },
  mergeContracts: (getParentID,selectedRow) => {
    return api.put(`/contract/mergeContracts?parentContractId=${getParentID[0]}&childContractId=${selectedRow?.id}`)
  }
}
export default SubContractorService
