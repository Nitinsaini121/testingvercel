import api from '@/lib/api'
const QualifiedSubContractorService = {
  // list all Qualified Contractor
  allQualifiedContractor: (page, length) => {
    return api.get(
      `/contract/getAllContract?page=${page}&length=${length}&qualifiedContractor=true`
    )
  }
}
export default QualifiedSubContractorService
