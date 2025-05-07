import api from '@/lib/api'

const ProjectServices = {
    addProject: projectData => {
    return api.post(`/project/addProject`, projectData)
  },
  getAllProject: () => {
    return api.get(`project/getAllProject`)
  },
  getProjectById: editId => {
    return api.get(
      `/project/getProjectById?projectId=${editId}`
    )
  },
  updateProject: (editid, projectData) => {
    return api.put(
      `project/updateProject?projectId=${editid}`,
      projectData
    )
  },
  deleteProject: deleteId => {
    return api.delete(
      `/project/deleteProject?projectId=${deleteId}`
    )
  }
}
export default ProjectServices
