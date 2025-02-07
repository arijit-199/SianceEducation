import { ActivityIndicator, Image, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import CustomHeader from '../components/CustomHeader';
import styles from "./../styles/styles";
import axios from 'axios';
import { BASE_URL } from '../services/apiManager';
import { apiErrorHandler } from '../helper';
import { style } from '../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from "react-native-razorpay";
import { useFocusEffect } from '@react-navigation/native';






const CourseDetailsScreen = ({ navigation, route }) => {
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const { selectedBoard } = route.params;


    const fetchCourses = async () => {
        try {
            setLoading(true);
            setError(null);

            const refreshToken = JSON.parse(await AsyncStorage.getItem("refreshToken"));

            const response = await axios.get(`${BASE_URL}/courses/?class=${selectedBoard.name}&&board=${selectedBoard.board_name}&&refresh_token=${refreshToken}`);
            console.log("course response=============>", response.data);

            if (response.status === 200) {
                const data = response.data;
                setCourseList(data)
            }
        } catch (error) {
            // console.log(error, error.message);
            const errMsg = apiErrorHandler(error);
            setError(errMsg);
        } finally {
            setLoading(false);
        }
    }

    const addToCart = async (selectedCourse) => {
        const refreshToken = JSON.parse(await AsyncStorage.getItem("refreshToken"));
        const body = {
            refresh_token: refreshToken,
            course_id: selectedCourse.id,
        }
        try {
            const response = await axios.post(`${BASE_URL}/cart/add/`, body);
            console.log("add to cart response===>", response.data)

            if (response.status === 201) {
                const message = response?.data?.message;
                ToastAndroid.show(message, ToastAndroid.SHORT);
                navigation.navigate("Cart", { reload: "reload" });
            }
            else {
                const errMsg = apiErrorHandler(response);
                setError(errMsg);
            }
        } catch (error) {
            // console.log(error);
            const errMsg = apiErrorHandler(error);
            ToastAndroid.show(errMsg, ToastAndroid.SHORT);
        } finally {
            setLoading(false);
        }
    }

    
    let razorpayKeyId = 'rzp_test_N00NCbB5uYXmF3';
    let razorpayKeySecret = 'wgSa6OjnRLwQLcby6jhy7EMu';

    const handlePayment = async (course) => {
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
                        `${BASE_URL}/verify_renew_payment/`, // Correct endpoint
                        bodyData,
                    );
                    console.log("successful response=======================>", response);

                    if (response?.status === 200) {
                        const message = response?.data.message;
                        ToastAndroid.show(message, ToastAndroid.SHORT);
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

    useFocusEffect(
            useCallback(() => {
                // This will run every time the screen is focused (tab switched)
                console.log("Screen Reloaded!");
                fetchCourses()
    
                // return () => {
                //     // Cleanup if needed when leaving the screen
                // };
            }, [])
        );

    return (
        <View style={styles.courseDetailsScreenContainer}>
            <CustomHeader />

            {loading ?
                <View style={{ display: "flex", alignItems: 'center', justifyContent: "center" }}>
                    <ActivityIndicator size={'small'} color={style.mainColor} />
                    <Text>Loading..</Text>
                </View>
                :

                <ScrollView contentContainerStyle={styles.courseListContainer} showsVerticalScrollIndicator={false}>
                    <Text style={styles.courseHeading}>Courses</Text>

                    {courseList.length > 0 ?
                        courseList.map((course, i) => (
                            <View style={styles.courseDetailsCardContainer} key={i}>
                                <View style={styles.cardTop}>
                                    <View style={styles.courseImageContainer}>
                                        <Image source={{ uri: course.image }} style={styles.courseImage} />
                                    </View>

                                    <View style={styles.courseDetails}>
                                        <Text style={{ fontWeight: "400" }}>Course:  <Text style={{ fontWeight: "500" }}>{course.name}</Text></Text>
                                        <Text style={{ fontWeight: "400" }}>Price:   <Text style={{ fontWeight: "500" }}>₹ {course.offer_price}</Text> <Text style={{ color: "gray", textDecorationLine: 'line-through' }}>{course.mrp}</Text></Text>
                                        {course.course_purchase === "0" && <Text style={{ color: "red", fontWeight: "500" }}>Subscription ended</Text>}
                                    </View>
                                </View>

                                {
                                    course.course_purchase === null ?

                                        <View style={styles.courseBottom}>
                                            <TouchableOpacity style={styles.courseViewBtn} onPress={() => addToCart(course)}>
                                                <Text style={styles.courseViewBtnText}>Add to Cart</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={styles.courseBuyBtn}>
                                                <Text style={styles.courseBuyBtnText}>Purcahse Course</Text>
                                            </TouchableOpacity>
                                        </View>

                                        : course.course_purchase === "1" ?
                                            <View style={styles.courseBottom}>
                                                <TouchableOpacity style={styles.courseViewBtn} onPress={() => handlePayment(course)}>
                                                    <Text style={styles.courseViewBtnText}>Renew</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity style={styles.courseBuyBtn} onPress={() => navigation.navigate("StudyMaterial", { selectedCourse: course })}>
                                                    <Text style={styles.courseBuyBtnText}>Explore</Text>
                                                </TouchableOpacity>
                                            </View>

                                            : course.course_purchase === "2" ?

                                                <View style={styles.courseBottom}>
                                                    <TouchableOpacity style={styles.disabledCourseViewBtn} disabled={true}>
                                                        <Text style={styles.courseViewBtnText}>Renew</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={styles.courseBuyBtn} onPress={() => navigation.navigate("StudyMaterial", { selectedCourse: course })}>
                                                        <Text style={styles.courseBuyBtnText}>Explore</Text>
                                                    </TouchableOpacity>
                                                </View>

                                                :

                                                <View style={styles.courseBottom}>
                                                    <TouchableOpacity style={styles.courseViewBtn}>
                                                        <Text style={styles.courseViewBtnText}>Renew</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={styles.disabledCourseBuyBtn} disabled={true}>
                                                        <Text style={styles.courseBuyBtnText}>Explore</Text>
                                                    </TouchableOpacity>
                                                </View>
                                }
                            </View>
                        ))
                        :
                        <Text>No courses available</Text>
                    }
                </ScrollView>
            }

        </View>
    )
}

export default CourseDetailsScreen
