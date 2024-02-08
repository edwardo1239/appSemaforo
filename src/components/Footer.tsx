import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

export default function Footer() {
  return (
    <View style={styles.footer}>
    <Image
      style={styles.headerImage}
      source={require('../assets/celifrut.png')}
    />
  </View>
  )
}


const styles = StyleSheet.create({

    footer: {
        backgroundColor: '#7D9F3A',
        marginTop: 50,

      },
      headerImage: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
        alignSelf: 'center',
      },
})