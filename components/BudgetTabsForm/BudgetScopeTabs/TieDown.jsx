import FormInputField from '@/components/share/form/FormInputField'
import RadioButton from '@/components/share/form/RadioButton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
const BugetScopeTDTab = ({ form, scope }) => {
  console.log('scope---1', scope)
  // )
  const { control, setValue, getValues, reset } = useFormContext()
  const projectScopes = useWatch({ control, name: 'projectScopes' })
  console.log('projectScopesprojectScopes', projectScopes)
  const tiedowns = useWatch({ control, name: 'tieDowns' })
  console.log('tiedownstiedowns', tiedowns)

  let tiedownFormData = []
  if (scope?.categories?.length) {
    tiedownFormData = scope.categories.flatMap(cat =>
      cat.groups.flatMap(group =>
        group.sagments.map(sag => ({
          title: sag.title || '',
          notes: sag.notes || '',
          is_include: sag.is_include,
          client_notes: sag.client_notes || '',
          acc: sag.acc || '',
          internal_notes: sag.internal_notes || '',
          sagment_id: sag.scopeSagment?.id || '',
          scope_group_id: group.scopeGroup?.id || '',
          group_title: group.title || '',
          scope_id: 41
        }))
      )
    )
  }
  console.log('tiedownFormDatatiedownFormDatatiedownFormData', tiedownFormData)
  const resetTiedowns = getValues('tieDowns')
console.log("resetTiedownsresetTiedownsresetTiedowns",resetTiedowns)
  useEffect(() => {
    if (!Array.isArray(tiedownFormData)) return
    const mapped = tiedownFormData.reduce((acc, item) => {
      const id = item?.title
      console.log("accaccaccaccacc",acc)
      if (!id) return acc
      acc[id] = {
        notes: item.notes || '',
        acc: item.acc || '',
        client_notes: item.client_notes || '',
        internal_notes: item.internal_notes || '',
        is_include: item.is_include
      }
      return acc
    }, {})
    // Reset the tiedowns with the mapped values
    setValue('tieDowns', mapped, { shouldValidate: true, shouldDirty: true })
  }, [])
  useEffect(() => {
    if (!tiedowns || typeof tiedowns !== 'object') return
    const updatedScopes = projectScopes.map(scope => ({
      ...scope,
      categories: scope.categories.map(category => ({
        ...category,
        groups: category.groups.map(group => ({
          ...group,
          sagments: group.sagments.map(sagment => {
            const id = sagment?.title
            const dataFromForm = tiedowns[id]
            return dataFromForm
              ? {
                  ...sagment,
                  is_include: dataFromForm.is_include,
                  notes: dataFromForm.notes,
                  acc: dataFromForm.acc,
                  client_notes: dataFromForm.client_notes,
                  internal_notes: dataFromForm.internal_notes
                }
              : sagment
          })
        }))
      }))
    }))
    setValue('projectScopes', updatedScopes, { shouldValidate: true })
  }, [tiedowns])
  return (
    <div className='space-y-4 scope-table'>
      <h3 className='text-base font-semibold uppercase'>{scope?.title}</h3>
      <Table>
        <TableHeader>
          <TableRow className='theme-bg-light-rgba rounded-6 border'>
            <TableHead className='w-1/6 text-left'>Category</TableHead>
            <TableHead className='w-1/12 text-center'>INC</TableHead>
            <TableHead className='w-1/12 text-center'>EXC</TableHead>
            <TableHead className='w-1/12 text-center'>NA</TableHead>
            <TableHead className='w-1/6 text-left'>NOTES</TableHead>
            {/* <TableHead className='w-1/6 text-left'>ACC</TableHead> */}
            <TableHead className='w-1/6 text-left'>CLIENT NOTES</TableHead>
            <TableHead className='w-1/6 text-left'>INTERNAL NOTES</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projectScopes
            ?.filter(scopeTitle => scopeTitle?.title == scope?.title)
            .flatMap(scope =>
              scope.categories.map(category => {
                return (
                  <>
                    <TableRow key={category?.scopeGroup?.id}>
                      <TableCell colSpan={8}>
                        <span className='block pt-2 text-base font-semibold text-muted-foreground'>
                          {category.title}
                        </span>
                      </TableCell>
                    </TableRow>
                    {category.groups.map(group =>
                      group.sagments.map(sagment => {
                        const fieldName = sagment?.title
                        return (
                          <TableRow
                            key={sagment?.scope_sagment_id}
                            className='align-top'
                          >
                            <TableCell className='text-sm'>
                              {sagment.title}
                            </TableCell>
                            {['inc', 'exc', 'na'].map(option => (
                              <TableCell key={option} className='!text-center'>
                                <RadioButton
                                className="text-gray-300"
                                  name={`tieDowns.${fieldName}.is_include`}
                                  options={[{ label: '', value: option }]}
                                  form={form}
                                />
                              </TableCell>
                            ))}
                            <TableCell>
                              <FormInputField
                                className='w-full !h-9'
                                form={form}
                                name={`tieDowns.${fieldName}.notes`}
                                placeholder=''
                              />
                            </TableCell>
                            {/* <TableCell>
                              <FormInputField
                                className='w-20  !h-9'
                                form={form}
                                name={`tieDowns.${fieldName}.acc`}
                                placeholder=''
                              />
                            </TableCell> */}
                            <TableCell>
                              <FormInputField
                                className='w-full  !h-9'
                                form={form}
                                name={`tieDowns.${fieldName}.client_notes`}
                                placeholder=''
                              />
                            </TableCell>
                            <TableCell>
                              <FormInputField
                                className='w-full  !h-9'
                                form={form}
                                name={`tieDowns.${fieldName}.internal_notes`}
                                placeholder=''
                              />
                            </TableCell>
                          </TableRow>
                        )
                      })
                    )}
                  </>
                )
              })
            )}
        </TableBody>
      </Table>
    </div>
  )
}
export default BugetScopeTDTab