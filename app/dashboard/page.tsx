'use client'
import useDocumentTitle from "@/components/utils/useDocumentTitle"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  useDocumentTitle("Home")
  const {data:session}= useSession()
  const router=useRouter()
  if ((session?.user?.role as string) === "qualified_contractor") {
    router.replace('/workorder');
  }
  return <>Admin dashboard</>
}
