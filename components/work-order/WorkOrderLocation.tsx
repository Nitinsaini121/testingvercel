import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api'
import { Dispatch, SetStateAction, useState } from 'react'
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'

export type LeadLocationType<T extends FieldValues> = {
  name: Path<T>
  form: UseFormReturn<T>
  setLatitude: Dispatch<SetStateAction<number | null>>
  setLongitude: Dispatch<SetStateAction<number | null>>
  setUserAddress: Dispatch<SetStateAction<string | undefined>>
  disabled?: boolean
}

export const GOOGLE_MAPS_API_KEY = 'AIzaSyD9OYDPZEEwIUn9pYb8F3sb-c4HmP_P0Ms' // Replace with actual API key

const WorkOrderLocation = <T extends FieldValues>({
  name,
  form,
  setLatitude,
  setLongitude,
  setUserAddress,
  disabled
}: LeadLocationType<T>) => {
  const [inputValue, setInputValue] = useState(form.getValues(name) || '')
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  })

  const handleLoad = (
    autocompleteInstance: google.maps.places.Autocomplete
  ) => {
    setAutocomplete(autocompleteInstance)
  }

  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace()
      if (place.geometry?.location) {
        const formattedAddress = place.formatted_address || ''
        setInputValue(formattedAddress)
        setLatitude(place.geometry?.location.lat())
        setLongitude(place.geometry?.location.lng())
        form.setValue(name, formattedAddress as PathValue<T, Path<T>>) //+

        place.address_components?.forEach(component => {
          if (component.types.includes('locality')) {
            setUserAddress(component.long_name)
          }
        })
      }
    }
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Lead Location</FormLabel>
          <FormControl>
            {isLoaded && (
              <Autocomplete
                onLoad={handleLoad}
                onPlaceChanged={handlePlaceChanged}
              >
                <Input
                  disabled={disabled}
                  {...field}
                  placeholder='Enter Lead Location...'
                  value={inputValue}
                  onChange={e => {
                    setInputValue(e.target.value)
                    // form.setValue(name, e.target.value)//-
                    form.setValue(name, e.target.value as PathValue<T, Path<T>>) //+
                  }}
                  className='bg-white !shadow-[0_0_15px_-13px_black] shadow-slate-100'
                />
              </Autocomplete>
            )}
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default WorkOrderLocation
