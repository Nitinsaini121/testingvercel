import api from '@/lib/api'
const LeadServices = {
  //  add api
  addLead: formData => {
    return api.post(`/lead/addLead`, formData)
  },

  // list all
  getAllLeads: (page, length) => {
    return api.get(`lead/getAllLeads?page=${page}&length=${length}`)
  },
  leadDelete: deleteIndex => {
    return api.delete(`lead/leadDelete?leadId=${deleteIndex}`)
  },
  getLeadById: editId => {
    return api.get(`/lead/getLeadById?leadId=${editId}`)
  },
  leadUpdate: (editId, newLeads) => {
    return api.put(`lead/leadUpdate?leadId=${editId}`, newLeads)
  }
}
export default LeadServices
