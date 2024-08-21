import {LoadingIndicator} from 'components/loadingIndicator'
import ProductListItem from 'components/productListItem'
import {useGetProducts} from 'hooks/api/products'
import React, {useCallback, useEffect, useMemo} from 'react'
import {FlatList, View} from 'react-native'
import {Button, Divider, List, Menu, Searchbar} from 'react-native-paper'
import styles from './styles'
import {RootNavigationStack} from 'services/rootNavigationStack'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {Cart, Product} from 'models/products'
import {clientStorage, storage} from 'services/storage'
import {useAddToCart} from 'hooks/cartHandler'

type Props = NativeStackScreenProps<RootNavigationStack, 'Home', undefined>

export default function Home({navigation}: Props) {
  const {callApi, data, isLoading} = useGetProducts()
  const [searchQuery, setSearchQuery] = React.useState('')
  const [categoryFilter, setCategoryFilter] = React.useState<string | null>(
    null,
  )
  const [supplierFilter, setSupplierFilter] = React.useState<string | null>(
    null,
  )
  const [products, setProducts] = React.useState<Product[] | null>(null)
  const [visibleCateg, setVisibleCateg] = React.useState(false)
  const [visibleSupp, setVisibleSupp] = React.useState(false)
  const categList = new Set(products?.map(p => p.category))
  const suppList = new Set(products?.map(p => p.supplier))
  const addToCart = useAddToCart

  useEffect(() => {
    callApi()
  }, [])

  useEffect(() => {
    setProducts(data)
  }, [data])

  useEffect(() => {
    let filtered = data?.filter(item =>
      item.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()),
    )
    if (!!supplierFilter)
      filtered = filtered?.filter(item =>
        item.supplier
          .toLocaleLowerCase()
          .includes(supplierFilter.toLocaleLowerCase()),
      )

    if (!!categoryFilter)
      filtered = filtered?.filter(item =>
        item.category
          .toLocaleLowerCase()
          .includes(categoryFilter.toLocaleLowerCase()),
      )

    if (filtered) setProducts(filtered)
  }, [categoryFilter, supplierFilter, searchQuery])

  const handleNavigateDetail = useCallback(
    (itemId: number) => {
      navigation.navigate('Detail', {id: itemId})
    },
    [data],
  )

  const displaySupps = [...suppList].map((item: string) => (
    <Menu.Item
      key={item}
      onPress={() => {
        setSupplierFilter(item)
        setVisibleSupp(false)
      }}
      title={supplierFilter === item ? item + ' ✓' : item}
    />
  ))
  const displayCategs = [...categList].map((item: string) => (
    <Menu.Item
      key={item}
      onPress={() => {
        setCategoryFilter(item)
        setVisibleCateg(false)
      }}
      title={categoryFilter === item ? item + ' ✓' : item}
    />
  ))

  return (
    <View style={styles.container}>
      <List.Section style={styles.listContainer}>
        <List.Subheader style={styles.subheader}>
          Liste des produits disponibles
        </List.Subheader>
        <Searchbar
          mode={'view'}
          style={styles.searchBar}
          placeholder="Recherche"
          onChangeText={setSearchQuery}
          value={searchQuery}
          onClearIconPress={e => {
            setSearchQuery('')
            setProducts(data)
          }}
        />
        <View style={styles.filterContainer}>
          <Menu
            visible={visibleSupp}
            onDismiss={() => setVisibleSupp(false)}
            anchor={
              <Button onPress={() => setVisibleSupp(true)}>
                {supplierFilter ?? 'Fournisseurs'}
              </Button>
            }>
            <Menu.Item
              key={0}
              onPress={() => {
                setSupplierFilter(null)
                setVisibleSupp(false)
              }}
              title={'Tous les fournisseurs'}
            />
            {displaySupps}
          </Menu>
          <Menu
            visible={visibleCateg}
            onDismiss={() => setVisibleCateg(false)}
            anchor={
              <Button onPress={() => setVisibleCateg(true)}>
                {categoryFilter ?? 'Catégories'}
              </Button>
            }>
            <Menu.Item
              key={0}
              onPress={() => {
                setCategoryFilter(null)
                setVisibleCateg(false)
              }}
              title={'Toutes les catégories'}
            />
            {displayCategs}
          </Menu>
        </View>
        {isLoading && <LoadingIndicator visible={true} />}
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
              navigateDetail={() => handleNavigateDetail(item.id)}
              addToCart={addToCart}
            />
          )}
          data={products}
          extraData={categoryFilter}
          style={styles.scrollView}
        />
      </List.Section>
    </View>
  )
}
