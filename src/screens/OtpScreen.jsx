import { ActivityIndicator, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Entypo from "react-native-vector-icons/Entypo"
import { style } from './../styles/globalStyles';
import styles from "./../styles/styles"
import { apiErrorHandler, concatString } from '../helper';
import { BASE_URL } from '../services/apiManager';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtpScreen = ({ navigation, route }) => {
    const [otpArr, setOtpArr] = useState(["", "", "", "", "", ""]);
    const [otp, setOtp] = useState("");
    const otpRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
    const [showOtpButton, setShowOtpButton] = useState(false);
    const [timer, setTimer] = useState("01:00");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const { email } = route.params;
    // console.log(email)

    const handleChangeOtp = (value, index) => {
        const prevOtp = [...otpArr]
        prevOtp[index] = value;
        setOtpArr(prevOtp)

        if (value && value.length === 1 && index < 5) {
            otpRefs[index + 1].current.focus();
        }
    }

    const onPressBackspace = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && index !== 0 && otpArr[index] === "") {
            otpRefs[index - 1].current.focus();
        }
    }


    const handleVerifyOtp = async () => {
        if (otp?.length < 6) return ToastAndroid.show("OTP must be 6 digits long!!", ToastAndroid.SHORT)

        const body = {
            email: email,
            otp: otp,
        }
        console.log(body)

        try {
            setLoading(true);
            setError(null);

            const response = await axios.post(`${BASE_URL}/login/verify-otp/`, body);
            console.log(response.data);

            if (response.status === 200) {
                const accessToken = response.data.access;
                const refreshToken = response.data.refresh;
                const currentUser = {
                    fullName: response.data.full_name,
                    dob: response.data.dob,
                    email: response.data.email,
                    mobile: response.data.mobile,
                }

                await AsyncStorage.setItem("accessToken", JSON.stringify(accessToken))
                await AsyncStorage.setItem("refreshToken", JSON.stringify(refreshToken))
                await AsyncStorage.setItem("currentUser", JSON.stringify(currentUser))

                ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
            }
            else {
                const errMsg = apiErrorHandler(response);
                setError(errMsg);
                ToastAndroid.show(errMsg, ToastAndroid.SHORT);
            }
        } catch (error) {
            console.log(error, error.message);
            const errMsg = apiErrorHandler(error);
            setError(errMsg);
            ToastAndroid.show(errMsg, ToastAndroid.SHORT);
        } finally {
            setLoading(false);
        }

        navigation.navigate("Tab");
    }


    useEffect(() => {
        let timeout
        timeout = setTimeout(() => {
            setTimer("00:59");
        }, 1000)

        return () => clearTimeout(timeout)
    }, [])


    useEffect(() => {
        let interval

        let seconds = parseInt(timer.split(":")[1]);
        if (timer.split(":")[1] !== "00") {
            interval = setInterval(() => {
                seconds--
                setTimer(`00:${seconds < 10 ? `0${seconds.toString()}` : seconds.toString()}`)
            }, 1000)
        } else if (timer.split(":")[0] === "00" && timer.split(":")[1] === "00") {
            setShowOtpButton(true)
        }

        return () => clearInterval(interval)
    }, [timer])


    useEffect(() => {
        setOtp(concatString(otpArr))
    }, [otpArr])


    return (
        <View style={styles.otpContainer}>
            <Entypo name="lock-open" color={style.mainColor} size={80} />

            <Text style={styles.boldText}>Verify OTP</Text>
            <Text style={styles.lightText}>Please enter the OTP sent to email {email}. The OTP will be valid only 1 minute.</Text>

            <View style={styles.otpInputContainer}>
                {otpArr.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={otpRefs[index]}
                        style={styles.otpInput}
                        onChangeText={(val) => handleChangeOtp(val, index)}
                        maxLength={1}
                        keyboardType='number-pad'
                        onKeyPress={(e) => onPressBackspace(e, index)}
                    />
                ))}
            </View>

            <TouchableOpacity style={styles.otpBtn} onPress={() => handleVerifyOtp()}>
                {loading ?
                    <>
                        <ActivityIndicator size={"small"} color={"white"} />
                        <Text style={styles.otpBtnText}>Please wait..</Text>
                    </>
                    :
                    <Text style={styles.otpBtnText}>Verify</Text>
                }
            </TouchableOpacity>

            {
                !showOtpButton ?
                    <TouchableOpacity style={styles.resendOtpBtn} onPress={() => ToastAndroid.show(`Otp can be resent after ${timer} mins`, ToastAndroid.SHORT)}>
                        <Text style={[styles.resendOtpBtnText, { color: "gray", letterSpacing: 0, fontWeight: "400", fontSize: 13 }]}>Resend OTP in {timer}</Text>
                    </TouchableOpacity>

                    :

                    <TouchableOpacity style={styles.resendOtpBtn}>
                        <Text style={styles.resendOtpBtnText}>Resend Otp</Text>
                    </TouchableOpacity>
            }
        </View>
    )
}

export default OtpScreen
