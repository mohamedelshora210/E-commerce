import { ProductI } from "./products"


export interface OrderI {
  shippingAddress?: ShippingAddress
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  _id: string
  user: UserI
  cartItems: CartItem[]
  createdAt: string
  updatedAt: string
  id: number
  __v: number
}

export interface ShippingAddress {
  details: string
  phone: string
  city: string
}

export interface UserI {
  _id: string
  name: string
  email: string
  phone: string
}

export interface CartItem {
  count: number
  product: ProductI
  price: number
  _id: string
}


