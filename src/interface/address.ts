export interface DataAddressI {
  results: number
  status: string
  message? : string
  data: DataAddress[]
}

export interface DataAddress {
  _id: string
  name: string
  details: string
  phone: string
  city: string
}
export interface AddressI {
  name : string , 
  details : string , 
  phone : string , 
  city : string
}