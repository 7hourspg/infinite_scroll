import {View, Text, StatusBar} from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'

import AuthStack from './AuthStack'
import AppStack from './AppStack'

import {AuthContext} from '../context/AuthContext'

const AppNav = () => {
  const {userInfo} = React.useContext(AuthContext)

  return (
    <NavigationContainer>
      <StatusBar barStyle='light-content' />
      {userInfo ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default AppNav
