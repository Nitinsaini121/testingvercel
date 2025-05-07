'use client'
import BugetScopeTDTab from '@/components/BudgetTabsForm/BudgetScopeTabs/TieDown'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const BudgetScopeTab = ({ form }) => {
  const { watch } = form

  const projectScopes = watch('projectScopes') || []
console.log("projectScopes",projectScopes)
  // If `is_include` is defined, respect it; if not, include all
  const includedScopes = projectScopes.filter(scope => scope.is_include !== false)
  // console.log('projectScopes data', includedScopes)

  const uniqueTabs = [...new Set(includedScopes.map(scope => scope.short_title))]  // Extract unique short titles for tabs
console.log("uniqueTabs",uniqueTabs)

  const defaultTab = uniqueTabs[0] || ''
  return (
    <>
      {/* <Separator className='my-2' /> */}

      {uniqueTabs.length > 0 ? (
        <Tabs defaultValue={defaultTab}>
          <TabsList className='flex w-full items-center justify-start gap-4 bg-white mt-2 mb-4 sub-tabs'>
            {uniqueTabs.map(shortTitle => (
              <TabsTrigger
                key={shortTitle}
                value={shortTitle}
                className='p-2 rounded-full px-4 text-sm font-medium text-gray-500 '
              >
                {shortTitle}
              </TabsTrigger>
            ))}
          </TabsList>

          {uniqueTabs.map(shortTitle => {
            const scope = includedScopes.find(s => s.short_title === shortTitle)

            return (
              <TabsContent key={shortTitle} value={shortTitle}>
                <BugetScopeTDTab form={form} scope={scope} />

              </TabsContent>
            )
          })}
        </Tabs>
      ) : (
        <p className='text-sm text-gray-500'>No scopes available.</p>
      )}
    </>
  )
}

export default BudgetScopeTab


