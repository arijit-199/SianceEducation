import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Entypo from "react-native-vector-icons/Entypo"
import { style } from '../styles/globalStyles';
import styles from "./../styles/styles";

const OtpScreen = () => {
    const [otpArr, setOtpArr] = useState(["", "", "", "", "", ""]);
    const otpRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
    const [showOtpButton, setShowOtpButton] = useState(false);
    const [timer, setTimer] = useState("01:00");

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
        } else if(timer.split(":")[0] === "00" && timer.split(":")[1] === "00"){
            setShowOtpButton(true)
        }

        return () => clearInterval(interval)
    }, [timer])


    return (
        <View style={styles.otpContainer}>
            <Entypo name="lock-open" color={style.mainColor} size={80} />

            <Text style={styles.boldText}>Verify OTP</Text>
            <Text style={styles.lightText}>Please enter the OTP sent to email. The OTP will be valid only 1 minute.</Text>

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

            <TouchableOpacity style={styles.otpBtn}>
                <Text style={styles.otpBtnText}>Verify</Text>
            </TouchableOpacity>

            {
                !showOtpButton ?
                    <TouchableOpacity style={styles.resendOtpBtn}>
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
