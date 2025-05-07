"use client"
import { Contractor } from '@/types/contractor-type'
import { Leads } from '@/types/leda-type'
import { User } from '@/types/user-type'
import { createContext } from 'react'
export interface UserContextType {
  leadsList: Leads[]
  setLeadList: (leads: Leads[]) => void
  userList: User[]
  setUserList: (users: User[]) => void
  contractor: Contractor[]
  setContractor: (contractors: Contractor[]) => void
  breadcrumbData?: any
  setBreadCrumbsData?: (data: any) => void
  getRegions: string[] // ✅ Add this line
  setRegions: (regions: string[]) => void // ✅ Add this line
  catalog:any
  setCatalog:any
}
const UserContext = createContext<UserContextType | null>(null)
export default UserContext
