import api from '@/lib/api'

const CompaniesServices = {
  
  companies: () => {
    return api.get(`/companies`)
  },
  AddCompanies: (formData) => {
    return api.post(`/companies`, formData)
  }
  
}
export default CompaniesServices
