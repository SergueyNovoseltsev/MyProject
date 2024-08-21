import {useRemoveFromCart} from 'hooks/cartHandler'
import {CartType, Product} from 'models/products'
import * as React from 'react'
import {Image, Pressable, StyleSheet, Text, View} from 'react-native'
import {Button, Icon, List, Menu} from 'react-native-paper'

type Props = {
  navigateDetail?: () => void
  addToCart?: (items: CartType) => void
  removeFromCart?: (itemId: number) => void
  item: Product | null
  quantityCart?: number
}

const ProductListItem = ({
  item,
  navigateDetail,
  addToCart,
  quantityCart,
}: Props) => {
  if (!item) return
  const [isQuantOpen, setIsQuantOpen] = React.useState(false)
  const [quantity, setQuantity] = React.useState(1)
  const quantityComp: React.ReactNode[] = []

  if (!quantityCart)
    for (let i = 1; i <= 15; i++)
      quantityComp.push(
        <Menu.Item
          style={{height: 30, width: 20}}
          key={i}
          onPress={() => {
            setQuantity(i)
            setIsQuantOpen(false)
          }}
          title={i}
        />,
      )

  return (
    <List.Item
      onPress={navigateDetail}
      style={styles.mainContainer}
      description={() => (
        <Text style={styles.specText}>{item.specification}</Text>
      )}
      title={() => (
        <View>
          <Text style={styles.nameText}>
            {item.name}
            {item.id}
          </Text>
          <Text style={styles.infoText}>
            {item.supplier + ' - ' + item.category}
          </Text>
        </View>
      )}
      left={() => (
        <View style={styles.leftContent}>
          <Image
            source={{
              uri: item.thumbnail + '?' + item.id,
            }}
            height={45}
            width={45}
          />
        </View>
      )}
      right={() => (
        <View style={styles.mainRightContainer}>
          <Text>{item.price + '€'}</Text>
          <Pressable
            style={styles.rightContent}
            onPress={() => addToCart?.({id: item.id, quant: quantity})}>
            <View style={styles.rightContentCart}>
              {!quantityCart ? (
                <Menu
                  style={{paddingRight: 80}}
                  visible={isQuantOpen}
                  onDismiss={() => setIsQuantOpen(false)}
                  anchor={
                    <View>
                      <Text>Quantité</Text>
                      <Button
                        style={styles.buttonQuantity}
                        icon="menu-down"
                        mode="text"
                        buttonColor={'lightblue'}
                        onPress={() => setIsQuantOpen(true)}>
                        {quantity}
                      </Button>
                    </View>
                  }>
                  {quantityComp}
                </Menu>
              ) : (
                <></>
              )}
              {!quantityCart ? (
                <Pressable android_ripple={{color: 'lightblue', radius: 16}}>
                  <Icon source="cart-plus" color={'blue'} size={28} />
                </Pressable>
              ) : (
                <Text>x {quantityCart}</Text>
              )}
            </View>
          </Pressable>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    height: 110,
  },
  listContainer: {
    height: 70,
  },
  mainRightContainer: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  leftContent: {
    top: 15,
  },
  rightContent: {
    flexDirection: 'row',
    right: 0,
  },
  rightContentCart: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    right: -20,
  },
  buttonQuantity: {},
  nameText: {
    fontSize: 18,
  },
  infoText: {
    fontSize: 14,
  },
  specText: {
    fontSize: 10,
  },
})

export default React.memo(ProductListItem)
