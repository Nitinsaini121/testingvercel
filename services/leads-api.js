import api from '@/lib/api'

const LeadsServices = {
  addLeads: formData => {
    return api.post(`/leads`, formData)
  },

  getleads: (page, length) => {
    return api.get(`/leads?page=${page}&per_page=${length}`)
  },
  deleteLead: deleteIndex => {
    return api.delete(`/leads/${deleteIndex}`)
  },
  getleadById: editId => {
    return api.get(`/leads/${editId}`)
  },
  updateLeadById: (editId, values) => {
    return api.post(`/leads/${editId}`, values)
  },
  updateLeadDcsById: (editId, values) => {
    return api.post(`/lead-dcs/${editId}`, values)
  },

  // use form apis
  companies: () => {
    return api.get(`/companies`)
  },

  contacts: () => {
    return api.get(`/contacts`)
  },
  interactions: () => {
    return api.get(
      `/interactions?limit=100&sort_column=id&sort_direction=asc&per_page=10&page=1`
    )
  },
  Notes: formData => {
    return api.post(`/lead-notes`, formData)
  },
  GetNotes: editId => {
    return api.get(`/lead-notes?limit=100&lead_id=${editId}`)
  },
  interactionType: () => {
    return api.get(`/interaction-types?limit=100&take_all=true`)
  },
  contacts: () => {
    return api.get(`/contacts`)
  },
  AddinteractionType: formData => {
    return api.post(`/interactions`, formData)
  },

  projectCost: editId => {
    return api.get(`/project-cost?limit=100&lead_id=${editId}&type=cost`)
  },

  addCost: formData => {
    return api.post(`/project-cost`, formData)
  },

  projectPrice: editId => {
    return api.get(`/project-cost?limit=100&lead_id=${editId}&type=price`)
  },
  tasksAll: (editId, length, page) => {
    return api.get(
      `/lead-tasks?limit=100&lead_id=${editId}&sort_column=id&sort_direction=asc&per_page=${length}&page=${page}`
    )
  },
  deleteTask: deleteIndex => {
    return api.delete(`/lead-tasks/${deleteIndex}`)
  },
  addTask: formData => {
    return api.post(`/lead-tasks`, formData)
  },
  editTask: (taskId, formData) => {
    return api.post(`/lead-tasks/${taskId}`, formData)
  }
}
export default LeadsServices
const LeadList = {
  GETLIST: '/leads'
}
export const GetFilterData = {
  getleads: params => {
    return api.get(LeadList.GETLIST, {
      params: {
        limit: 100,
        ...params
      }
    })
  }
}
