import { ActivityIndicator, Image, Modal, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import styles from "./../styles/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { style } from '../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../services/apiManager';
import axios from 'axios';
import RazorpayCheckout from "react-native-razorpay";
import Loader from '../components/Loader';
import successImage from "./../../assests/images/success_image.gif";
import CustomToast from '../components/CustomToast';




const CheckoutPage = ({ route, navigation }) => {
    const { course } = route.params || null;
    const { state } = route.params || null;

    const [selectedCourse, setSelectedCourse] = useState(route.params.course || null);
    const [courseId, setCourseId] = useState(state === "purchase" ? route.params.course.id : route.params.course.course_id || route.params.course.id );
    const [walletPointsApplied, setWalletPointsApplied] = useState(false);
    const [showPaymentLoader, setShowPaymentLoader] = useState(false);
    // const [showToast, setShowToast] = useState(false);
    // const [successMessage, setSuccessMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [walletPoints, setWalletPoints] = useState(null);
    const [appliedWalletPoints, setAppliedWalletPoints] = useState(null);
    const [totalPrice, setTotalPrice] = useState(course.offer_price || course.amount);
    const [successModal, setSuccessModal] = useState(false);

    console.log(state, course)



    const calculateAndAdjustTotalPoints = () => {
        setLoading(true)
        setWalletPointsApplied(true);
        console.log("points===>", walletPoints, totalPrice);

        if (parseInt(walletPoints) < parseInt(totalPrice)) {
            const total = parseInt(totalPrice) - parseInt(walletPoints);
            setTotalPrice(total);
        }
        else {
            const remainingPoints = (parseInt(walletPoints) - parseInt(totalPrice)) + 1;
            console.log("remaining points===>", remainingPoints);
            setWalletPoints(remainingPoints)
            setAppliedWalletPoints(Math.floor(parseInt(totalPrice) - 1));
            setTotalPrice(1);
        }
        setLoading(false);
    }

    const cancelPoints = () => {
        setLoading(true);
        setWalletPointsApplied(false);
        setTotalPrice(course.offer_price || course.amount);
        getUserProfile()
        setLoading(false);
    }



    let razorpayKeyId = 'rzp_test_N00NCbB5uYXmF3';
    let razorpayKeySecret = 'wgSa6OjnRLwQLcby6jhy7EMu';

    const handlePurchaseCourse = async () => {
        setShowPaymentLoader(true);
        console.log("courseId===>", courseId)
        let course_ids = [];
        course_ids.push(courseId);

        const refreshToken = JSON.parse(await AsyncStorage.getItem('refreshToken'));
        const currentUser = JSON.parse(await AsyncStorage.getItem("currentUser"));
        console.log("appliedWalletPoints====>", appliedWalletPoints);

        const body = {
            course_ids: course_ids,
            name: currentUser.fullName,
            mobile: currentUser.mobile,
            email: currentUser.email,
            wallet_points: walletPointsApplied ? parseInt(walletPoints) < parseInt(totalPrice) ? walletPoints.toString() : appliedWalletPoints.toString() : "0",
            total_price: course.offer_price || course.amount_paid,
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
                        `${BASE_URL}/verify_payment/`, // Correct endpoint
                        bodyData,
                    );
                    console.log("Payment final response=======================>", response);

                    if (response?.status === 200) {
                        const message = response?.data.message;
                        setSuccessModal(true);
                        ToastAndroid.show(message, ToastAndroid.SHORT);
                    }
                    else {
                        const errMsg = apiErrorHandler(response);
                        ToastAndroid.show(errMsg, ToastAndroid.SHORT);
                        setSuccessModal(false);
                    }

                })
                .catch(error => {
                    console.error('Razorpay error:', error);
                    const errMsg = apiErrorHandler(error);
                    setSuccessModal(false);
                    ToastAndroid.show("Something went wrong, please try again!!", ToastAndroid.SHORT);
                });
        } catch (error) {
            console.error('Payment error:', error.message);
            const errMsg = apiErrorHandler(error);
            setSuccessModal(false);
            ToastAndroid.show("Something went wrong, please try again!!", ToastAndroid.SHORT);
        } finally {
            setShowPaymentLoader(false);
            onRefresh();
        }
    };


    const handleRenewCourse = async () => {
        setShowPaymentLoader(true);
        console.log("courseId===>", courseId)
        let course_ids = [];
        course_ids.push(courseId);

        const refreshToken = JSON.parse(await AsyncStorage.getItem('refreshToken'));
        const currentUser = JSON.parse(await AsyncStorage.getItem("currentUser"));
        console.log("appliedWalletPoints====>", appliedWalletPoints);

        const body = {
            course_ids: course_ids,
            name: currentUser.fullName,
            mobile: currentUser.mobile,
            email: currentUser.email,
            wallet_points: walletPointsApplied ? parseInt(walletPoints) < parseInt(totalPrice) ? walletPoints.toString() : appliedWalletPoints.toString() : "0",
            total_price: course.offer_price || course.amount,
        }

        try {
            console.log("body===>", body);

            const response = await axios.post(`${BASE_URL}/create_order/?refresh_token=${refreshToken}`, body);

            console.log("create renew order response===>", response.data);


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
                        setSuccessModal(true);
                        ToastAndroid.show(message, ToastAndroid.SHORT);
                        // navigation.navigate("Tab", { screen: "PurchasedCourse" })
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


    const handleCloseSuccessModal = () => {
        setSuccessModal(false);
        navigation.goBack();
    }




    const getUserProfile = async () => {
        try {
            setLoading(true);
            const refreshToken = JSON.parse(await AsyncStorage.getItem("refreshToken"));

            const response = await axios.get(`${BASE_URL}/customer/profile/get-details/?refresh_token=${refreshToken}`);
            console.log("Profile response from checkout===>", response.data);

            if (response.status === 200) {
                const data = response.data;
                setUser(data);
                setWalletPoints(data.cus_wallet);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUserProfile()
    }, [])



    return (
        <View style={styles.checkoutPageContainer}>
            <View style={styles.checkoutPageHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name={"arrow-back"} size={25} color={"black"} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Order Summary</Text>
            </View>


            {loading ?

                <View style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center", }}>
                    <ActivityIndicator size={'large'} color={style.mainColor} />
                    <Text>Loading..</Text>
                </View>
                :
                <>
                    <View style={styles.checkoutPageInner}>
                        <ScrollView style={styles.checkoutPageScrollView}>
                            <View style={styles.userDetails}>
                                <View style={{ width: "70%", gap: 4 }}>
                                    <Text style={[styles.boldText, { fontSize: 14, marginTop: 0, letterSpacing: 0.4 }]}>{user.full_name}</Text>
                                    <Text style={{ color: 'black', fontSize: 12, }}>{user.email}</Text>
                                    <Text style={{ color: 'black', fontSize: 12, }}>{user.mobile}</Text>
                                </View>

                                {/* <TouchableOpacity style={styles.smBorderBtn} onPress={() => navigation.navigate("Tab", { screen: "Profile", params: {state: 0}} )}>
                                    <AntDesign name={"edit"} size={16} color={style.mainColor} />
                                    <Text style={styles.smBorderBtnText}>Change</Text>
                                </TouchableOpacity> */}
                            </View>

                            <View style={styles.purchaseDetails}>
                                <View style={styles.itemCardContainer}>
                                    <View style={styles.cardTop}>
                                        <View style={styles.courseImageContainer}>
                                            <Image source={{ uri: course.image.includes("http") ? course.image : `http://192.168.29.214:8000/${course.image}` }} style={styles.courseImage} />
                                        </View>

                                        <View style={styles.courseDetails}>
                                            <Text style={{ fontWeight: "400" }}>Course:  <Text style={{ fontWeight: "500" }}>{course.name || course.course_name}</Text></Text>
                                            <Text style={{ fontWeight: "400" }}>Price:   <Text style={{ fontWeight: "500" }}>₹ {course.offer_price || course.amount}</Text> <Text style={{ color: "gray", textDecorationLine: 'line-through' }}>{course.mrp}</Text></Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            {walletPoints > 0 &&
                                <View style={styles.walletPointsContainer}>
                                    <View style={styles.walletBadge}>
                                        <Text style={{ letterSpacing: 0.5, color: "white", fontSize: 13, textAlign: "center", fontWeight: "500" }}>Wallet</Text>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", paddingLeft: 10 }}>
                                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2, width: "58%", paddingLeft: 10 }}>
                                            <AntDesign name={"checkcircle"} size={18} color={"green"} />
                                            <Text style={{ color: style.mainColor, fontSize: 16, paddingLeft: 6 }}>You have <Text style={{ fontSize: 18, fontWeight: "500" }}>{walletPoints}</Text> wallet points</Text>
                                        </View>
                                        {walletPointsApplied &&
                                            <View style={styles.walletBadge}>
                                                <Text style={{ paddingHorizontal: 4, letterSpacing: 0.2, color: "white", fontSize: 11, textAlign: "center", fontWeight: "500" }}>Applied</Text>
                                            </View>
                                        }
                                    </View>
                                    {
                                        !walletPointsApplied ?
                                            <TouchableOpacity style={[styles.borderBtn, { borderRadius: 24, height: 36, marginTop: 12, width: "75%" }]} onPress={() => calculateAndAdjustTotalPoints()}>
                                                <Text style={styles.borderBtnText}>Apply points</Text>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity style={[styles.borderBtn, { borderRadius: 24, height: 36, marginTop: 12, width: "75%" }]} onPress={() => cancelPoints()}>
                                                <Text style={styles.borderBtnText}>Cancel points</Text>
                                            </TouchableOpacity>
                                    }
                                </View>
                            }

                            <View style={styles.billingDetailsSections}>
                                <Text style={{ color: "black", fontSize: 16, marginBottom: 12 }}>Total Summary</Text>
                                <View style={[styles.spaceDataRow, { width: "98%" }]}>
                                    <Text>Mrp</Text>
                                    <Text>₹ {selectedCourse.mrp || selectedCourse.amount}</Text>
                                </View>

                                {
                                    state !== "renew" &&
                                    <View style={[styles.spaceDataRow, { width: "98%" }]}>
                                        <Text>Discount</Text>
                                        <Text>{selectedCourse.discount_percentage}%</Text>
                                    </View>
                                }

                                {
                                    state !== "renew" &&
                                    <View style={[styles.spaceDataRow, { width: "98%" }]}>
                                        <Text>Offer price</Text>
                                        <Text>₹ {selectedCourse.offer_price}</Text>
                                    </View>
                                }

                                {walletPointsApplied &&
                                    <View style={[styles.spaceDataRow, { width: "98%" }]}>
                                        <Text>Wallet points</Text>
                                        <Text style={{color: "green"}}>-  ₹ {parseInt(walletPoints) < parseInt(totalPrice) ? walletPoints : appliedWalletPoints}</Text>
                                    </View>
                                }

                                <View style={[styles.divider, { marginVertical: 12 }]}></View>

                                <View style={[styles.spaceDataRow, { width: "98%" }]}>
                                    <Text style={{fontWeight: "500"}}>Total</Text>
                                    <Text style={{fontWeight: "500"}}>₹ {totalPrice}</Text>
                                </View>
                            </View>

                        </ScrollView>

                        <View style={styles.checkoutPageFooter}>
                            <Text style={[styles.boldText, { marginTop: 0, }]}>₹ {totalPrice}</Text>

                            <TouchableOpacity style={[styles.orderButton, { width: "60%" }]} onPress={() => state === "purchase" ? handlePurchaseCourse() : handleRenewCourse()}>
                                <Text style={styles.orderButtonText}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Modal
                        transparent={true}
                        animationType="slide"
                        visible={successModal}
                    >
                        <View style={styles.successModalOverlay}>
                            <View style={styles.successModalContent}>
                                <Image source={successImage} style={styles.successImage} />
                                <Text style={{ textAlign: 'center', width: "100%", marginBottom: 12, fontWeight: "500", color: "green" }}>Payment successfull</Text>
                                <Text style={{ textAlign: 'center', width: "100%", marginBottom: 22, fontWeight: "500" }}>You have {state === "purchase" ? "purchased" : "renewed"} the course.</Text>

                                <TouchableOpacity style={[styles.borderBtn, { borderWidth: 0, height: 24, backgroundColor: "transparent" }]} onPress={() => navigation.navigate("Tab", { screen: "PurchasedCourse" })}>
                                    <Text style={styles.borderBtnText}>See Purchase History</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.borderBtn, { borderWidth: 0, height: 24, marginTop: 14, backgroundColor: "transparent" }]} onPress={() => handleCloseSuccessModal()}>
                                    <Text style={styles.borderBtnText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    {showPaymentLoader && <Loader modalVisible={showPaymentLoader} closeModal={() => setShowPaymentLoader(false)} />}
                </>
            }
        </View>
    )
}

export default CheckoutPage