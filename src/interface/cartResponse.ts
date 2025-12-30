import { ProductI } from "./products"

export interface CartResponseI {
  status: string
  message? : string
  numOfCartItems: number
  cartId: string
  data: Data
}

export interface Data {
  _id: string
  cartOwner: string
  products: itemI[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

export interface itemI {
  count: number
  _id: string
  product: ProductI
  price: number
}

