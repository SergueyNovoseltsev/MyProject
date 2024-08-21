import {NavigatorScreenParams} from '@react-navigation/native'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootNavigationStack {}
  }
}

export type RootNavigationStack = {
  Home: undefined
  Detail: {id: number}
  Cart: undefined
}
