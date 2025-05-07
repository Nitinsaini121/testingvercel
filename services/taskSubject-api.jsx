import api from '@/lib/api'
const TaskSubjectServices = {
  AddSubject: formData => {
    return api.post(`/task-subjects`, formData)
  },
  EditSubject: (editId, formData) => {
    return api.post(`/task-subjects/${editId}`, formData)
  },
  GetAllTaskSubject: (page, length) => {
    return api.get(`/task-subjects?limit=100&sort_column=id&sort_direction=asc&per_page=${length}&page=${page}`)
  },
  deleteSubjectById: deleteIndex => {
    return api.delete(`/task-subjects/${deleteIndex}`)
  },
}
export default TaskSubjectServices
