import api from '@/lib/api'
const UsersServices = {
  //  add api
  register: formData => {
    return api.post(`/auth/register`, formData)
  },

  // list all
  getAllUsers: (page, length, roleParam) => {
    return api.get(
      `/auth/getAllUsers?page=${page}&length=${length}&role=${roleParam}`
    )
  },
  deleteUser: deleteIndex => {
    return api.delete(`/auth/deleteUser`, {
      params: { userId: deleteIndex }
    })
  },
  getUserById: editUserId => {
    return api.get(`/auth/getUserById?userId=${editUserId}`)
  },
  updateUser: (editUserId, formData) => {
    return api.put(`/auth/updateUser?userId=${editUserId}`, formData)
  }
}
export default UsersServices
