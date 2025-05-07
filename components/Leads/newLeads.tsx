import { Leads } from "@/types/leda-type"


export const createNewLeads = (
  data: Leads,
  longitude: string | null,
  latitude: string | null,
  customerLongitude:string |null,
  customerLatitude:string |null,
) => {
  return {
    leadFrom: "test",
    externalId: "data",
    leadsAge: data.leadsAge,
    lattitude: latitude,
    longitude: longitude,
    customerLongitude:customerLongitude ,
    customerLatitude:customerLatitude,
    date: data.date,
    address: data.address,
    city: data.city,
    state: data.state,
    scope: "roof",
    zip: data.zip,
    firstName: data.firstName,
    customerAddress: data.customerAddress,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    customerCity:data.customerCity,
    customerState:data.customerState,
    customerZip:data.customerZip
  }
}
