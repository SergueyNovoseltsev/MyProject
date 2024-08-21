import {Text, View} from 'react-native'

import {createNativeStackNavigator} from '@react-navigation/native-stack'

import React from 'react'
import {RootNavigationStack} from './rootNavigationStack'
import Home from '../features/home'
import Detail from 'features/detail'
import {Button} from 'react-native-paper'
import {Cart} from 'features/cart'

const Stack = createNativeStackNavigator<RootNavigationStack>()

export default function NavigationStack(props: {
  initialRouteName: keyof RootNavigationStack
}) {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={({navigation}) => ({
          headerTitleAlign: 'center',
          headerTitle: () => (
            <View>
              <Text>EPICERIE MALIN</Text>
            </View>
          ),
          headerRight: () => (
            <Button
              icon="cart"
              mode="text"
              compact
              onPress={() => navigation.navigate('Cart')}>
              Panier
            </Button>
          ),
        })}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={() => ({
          headerTitleAlign: 'center',
          headerTitle: () => (
            <View>
              <Text>DETAIL</Text>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={() => ({
          headerTitleAlign: 'center',
          headerTitle: () => (
            <View>
              <Text>MON PANIER</Text>
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  )
}
