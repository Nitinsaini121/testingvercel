export type Contractor = {
  id: string
  logo:string
  contractorName: string
  contractorPhone: string
  contractorEmail: string
  contractorCity: string
  contractorState: string
  contractorZip: string
  contacts: string
  ativities: string
  contractorAddress: string
  gaf: string
  gafCertifications: string[] | string
  gafRating: string
  gafReviews: string
  certineed: string
  certifications:string
  certineedCertifications: string[] | string
  certineedRating: string
  certineedReviews: string
  owensCoring: string
  owensCoringCertifications: string[] | string
  owensCoringRating: string
  owensCoringReviews: string
  leadScore: string
  leadCompleteScore: string
  leadSource: string
  status: string
  regionalZipCode: string
  contractorRegion: string[] |string
  notes: string
  internalNotes: string
  qualifiedContractorFormStarted:string
  qualifiedContractorFormSubmitted:string
  qualifiedContractorFormApproove:string
  qualifiedContractors: string
}