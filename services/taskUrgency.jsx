import api from '@/lib/api'
const TaskUrgencyServices = {
  AddUrgency: formData => {
    return api.post(`/task-urgencies`, formData)
  },
  EditUrgency: (editId, formData) => {
    return api.post(`/task-urgencies/${editId}`, formData)
  },
  GetAllTaskUrgency: (page, length) => {
    return api.get(`/task-urgencies?limit=100&sort_column=id&sort_direction=asc&per_page=${length}&page=${page}`)
  },
  deleteUrgencytById: deleteIndex => {
    return api.delete(`/task-urgencies/${deleteIndex}`)
  },
}
export default TaskUrgencyServices
