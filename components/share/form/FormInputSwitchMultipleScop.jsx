import { Switch } from '@/components/ui/switch'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

const FormScopeToggle = ({ name, scopeItem }) => {
  const { control, setValue, watch } = useFormContext()
  const selectedScopes = watch('projectScopes') || []

  // Transform nested IDs
  const transformScopeItem = item => {
    return {
      scope_id: item.id,
      title: item.title,
      short_title: item.short_title,
      categories: (item.categories || []).map(category => ({
        scope_category_id: category.id,
        title: category.title,
        groups: (category.groups || []).map(group => ({
          scope_group_id: group.id,
          title: group.title,
          sagments: (group.sagments || []).map(sagment => ({
            scope_sagment_id: sagment.id,
            title: sagment.title
          }))
        }))
      }))
    }
  }

  const isSelected = selectedScopes.some(s => s?.scope_id === scopeItem?.id)

  const handleToggle = checked => {
    const transformedScope = transformScopeItem(scopeItem)
    const updated = checked
      ? [...selectedScopes, transformedScope]
      : selectedScopes.filter(s => s?.scope_id !== scopeItem?.id)
    setValue('projectScopes', updated, { shouldValidate: true })
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={isSelected}
      render={({ field }) => (
        <Switch
          checked={field.value}
          onCheckedChange={checked => {
            field.onChange(checked)
            handleToggle(checked)
          }}
        />
      )}
    />
  )
}

export default FormScopeToggle
