
export interface CategoryData {
  results: number
  metadata: Metadata
  data: CategoryI[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
}

export interface CategoryI {
  _id: string
  name: string
  slug: string
  image: string
  createdAt : string
  updatedAt : string
}

