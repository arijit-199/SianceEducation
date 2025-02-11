import { StyleSheet, Text, View, Modal, ActivityIndicator } from 'react-native'
import React from 'react'
import { style } from '../styles/globalStyles'

const Loader = ({ modalVisible, closeModal}) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalVisible}
      onRequestClose={closeModal} // Handles Android back button
    >
      <View style={styles.loaderOverlay}>
        <View style={styles.loaderContent}>
          <ActivityIndicator size={32} color={style.mainColor} />
          <Text style={styles.loadingText}>Loading..</Text>
        </View>
      </View>
    </Modal>
  )
}

export default Loader

const styles = StyleSheet.create({
  loaderOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  loaderContent: {
    width: 120,
    height: 120,
    padding: 20,
    paddingBottom: 20,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  loadingText: {
    fontSize: 12,
    color: "black"
  }
});