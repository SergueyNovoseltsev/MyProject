import {LoadingIndicator} from 'components/loadingIndicator'
import {useGetProduct} from 'hooks/api/products'
import React, {useEffect} from 'react'
import {Image, View} from 'react-native'
import {Chip, Text} from 'react-native-paper'
import styles from './styles'
import {RootNavigationStack} from 'services/rootNavigationStack'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

type Props = NativeStackScreenProps<RootNavigationStack, 'Detail'>

export default function Detail({route}: Props) {
  const {callApi, data, isLoading} = useGetProduct(route.params.id)

  useEffect(() => {
    callApi()
  }, [])

  if (isLoading || data === null) return <LoadingIndicator visible={true} />
  else
    return (
      <View style={styles.mainContainer}>
        <Image
          source={{uri: data.image + '?' + data.id}}
          height={240}
          width={320}
        />
        <View>
          <Text variant="headlineMedium">{data.name}</Text>
        </View>
        <View style={styles.suppInfo}>
          <Chip mode="outlined">{data.supplier}</Chip>
          <Chip>{data.category}</Chip>
        </View>
        <View style={styles.content}>
          <Text style={styles.textCenter} variant="titleLarge">
            {data.specification}
          </Text>
          <Text style={styles.textCenter} variant="labelMedium">
            {data.description}
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text variant="headlineSmall">{data.price}€</Text>
        </View>
      </View>
    )
}
