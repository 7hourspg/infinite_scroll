import {createContext, useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Alert} from 'react-native'

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const handleUserInfo = async userInfo => {
    setUserInfo(userInfo)
    setIsLoading(false)
    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
    } catch (e) {
      Alert.alert('Something went wrong')
    }
  }

  const getUserInfo = async () => {
    try {
      const value = await AsyncStorage.getItem('userInfo')
      setIsLoading(false)

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
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
