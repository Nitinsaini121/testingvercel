import { Contractor } from '@/types/contractor-type'

export const createNewContract = (data: Contractor) => {
  return {
    contractorName: data.contractorName,
    logo: data.logo,
    contractorPhone: data.contractorPhone,
    contractorAddress: data.contractorAddress,
    contractorEmail: data.contractorEmail,
    contractorCity: data.contractorCity,
    contractorState: data.contractorState,
    contractorZip: data.contractorZip,
    contacts: data.contacts,
    ativities: data.ativities,
    internalNotes: data.internalNotes,
    gaf: data.gaf,
    gafCertifications: data.gafCertifications,
    gafRating: data.gafRating,
    gafReviews: data.gafReviews,
    certineed: data.certineed,
    certineedCertifications: data.certineedCertifications,
    certineedRating: data.certineedRating,
    certineedReviews: data.certineedReviews,
    owensCoring: data.owensCoring,
    owensCoringCertifications: data.owensCoringCertifications,
    owensCoringRating: data.owensCoringRating,
    owensCoringReviews: data.owensCoringReviews,
    leadScore: data.leadScore,
    qualifiedContractorFormStarted: data.qualifiedContractorFormStarted,
    qualifiedContractorFormSubmitted: data.qualifiedContractorFormSubmitted,
    qualifiedContractorFormApproove: data.qualifiedContractorFormApproove,
    leadCompleteScore: data.leadCompleteScore,
    leadSource: data.leadSource,
    status: data.status,
    regionalZipCode: data.regionalZipCode,
    contractorRegion: data.contractorRegion,
    notes: data.notes
  }
}
