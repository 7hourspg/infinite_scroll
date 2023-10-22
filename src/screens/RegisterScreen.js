import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native'
import React, {useState, useEffect} from 'react'
import {useNavigation} from '@react-navigation/native'

import Icon from 'react-native-vector-icons/AntDesign'

import auth from '@react-native-firebase/auth'

import {GoogleSignin} from '@react-native-google-signin/google-signin'

const RegisterScreen = () => {
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

  const handleCreateAccount = () => {
    if (!userInput.email || !userInput.password) {
      Alert.alert('Error ❌', 'Please fill in all fields')
      return
    }
    auth()
      .createUserWithEmailAndPassword(userInput.email, userInput.password)
      .then(() => {
        Alert.alert('Success ✅', 'Account created successfully')
        navigation.navigate('Login')
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Error ❌', 'That email address is already in use!')
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Error ❌', 'That email address is invalid!')
        }
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
        <Text style={styles.headerText}>Register</Text>
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
            handleCreateAccount()
          }}
          style={styles.button}>
          Create Account
        </Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Already have an account?</Text>
          <Text
            style={styles.button}
            onPress={() => {
              navigation.navigate('Login')
            }}>
            Login here
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

export default RegisterScreen
