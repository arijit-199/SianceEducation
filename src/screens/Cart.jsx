import { ActivityIndicator, Image, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import styles from "./../styles/styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { apiErrorHandler } from '../helper';
import axios from 'axios';
import { BASE_URL } from '../services/apiManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { style } from '../styles/globalStyles';
import emptyCart from "./../../assests/images/empty_cart.webp";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import RazorpayCheckout from "react-native-razorpay";





const Cart = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalCartPrice, setTotalCartPrice] = useState(null);
    const [error, setError] = useState(null);


    const fetchCartItems = async () => {
        try {
            setLoading(true);
            setError(null);

            const refreshToken = JSON.parse(await AsyncStorage.getItem("refreshToken"));
            const response = await axios.get(`${BASE_URL}/cart/?refresh_token=${refreshToken}`);
            console.log("get cart response========>", response.data);

            if (response.status === 200) {
                const data = response.data.cart_items;
                const subTotal = response.data.total_cart_price;
                setCartItems(data);
                setTotalCartPrice(subTotal);
            } else {
                const message = apiErrorHandler(response);
                ToastAndroid.show(message, ToastAndroid.SHORT);
            }
        } catch (error) {
            console.log("get cart error===>", error);
            const errMsg = apiErrorHandler(error);
            ToastAndroid.show(errMsg, ToastAndroid.SHORT);
        } finally {
            setLoading(false);
        }
    }


    const removeFromCart = async (id) => {
        console.log(id);
        try {
            setLoading(true)
            setError(null);

            const refreshToken = JSON.parse(await AsyncStorage.getItem("refreshToken"));
            console.log(refreshToken)

            const response = await axios.delete(`${BASE_URL}/cart/remove/?refresh_token=${refreshToken}&&course_id=${id}`);
            // console.log("remove response====>", response)

            if (response.status === 200) {
                const message = response.data.message;
                ToastAndroid.show('Item removed from cart', ToastAndroid.SHORT);
            } else {
                const errMsg = apiErrorHandler(response);
                ToastAndroid.show(errMsg, ToastAndroid.SHORT);
            }

        } catch (error) {
            console.log(error);
            const errMsg = apiErrorHandler(error);
            ToastAndroid.show(errMsg, ToastAndroid.SHORT);
        } finally {
            setLoading(false)
        }
    }


    let razorpayKeyId = 'rzp_test_N00NCbB5uYXmF3';
    let razorpayKeySecret = 'wgSa6OjnRLwQLcby6jhy7EMu';

    const handlePayment = async (id) => {
        let course_ids = [];
        if (id) {
            course_ids.push(id);
        } else {
            for (let i = 0; i < cartItems?.length; i++) {
                course_ids.push(cartItems[i].id);
            }
        }

        const refreshToken = JSON.parse(await AsyncStorage.getItem('refreshToken'));
        const currentUser = JSON.parse(await AsyncStorage.getItem("currentUser"));
        console.log(currentUser, refreshToken);

        const body = {
            course_ids: course_ids,
            name: currentUser.fullName,
            mobile: currentUser.mobile,
            email: currentUser.email,
            total_price: totalCartPrice
        }

        try {
            console.log("body===>", body);

            const response = await axios.post(`${BASE_URL}/create_order/?refresh_token=${refreshToken}`, body);

            console.log("create order response===>", response.data);


            const orderId = response?.data?.order_id;
            const amount = response?.data?.amount;

            const options = {
                currency: 'INR',
                key: razorpayKeyId,
                amount: amount,
                name: 'Course',
                order_id: orderId
            };
            // console.log('options', options);

            RazorpayCheckout.open(options)
                .then(async data => {
                    const bodyData = {
                        razorpay_payment_id: data.razorpay_payment_id,
                        razorpay_order_id: data.razorpay_order_id,
                        razorpay_signature: data.razorpay_signature,
                    };
                    console.log('Payment Data:', bodyData);

                    const response = await axios.post(
                        `${BASE_URL}/verify_payment/`, // Correct endpoint
                        bodyData,
                    );
                    console.log("successful response=======================>", response);

                    if (response?.status === 200) {
                        const message = response?.data.message;
                        ToastAndroid.show(message, ToastAndroid.SHORT);
                        fetchCartItems();
                    }
                    else {
                        const errMsg = apiErrorHandler(response);
                        ToastAndroid.show(errMsg, ToastAndroid.SHORT);
                    }

                })
                .catch(error => {
                    console.error('Razorpay error:', error);
                    // ToastAndroid.show('Payment failed', ToastAndroid.SHORT);
                });
        } catch (error) {
            console.error('Payment error:', error.message);
            ToastAndroid.show('Payment failed', ToastAndroid.SHORT);
        }
    };


    console.log("cartItems===>", cartItems)



    useFocusEffect(
        useCallback(() => {
            // This will run every time the screen is focused (tab switched)

            fetchCartItems()

            // return () => {
            //     // Cleanup if needed when leaving the screen
            // };
        }, [])
    );


    return (
        <View style={styles.cartScreenContainer} key={navigation.isFocused() ? Date.now() : "static-key"}>
            <View style={styles.cartScreenInner}>
                <Text style={styles.cartHeading}>My Cart</Text>
                {loading ?

                    <ActivityIndicator size={"small"} color={style.mainColor} />

                    :
                    <ScrollView contentContainerStyle={styles.cartListContainer}>
                        {cartItems?.length ?

                            cartItems.map((item, i) => (
                                <View style={styles.cartItemContainer} key={i}>
                                    <View style={styles.cartTop}>
                                        <View style={styles.itemImageContainer}>
                                            <Image source={{ uri: `http://192.168.29.213:8000/${item.image}` }} style={styles.itemImage} />
                                        </View>

                                        <View style={styles.itemDetailsContainer}>
                                            <Text style={{ color: "black", fontWeight: "500" }}>{item.name}</Text>
                                            <Text style={{ color: "black", fontWeight: "500", fontSize: 16 }}>₹{item.offer_price}  <Text style={{ textDecorationLine: 'line-through', color: "gray", fontSize: 14 }}>₹{item.mrp}</Text></Text>
                                        </View>
                                    </View>

                                    <View style={styles.cartBottom}>
                                        <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item.id)}>
                                            <MaterialCommunityIcons name={"delete-outline"} size={24} color={"black"} />
                                            <Text style={styles.removeButtonText}>Remove</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.removeButton} onPress={() => handlePayment(item.id)}>
                                            <Ionicons name={"flash-outline"} size={24} color={"black"} />
                                            <Text style={styles.removeButtonText}>Buy this now</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))
                            :
                            <View style={styles.emptyCartImageContainer}>
                                <Image source={emptyCart} style={styles.emptyCartImage} />
                                <Text style={styles.cartEmptyText}>Your cart is empty</Text>
                            </View>
                        }
                    </ScrollView>
                }
            </View>

            {cartItems?.length !== 0 &&
                <View style={styles.cartFooter}>
                    <Text style={styles.totalPrice}>₹{totalCartPrice}</Text>

                    <TouchableOpacity style={styles.orderButton} onPress={() => handlePayment()}>
                        <Text style={styles.orderButtonText}>Place Order</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

export default Cart