'use client'
import { toast } from '@/hooks/use-toast'
import api from '@/lib/api'
import { Contractor } from '@/types/contractor-type'
import { Leads } from '@/types/leda-type'
import { User } from '@/types/user-type'
import { ReactNode, useEffect, useState } from 'react'
import useLocalStorage from 'use-local-storage'
import UserContext from './usercontext'
interface UserContextProviderProps {
  children: ReactNode
}

const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children
}) => {
  const [leadsList, setLeadList] = useLocalStorage<Leads[]>('leadsList', [])
  const [userList, setUserList] = useLocalStorage<User[]>('userList', [])
  const [contractor, setContractor] = useLocalStorage<Contractor[]>(
    'contractor',
    []
  )
  const [catalog, setCatalog] = useLocalStorage('catalog', [])
  const [breadcrumbData, setBreadCrumbsData] = useState()
  const [getRegions, setRegions] = useState<string[]>([])
  // fetch api for contractor regions
  const fetchData = async () => {
    try {
      const getAllRegions = await api.get(`contract/getAllContractRegion`)
      setRegions(getAllRegions?.data?.data)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch contract regions.'
      })
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <UserContext.Provider
      value={{
        getRegions,
        setRegions,
        leadsList,
        setLeadList,
        userList,
        setUserList,
        contractor,
        setContractor,
        breadcrumbData,
        setBreadCrumbsData,
        catalog,
        setCatalog
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
export default UserContextProvider
