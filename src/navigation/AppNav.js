import {View, Text, StatusBar} from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'

import AuthStack from './AuthStack'
import AppStack from './AppStack'

import {AuthContext} from '../context/AuthContext'

const AppNav = () => {
  const {userInfo, isLoading} = React.useContext(AuthContext)

  if (isLoading)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize:18}}>Loading...</Text>
      </View>
    )

  return (
    <NavigationContainer>
      <StatusBar barStyle='light-content' />
      {userInfo ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default AppNav
