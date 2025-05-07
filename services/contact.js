import api from '@/lib/api'

const ContactServices = {
  contacts: () => {
    return api.get(`/contacts`)
  },
  AddContacts: formData => {
    return api.post(`/contacts`, formData)
  },
  getContactById: editId => {
    return api.get(`/contacts/${editId}`)
  },

  updateContactById: (editId, values) => {
    return api.post(`/contacts/${editId}`, values)
  },
  deleteContact: deleteIndex => {
    return api.delete(`/contacts/${deleteIndex}`)
  },
  ContractorComponents: () => {
    return api.get(`/contract-components?limit=100`)
  },
  getAllContact: (page, length) => {
    return api.get(`/contacts?limit=100&page=${page}&per_page=${length}`)
  }
}
export default ContactServices
