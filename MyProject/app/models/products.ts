export interface Product {
  id: number
  name: string
  description: string
  supplier: string
  category: string
  specification: string
  thumbnail: string
  price: number
  image: string
}

export interface CartType {
  id: number
  quant: number
}
