import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { style } from '../styles/globalStyles'

const InitialLoadingScreen = () => {
  return (
    <View style={styles.loadingScreenContainer}>
      <ActivityIndicator size={'large'} color={style.mainColor}/>
      <Text>Loading..</Text>
    </View>
  )
}

export default InitialLoadingScreen

const styles = StyleSheet.create({
    loadingScreenContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        margin: 0,
        padding: 0,
        alignItems: "center",
        justifyContent: 'center'
    }
})