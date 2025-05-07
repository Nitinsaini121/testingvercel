import api from '@/lib/api'

const RolesServices = {
  roles: () => {
    return api.get(`/roles`)
  },
  
}
export default RolesServices


