import {createContext, useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Alert} from 'react-native'

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState(null)

  const handleUserInfo = async userInfo => {
    setUserInfo(userInfo)
    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
    } catch (e) {
      Alert.alert('Something went wrong')
    }
  }

  const getUserInfo = async () => {
    try {
      const value = await AsyncStorage.getItem('userInfo')

      setUserInfo(JSON.parse(value))
    } catch (e) {
      Alert.alert('Something went wrong')
    }
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        handleUserInfo,
        getUserInfo,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
