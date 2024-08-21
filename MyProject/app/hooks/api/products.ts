import {useGetFetch} from '../fetch/fetchService'
import {Product} from 'models/products'

export function useGetProducts() {
  return useGetFetch<Product[]>('MY_API_ENDPOINT')
}

export function useGetProduct(id: number) {
  return useGetFetch<Product>(
    'MY_API_ENDPOINT/' + id,
  )
}

export function useGetMultipleProduct(ids: number[]) {
  const apiCalls = ids.map(index =>
    useGetFetch<Product>(
      'MY_API_ENDPOINT/' + index,
    ),
  )

  return apiCalls
}
