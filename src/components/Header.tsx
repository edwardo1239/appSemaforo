import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Header() {
  return (
    <View  style={styles.container}>
        <Image
        style={styles.headerImage}
        source={require('../assets/celifrut.png')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    width:200,
    marginTop:40,
    marginLeft:'25%',
    borderRadius:20,
    elevation:50
  },
    header: {
        color: '#7D9F3A',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 11,
        textAlign: 'center',
      },
      headerImage: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
        alignSelf: 'center',
   
        
      }
      
})