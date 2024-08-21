import {CartType} from 'models/products'
import {clientStorage} from 'services/storage'

export const useAddToCart = (newItem: CartType) => {
  let cartContent: CartType[] = []
  let itemByIndex

  if (!clientStorage.contains('cart'))
    clientStorage.setObject('cart', [newItem])
  else {
    cartContent = clientStorage.getObject('cart')
    itemByIndex = cartContent.findIndex(
      (item: CartType) => item.id === newItem.id,
    )

    if (itemByIndex >= 0)
      cartContent[itemByIndex].quant =
        cartContent[itemByIndex].quant + newItem.quant
    else cartContent.push(newItem)
    clientStorage.setObject('cart', cartContent)
  }
}

export const useRemoveFromCart = (itemId: number) => {
  let cartContent: CartType[] = []

  cartContent = clientStorage.getObject('cart')
  cartContent = cartContent.filter((item: CartType) => item.id !== itemId)

  clientStorage.setObject('cart', cartContent)
}
