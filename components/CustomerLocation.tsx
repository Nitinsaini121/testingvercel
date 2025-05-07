import { Autocomplete, useJsApiLoader } from '@react-google-maps/api'
import { Dispatch, SetStateAction, useState } from 'react'
import { Input } from './ui/input'
import { UserAddress } from '@/types/leda-type'

export type LeadLocationType = {
  setCustomerLatitude: React.Dispatch<React.SetStateAction<string | null>>
  setCustomerLongitude: React.Dispatch<React.SetStateAction<string | null>>
  setCustomerAddress: Dispatch<SetStateAction<UserAddress | undefined>>
}

export const GOOGLE_MAPS_API_KEY = 'AIzaSyD9OYDPZEEwIUn9pYb8F3sb-c4HmP_P0Ms' // Replace with your actual API key

const LocationSearchCustomer = ({
  setCustomerLongitude,
  setCustomerLatitude,
  setCustomerAddress
}: LeadLocationType) => {
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
        setInputValue(place.formatted_address || '')
        setCustomerLongitude(place.geometry?.location.lng().toString())
        setCustomerLatitude(place.geometry?.location.lat().toString())

        let city = ''
        let state = ''
        let zipCode = ''

        place.address_components?.forEach(component => {
          const types = component.types

          if (types.includes('locality')) {
            city = component.long_name // Extract city
          }
          if (types.includes('administrative_area_level_1')) {
            state = component.long_name // Extract state
          }
          if (types.includes('postal_code')) {
            zipCode = component.long_name // Extract zip code
          }
        })

        // Ensure state updates correctly

        setCustomerAddress((prevState: UserAddress) => ({
          ...prevState,
          city: city,
          state: state,
          zip: zipCode
        }))
      }
    }
  }

  return (
    <>
      {isLoaded && (
        <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
          <div>
            <label>Customer Location</label>
            <Input
              type='text'
              placeholder='Enter Customer Location...'
              value={inputValue}
              onChange={e => setInputValue(e.target.value)} // Allow manual typing
              style={{
                padding: '8px',
                marginTop: '6px',
                backgroundColor: 'white'
              }}
            />
          </div>
        </Autocomplete>
      )}
    </>
  )
}

export default LocationSearchCustomer
