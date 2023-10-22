import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native'
import React, {useEffect} from 'react'
import auth from '@react-native-firebase/auth'
import axios from 'axios'

import {AuthContext} from '../context/AuthContext'
const Home = () => {
  const {handleUserInfo} = React.useContext(AuthContext)

  const [data, setData] = React.useState([])
  const [currentPage, setCurrentPage] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)

  const fetchData = () => {
    if (isLoading) return

    setIsLoading(true)

    const url = `https://dummyjson.com/products?offset=${currentPage}
    &limit=10&skip=${currentPage * 10}`

    axios
      .get(url)
      .then(response => {
        setData([...data, ...response.data.products])
        setCurrentPage(currentPage + 1)
        setIsLoading(false)
      })
      .catch(error => {
        Alert.alert('Error', 'Something went wrong')
        setIsLoading(false)
      })
  }

  const renderListItem = ({item}) => (
    <View style={styles.renderlist_container}>
      <Image source={{uri: item.images[0]}} style={styles.renderlist_image} />
      <Text style={styles.renderlist_text}>{item.title}</Text>
    </View>
  )

  const signOut = async () => {
    auth()
      .signOut()
      .then(() => handleUserInfo(null))

    console.log('CLICKED')
  }

  useEffect(() => {
    fetchData()
  }, [])

  // console.log('data', data)
  return (
    <View style={styles.container}>
      <Text style={styles.signout_button} onPress={signOut}>
        Sign Out
      </Text>

      <FlatList
        data={data}
        keyExtractor={item => item.id.toString() + Math.random()}
        renderItem={renderListItem}
        onEndReached={fetchData}
        onEndReachedThreshold={1}
        ListFooterComponent={
          isLoading && (
            <ActivityIndicator
              style={{
                marginBottom: 20,
              }}
              size='large'
              color='black'
            />
          )
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  signout_button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    position: 'absolute',
    bottom: 20,
    right: 20,
    fontSize: 20,
    color: 'white',
    zIndex: 100,
  },
  renderlist_container: {
    padding: 20,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  renderlist_text: {
    fontSize: 20,
    marginLeft: 20,
  },
  renderlist_image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
})

export default Home
