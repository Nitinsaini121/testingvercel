import api from '@/lib/api'
const TaskTagServices = {
  AddTags: formData => {
    return api.post(`/task-tags`, formData)
  },
  EditTags: (editId, formData) => {
    return api.post(`/task-tags/${editId}`, formData)
  },
  GetAllTaskTag: (page, length) => {
    return api.get(`/task-tags?limit=100&sort_column=id&sort_direction=asc&per_page=${length}&page=${page}`)
  },
  deleteTagById: deleteIndex => {
    return api.delete(`/task-tags/${deleteIndex}`)
  },
}
export default TaskTagServices
