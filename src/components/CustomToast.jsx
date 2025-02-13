import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { style } from '../styles/globalStyles'

const CustomToast = ({message, onPress}) => {
    return (
        <View style={styles.toastContainer}>
            <Text style={[styles.toastMessage, {textTransform: "none"}]}>{message}</Text>

            <TouchableOpacity style={styles.toastButton} onPress={onPress}>
                <Text style={styles.toastMessage}>Go to cart</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CustomToast

export const lateralPosition = (Dimensions.get('window').width * 0.08) / 2; 

const styles = StyleSheet.create({
    toastContainer: {
        padding: 12,
        backgroundColor: style.bgColor,
        width: "92%",
        height: 60,
        zIndex: 999,
        position: "absolute",
        bottom: 20,
        left: lateralPosition,
        borderWidth: 0,
        borderRadius: 8,
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "gray",
        shadowOffset: { width: 8, height: -2 },
        elevation: 6,
        shadowRadius: 12,
    },
    toastMessage: {
        color: style.mainColor,
        fontSize: 14,
        fontWeight: "500",
        textTransform: 'uppercase',
        letterSpacing: 0.8
    },
    toastButton: {
        padding: 6,
        borderWidth: 1.5,
        borderRadius: 6,
        borderColor: "white",
        alignItems: "center",
        justifyContent: "center"
    }
});