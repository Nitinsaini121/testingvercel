import api from '@/lib/api'
const TaskGroupServices = {
  AddGroup: formData => {
    return api.post(`/task-groups`, formData)
  },
  EditGroup: (editId, formData) => {
    return api.post(`/task-groups/${editId}`, formData)
  },
  GetAllTaskGroup: (page, length) => {
    return api.get(`/task-groups?limit=100&sort_column=id&sort_direction=asc&per_page=${length}&page=${page}`)
  },
  deleteGroupById: deleteIndex => {
    return api.delete(`/task-groups/${deleteIndex}`)
  },
  GetScopesBYId: scopId => {
    return api.get(`/scopes/${scopId}`)
  },
  UpdateScopesById: (scopId, formData) => {
    return api.post(`/scopes/${scopId}`, formData)
  }
}
export default TaskGroupServices
