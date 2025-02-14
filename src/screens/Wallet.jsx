import { ActivityIndicator, Dimensions, Image, Modal, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import styles from "./../styles/styles";
import CustomHeader from '../components/CustomHeader';
import image from "./../../assests/images/login_background2.jpg";
import { style } from '../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../services/apiManager';
import axios from 'axios';
import wallet from "./../../assests/images/wallet-money-isolated-600nw-627068804.webp";
import { useFocusEffect } from '@react-navigation/native';
import { logout } from '../services/services';
import { apiErrorHandler } from '../helper';


const Wallet = ({ navigation }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [showWithdrawalModal, setShowWithdrawalModal] = useState(true);
    const [upiId, setUpiId] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [amount, setAmount] = useState("");


    const getUserProfile = async () => {
        try {
            setLoading(true);
            const refreshToken = JSON.parse(await AsyncStorage.getItem("refreshToken"));

            const response = await axios.get(`${BASE_URL}/customer/profile/get-details/?refresh_token=${refreshToken}`);
            console.log("Profile response from wallet===>", response.data);

            if (response.status === 200) {
                const data = response.data;
                setUser(data);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }


    const handleLogout = async () => {
        const response = await logout();

        if (response.status === 200) {
            const message = response.data.message;
            // console.log("logout message========>", message);

            await AsyncStorage.removeItem("accessToken");
            await AsyncStorage.removeItem("refreshToken");
            await AsyncStorage.removeItem("currentUser");
            ToastAndroid.show(message, ToastAndroid.SHORT);
            navigation.navigate("Login");
        } else {
            const errMsg = apiErrorHandler(response);
            ToastAndroid.show(errMsg, ToastAndroid.SHORT);
        }
    }


    const handleRequestWithdraw = async () => {
        if (!upiId || !phoneNumber) return ToastAndroid.show("All fields are required!!", ToastAndroid.SHORT);

        try {
            setLoading(true)

            const body = {
                amount: amount,
                total_points: user?.cus_wallet,
                upi_id: upiId,
                upi_number: phoneNumber
            }

            console.log(body);

            const refreshToken = JSON.parse(await AsyncStorage.getItem("refreshToken"));
            const response = await axios.post(`${BASE_URL}/wallet_withdraw/?refresh_token=${refreshToken}`, body);
            console.log("Withdraw response===>", response.data)

            if(response.status === 201) {
                const message = response.data.message;
                ToastAndroid.show(message, ToastAndroid.SHORT);
                setShowWithdrawalModal(false);
            }

        } catch (error) {
            console.log(error);
            const errMsg = apiErrorHandler(error);
            ToastAndroid.show(errMsg, ToastAndroid.SHORT);
        } finally {
            setLoading(false);
        }
    }


    const handleCloseWithdrawModal = () => {
        setShowWithdrawalModal(false);
        setPhoneNumber("")
        setUpiId("");
    }
 

    useFocusEffect(
        useCallback(() => {
            getUserProfile()
        }, [])
    )


    return (
        <View style={styles.walletScreenContainer}>
            <CustomHeader onPressLogout={() => handleLogout()} />

            {loading ?
                <View style={{ width: "100%", height: "80%", alignItems: "center", justifyContent: "center" }}>
                    <ActivityIndicator size={'large'} color={style.mainColor} />
                    <Text>Loading..</Text>
                </View>

                :

                <View style={styles.walletPageInner}>
                    <View style={styles.walletTop}>
                        <Text style={styles.walletHeading}>Wallet</Text>
                        <View style={styles.profileImageContainer}>
                            <Image source={image} style={styles.profileImage} />
                        </View>
                        <Text style={[styles.normalText, { fontSize: 18, marginBottom: 4 }]}>Hi, {user?.full_name}</Text>
                        <Text style={styles.normalText}>{user?.email}</Text>
                        <Text style={styles.normalText}>{user?.mobile}</Text>
                    </View>

                    <View style={styles.walletBottom}>
                        <View style={{ height: Dimensions.get('window').height - 450, alignItems: 'center' }}>
                            <Image source={wallet} style={styles.walletIcon} />
                            <Text style={styles.creditHead}>Your Credit Points</Text>
                            <Text style={styles.amount}>{user.cus_wallet}</Text>
                        </View>

                        <TouchableOpacity style={[styles.withdrawButton, {opacity: user?.cus_wallet === 0 && 0.5}]} onPress={() => setShowWithdrawalModal(true)} disabled={user?.cus_wallet === 0 ? true : false}>
                            <Text style={styles.withdrawButtonText}>Withdraw</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.borderBtn, { borderWidth: 0, height: 24, marginTop: 8, }]} onPress={() => navigation.navigate("Wallet Withdrawal History")}>
                            <Text style={styles.borderBtnText}>Transaction History</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }

            <Modal
                transparent={true}
                animationType="slide"
                visible={showWithdrawalModal}
            >
                <View style={[styles.successModalOverlay, { backgroundColor: "rgba(0, 0, 0, 0.7)", }]}>
                    <View style={[styles.successModalContent, { display: "flex", flexDirection: 'column', alignItems: "flex-start", justifyContent: "space-between", height: Dimensions.get('window').height * 0.7 }]}>
                        <View style={{ width: "100%" }}>
                            <Text style={{ width: "100%", textAlign: 'center', color: "black", fontWeight: "500" }}>Withdraw Your Point</Text>

                            <Text style={{ color: "black", fontSize: 15, marginTop: 18, marginBottom: 6 }}>Upi Id</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Enter UPI Id'
                                onChangeText={(val) => setUpiId(val)}
                                value={upiId}
                            />

                            <Text style={{ color: "black", fontSize: 15, marginTop: 18, marginBottom: 6}}>Upi/Phone Number</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Enter Phone Number'
                                onChangeText={(val) => setPhoneNumber(val)}
                                value={phoneNumber}
                            />

                            <Text style={{ color: "black", fontSize: 15, marginTop: 18, marginBottom: 6 }}>Points to be withdrawn</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Enter withdraw points'
                                onChangeText={(val) => setAmount(val)}
                                value={amount}
                            />
                        </View>

                        <TouchableOpacity style={styles.solidBtn} onPress={() => handleRequestWithdraw()}>
                            <Text style={styles.solidBtnText}>{loading ? "Sending Request.." : "Send Request"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.borderBtn, { borderWidth: 0, height: 24, marginTop: 14, backgroundColor: "transparent" }]} onPress={() => handleCloseWithdrawModal(false)}>
                            <Text style={styles.borderBtnText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    )
}

export default Wallet