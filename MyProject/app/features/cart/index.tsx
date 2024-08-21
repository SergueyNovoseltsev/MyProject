import {CartType, Product} from 'models/products'
import * as React from 'react'
import {FlatList} from 'react-native'
import {useRemoveFromCart} from 'hooks/cartHandler'
import {clientStorage} from 'services/storage'
import ProductListItem from 'components/productListItem'
import styles from './styles'
import {useGetMultipleProduct} from 'hooks/api/products'

type Props = {}

export const Cart = ({}: Props) => {
  const removeFromCart = useRemoveFromCart
  const items: CartType[] | null = clientStorage.getObject('cart')
  const calls = useGetMultipleProduct(items?.map(item => item.id) ?? [])

  React.useEffect(() => {
    calls.map(call => call.callApi())
  }, [])

  if (!items) return <></>
  else
    return (
      <FlatList
        getItemLayout={(data, index) => ({
          length: 110,
          offset: 110 * index,
          index,
        })}
        maxToRenderPerBatch={20}
        removeClippedSubviews={true}
        renderItem={({item}) => (
          <ProductListItem
            item={item}
            removeFromCart={removeFromCart}
            quantityCart={items.find(prod => prod.id === item?.id)?.quant}
          />
        )}
        data={calls.map(call => call.data)}
        style={styles.scrollView}
      />
    )
}
