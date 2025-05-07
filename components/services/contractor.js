import api from '@/lib/api'
const ContractorService = {
  formFieldVerify: token => {
    return api.get(`/contract/getRejectContractorVerification?`, {
      headers: {
        'x-access-token': token
      }
    })
  },
  documentUpload: (formData, token) => {
    return api.post(`/contract/addSubContractorVerification`, formData, {
      headers: {
        'x-access-token': token
      }
    })
  },

  linkForDocumentUpload: id => {
    return api.get(`/contract/getDocumentLink?contractId=${id}`)
  },
  getContractorVerification: id => {
    return api.get(`/contract/getContractorVerification?contractId=${id}`)
  }
}
export default ContractorService
