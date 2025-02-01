import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import styles from "./../styles/styles";
import banner from "./../../assests/images/login_background2.jpg";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";




const Cart = () => {
    const arr = [1, 2, 3, 4, 5]

    return (
        <View style={styles.cartScreenContainer}>

            <View style={styles.cartScreenInner}>
                <Text style={styles.cartHeading}>My Cart</Text>

                    <ScrollView contentContainerStyle={styles.cartListContainer}>
                        {arr.map((item, i) => (
                            <View style={styles.cartItemContainer} key={i}>
                                <View style={styles.cartTop}>
                                    <View style={styles.itemImageContainer}>
                                        <Image source={banner} style={styles.itemImage} />
                                    </View>

                                    <View style={styles.itemDetailsContainer}>
                                        <Text>Course Item 1</Text>
                                        <Text>Duration: 1 month</Text>
                                        <Text>₹500</Text>
                                    </View>
                                </View>

                                <View style={styles.cartBottom}>
                                    <TouchableOpacity style={styles.removeButton}>
                                        <MaterialCommunityIcons name={"delete-outline"} size={24} color={"black"} />
                                        <Text style={styles.removeButtonText}>Remove</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.removeButton}>
                                        <Ionicons name={"flash-outline"} size={24} color={"black"} />
                                        <Text style={styles.removeButtonText}>Buy this now</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
            </View>

            <View style={styles.cartFooter}>
                <Text style={styles.totalPrice}>₹500</Text>

                <TouchableOpacity style={styles.orderButton}>
                    <Text style={styles.orderButtonText}>Place Order</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Cart