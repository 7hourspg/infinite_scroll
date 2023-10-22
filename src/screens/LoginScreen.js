import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native'
import React, {useState, useContext, useEffect} from 'react'
import {useNavigation} from '@react-navigation/native'

import {AuthContext} from '../context/AuthContext'

import Icon from 'react-native-vector-icons/AntDesign'

import auth from '@react-native-firebase/auth'

import {GoogleSignin} from '@react-native-google-signin/google-signin'

const LoginScreen = () => {
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  })

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const navigation = useNavigation()

  const handleInputChange = (name, value) => {
    setUserInput({
      ...userInput,
      [name]: value,
    })
  }

  const {handleUserInfo} = useContext(AuthContext)

  const signIn = async () => {
    if (!userInput.email || !userInput.password) {
      Alert.alert('Error ❌', 'Please fill in all fields')
      return
    }
    auth()
      .signInWithEmailAndPassword(userInput.email, userInput.password)
      .then(user => {
        handleUserInfo(user)
        Alert.alert('Success ✅', 'Login successfully')
      })
      .catch(error => {
        Alert.alert('Error ❌', 'Invalid email or password')
      })
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '778608957901-67pblp7jp12thfrbgpdluq3h91qrn6gd.apps.googleusercontent.com',
    })
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.headerText}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder='Email'
          onChangeText={text => handleInputChange('email', text)}
        />
        <View style={styles.passwordWrapper}>
          <TextInput
            style={styles.input}
            placeholder='Password'
            onChangeText={text => handleInputChange('password', text)}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.icon_wrapper}>
            <Icon name='eyeo' size={25} color='#000' />
          </TouchableOpacity>
        </View>

        <Text style={{marginBottom: 20}}>Forgot Password?</Text>
        <Text
          onPress={() => {
            // handleLogin()
            signIn()
          }}
          style={styles.button}>
          Login
        </Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Don't have an account?</Text>
          <Text
            style={styles.button}
            onPress={() => {
              navigation.navigate('Register')
            }}>
            Register here
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  headerText: {
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    margin: 10,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  button: {
    width: '80%',
    backgroundColor: '#000',
    padding: 10,
    margin: 10,
    alignItems: 'center',
    borderRadius: 5,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
  },
  icon: {
    marginRight: 15,
    display: 'flex',
    alignItems: 'center',
  },
  icon_wrapper: {
    position: 'absolute',
    right: 15,
    top: 20,
  },
})

export default LoginScreen
