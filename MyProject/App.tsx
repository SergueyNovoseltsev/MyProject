import React from 'react'

import NavigationStack from './app/services/navigationStack'

import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native'
import {DefaultTheme, PaperProvider} from 'react-native-paper'

function App() {
  const navigationRef = useNavigationContainerRef()

  return (
    <NavigationContainer ref={navigationRef}>
      <PaperProvider theme={{...DefaultTheme}}>
        <NavigationStack initialRouteName={'Home'} />
      </PaperProvider>
    </NavigationContainer>
  )
}

export default App
