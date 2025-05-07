import api from '@/lib/api'

const UsersServices = {
  users: () => {
    return api.get(`/users`)
  },
  AddUser: formData => {
    return api.post(`/users`, formData)
  }
}
export default UsersServices
