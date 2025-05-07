'use client'
import { toast } from '@/hooks/use-toast'
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api'
import { Dispatch, SetStateAction, useState } from 'react'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form'
import { Input } from './ui/input'
import { UserAddress } from '@/types/leda-type'

export type LeadLocationType<T extends FieldValues> = {
  name: Path<T>
  form: UseFormReturn<T>
  placeholder: string
  label: string
  type: string
  className?: string // Add this line
  disable?: boolean
  setLatitude: React.Dispatch<React.SetStateAction<string | null>>
  setLongitude: React.Dispatch<React.SetStateAction<string | null>>
  setUserAddress: Dispatch<SetStateAction<UserAddress | undefined>>
}

export const GOOGLE_MAPS_API_KEY = 'AIzaSyD9OYDPZEEwIUn9pYb8F3sb-c4HmP_P0Ms' // Replace with your actual API key

const LocationSearch = <T extends FieldValues>({
  name,
  form,
  placeholder,
  label,
  type,
  disable,
  setLatitude,
  setLongitude,
  setUserAddress
}: LeadLocationType<T>) => {
  const [inputValue, setInputValue] = useState('') // Stores the input value
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null)
  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ['places'] // Ensure Places API is loaded
  })
  // Set Autocomplete reference
  const handleLoad = (
    autocompleteInstance: google.maps.places.Autocomplete
  ) => {
    setAutocomplete(autocompleteInstance)
  }

  // Handle place selection
  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace()
      if (place.geometry?.location) {
        setLatitude(place.geometry?.location.lat().toString())
        setLongitude(place.geometry?.location.lng().toString())

        // Full address from Google Places API
        const formattedAddress = place.formatted_address || ''

        // Extracting street address only
        let streetAddress = ''
        let city = ''
        let state = ''
        let zipCode = ''

        place.address_components?.forEach(component => {
          const types = component.types

          if (types.includes('street_number')) {
            streetAddress = component.long_name + ' ' + streetAddress
          }
          if (types.includes('route')) {
            streetAddress += component.long_name
          }
          if (types.includes('locality')) {
            city = component.long_name
          }
          if (types.includes('administrative_area_level_1')) {
            state = component.long_name
          }
          if (types.includes('postal_code')) {
            zipCode = component.long_name
          }
        })
        if (!city || !state || !zipCode) {
          toast({
            title: 'Incomplete Address Details',
            description:
              'Please select a more specific location that contains full address details.'
          })
          return
        }
        // Set full address in Location field, only street address in Address field
        setInputValue(formattedAddress)
        setUserAddress({
          fullAddress: formattedAddress,
          city,
          state,
          zip: zipCode
        })
      }
    }
  }

  return (
    <>
      {isLoaded && (
        <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
          <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input
                    disabled={disable}
                    className={`h-12 bg-white !shadow-[0_0_15px_-13px_black] shadow-slate-100 rounded border-color-grey !shadow-none`}
                    {...field}
                    placeholder={placeholder}
                    name={name}
                    type={type}
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </Autocomplete>
      )}
    </>
  )
}

export default LocationSearch
