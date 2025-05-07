import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
export const useUnsavedChangesWarning = (formSubmitted, watch, isDirty) => {

  const router = useRouter()
  useEffect(() => {
    const handleBeforeUnload = event => {
      const value = watch()
      const isFormEmpty = Object.entries(value)
      // !formSubmitted && !isDirty && !isFormEmpty
      if (true) {
        const message = 'Are you sure you want to leave this page?'

        event.returnValue = message
        return message
      }
    }

    const handleRouteChange = url => {
      const value = watch()
      const isFormEmpty = Object.entries(value).includes(value)

      if (!formSubmitted && isDirty && !isFormEmpty) {
        const confirmation = window.confirm(
          'Are you sure you want to leave this page?'
        )

        if (!confirmation) {
          throw new Error('Route change aborted.')
        }
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload);

    const originalPush = router.push
    router.push = async (url, ...args) => {
      try {
        handleRouteChange(url)
        await originalPush(url, ...args)
      } catch (e) {
        // Handle error if route change is aborted
      }
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      router.push = originalPush
    }
  }, [router, formSubmitted, isDirty, watch])
}
