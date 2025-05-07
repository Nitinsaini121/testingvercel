import api from '@/lib/api'
const ContractorProposalServices = {
  getContractorProposal: (workOrderId, contractorId) => {
    return api.get(
      `/applyWorkOrder/getContractorProposal?workOrderId=${workOrderId}&contractorId=${contractorId}`
    )
  },
  acceptRejectProposal: (workOrderId, contractorId,formData) => {
    return api.put(
      `/applyWorkOrder/acceptRejectProposal?workOrderId=${workOrderId}&contractorId=${contractorId}`,formData
    )
  }
}
export default ContractorProposalServices
