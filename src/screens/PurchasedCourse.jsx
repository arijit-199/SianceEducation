import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import styles from "./../styles/styles";
import axios from 'axios';
import { BASE_URL } from '../services/apiManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from '../components/CustomHeader';
import { apiErrorHandler } from '../helper';
import { style } from '../styles/globalStyles';
import { useFocusEffect } from '@react-navigation/native';
import CustomToast from '../components/CustomToast';
import Loader from '../components/Loader';



const PurchasedCourse = ({ navigation }) => {
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPaymentLoader, setShowPaymentLoader] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);



    const arr = [1, 2, 3, 4, 5];

    const getPurchasedCourses = async () => {
        try {
            setLoading(true);
            setError(null);

            const refreshToken = JSON.parse(await AsyncStorage.getItem("refreshToken"));
            const response = await axios.get(`${BASE_URL}/order-history/?refresh_token=${refreshToken}`);
            console.log("purchase history response===>", response.data);

            if (response.status === 200) {
                const data = response.data;
                setCourseList(data);
            }
            else {
                const errMsg = apiErrorHandler(response);
                setError(errMsg);
            }
        } catch (error) {
            console.log(error);
            const errMsg = apiErrorHandler(error);
            setError(errMsg);
        } finally {
            setLoading(false);
        }
    }

    const handleRenewCourse = async (course) => {
        setShowPaymentLoader(true);
        let course_ids = [];
        course_ids.push(course.id);

        const refreshToken = JSON.parse(await AsyncStorage.getItem('refreshToken'));
        const currentUser = JSON.parse(await AsyncStorage.getItem("currentUser"));
        console.log(currentUser, refreshToken);

        const body = {
            course_ids: course_ids,
            name: currentUser.fullName,
            mobile: currentUser.mobile,
            email: currentUser.email,
            total_price: course.offer_price
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

            setShowPaymentLoader(false)

            RazorpayCheckout.open(options)
                .then(async data => {
                    const bodyData = {
                        razorpay_payment_id: data.razorpay_payment_id,
                        razorpay_order_id: data.razorpay_order_id,
                        razorpay_signature: data.razorpay_signature,
                    };
                    // console.log('Payment Data:', bodyData);

                    const response = await axios.post(
                        `${BASE_URL}/verify_renew_payment/`, // Correct endpoint
                        bodyData,
                    );
                    console.log("Payment final response=======================>", response);

                    if (response?.status === 200) {
                        const message = response?.data.message;
                        ToastAndroid.show(message, ToastAndroid.SHORT);
                        onRefresh();
                    }
                    else {
                        const errMsg = apiErrorHandler(response);
                        ToastAndroid.show(errMsg, ToastAndroid.SHORT);
                    }

                })
                .catch(error => {
                    console.error('Razorpay error:', error);
                    const errMsg = apiErrorHandler(error);
                    ToastAndroid.show(errMsg, ToastAndroid.SHORT);
                });
        } catch (error) {
            console.error('Payment error:', error.message);
            const errMsg = apiErrorHandler(error);
            ToastAndroid.show(errMsg, ToastAndroid.SHORT);
        } finally {
            setShowPaymentLoader(false);
            onRefresh();
        }
    };



    useFocusEffect(
        useCallback(() => {
            // This will run every time the screen is focused (tab switched)
            // console.log("Screen Reloaded!");
            getPurchasedCourses()

            // return () => {
            //     // Cleanup if needed when leaving the screen
            // };
        }, [])
    );

    return (
        <View style={styles.purchasedCoursesContainer}>
            <CustomHeader />


            {
                loading ?

                    <View>
                        <ActivityIndicator size={24} color={style.mainColor} />
                        <Text>Loading..</Text>
                    </View>

                    :

                    <ScrollView contentContainerStyle={styles.purchasedCoursesInner}>

                        <Text style={[styles.courseHeading, { marginBottom: 20 }]}>Purchased Courses</Text>

                        {courseList.map((course, i) => (

                            <View style={[styles.courseDetailsCardContainer, { width: "80%" }]} key={i}>
                                <View style={styles.cardTop}>
                                    <View style={styles.courseImageContainer}>
                                        <Image source={{ uri: `http://192.168.29.214:8000/${course.image}` }} style={styles.courseImage} />
                                    </View>

                                    <View style={[styles.courseDetails, { marginTop: 0 }]}>
                                        <Text style={{ fontWeight: "400" }}>Course:  <Text style={{ fontWeight: "500" }}>{course.course_name}</Text></Text>
                                        <Text style={{ fontWeight: "400" }}>Price:  <Text style={{ fontWeight: "500" }}>₹ {course.amount_paid}</Text></Text>
                                        <Text style={{ fontWeight: "400" }}>Purcahsed on:  <Text style={{ fontWeight: "500" }}>{course.purchase_date}</Text></Text>
                                        <Text style={{ fontWeight: "400" }}>Expiring on:  <Text style={{ fontWeight: "500" }}>{course.expiration_date}</Text></Text>
                                    </View>
                                </View>

                                <View style={[styles.courseBottom, { gap: 10 }]}>
                                    {course.times !== "2" &&
                                        <TouchableOpacity style={[styles.courseViewBtn, { width: "80%" }]}>
                                            <Text style={styles.courseViewBtnText}>Renew</Text>
                                        </TouchableOpacity>
                                    }
                                    {
                                        course.times !== "0" &&
                                        <TouchableOpacity style={[styles.courseBuyBtn, { width: "80%" }]}>
                                            <Text style={styles.courseBuyBtnText}>Explore</Text>
                                        </TouchableOpacity>
                                    }
                                </View>
                            </View>
                        ))}
                    </ScrollView>
            }

            {showToast && <CustomToast message={successMessage} onPress={() => navigation.navigate("Cart")} />}

            {showPaymentLoader && <Loader modalVisible={showPaymentLoader} closeModal={() => setShowPaymentLoader(false)} />}
        </View>
    )
}

export default PurchasedCourse