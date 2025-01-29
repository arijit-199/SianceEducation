import React, { useState } from 'react';
import { ActivityIndicator, Image, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import styles from './../styles/styles';
import loginBackground from "./../../assests/images/login_background2.jpg";
import axios from 'axios';
import { BASE_URL } from '../services/apiManager';
import { apiErrorHandler } from '../helper';


const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const handleLogin = async () => {
        // try {
        // setLoading(true)
        // setError(null);

        // const response = await axios.post(`${BASE_URL}/login/`, { email: email });
        // console.log("response===>", response.data);

        // if (response.status === 200) {
        //     ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
        navigation.navigate("Otp", { email: email });
        //     }
        //     else {
        //         const errMsg = apiErrorHandler(response);
        //         setError(errMsg);
        //         ToastAndroid.show(errMsg, ToastAndroid.SHORT);
        //     }

        // } catch (error) {
        //     const errMsg = apiErrorHandler(error);
        //     setError(errMsg)
        //     ToastAndroid.show(errMsg, ToastAndroid.SHORT)
        // } finally {
        //     setLoading(false);
        // }
    }


    return (
        <View style={styles.loginContainer}>
            <Image source={loginBackground} style={styles.loginBackgroundImage} />

            <View style={styles.loginForm}>
                <View style={{ width: "100%" }}>
                    <TextInput placeholder='Enter email' value={email} onChangeText={(val) => setEmail(val)} style={styles.textInput} />

                    <TouchableOpacity style={styles.solidBtn} onPress={() => handleLogin()}>
                        {loading ?
                            <>
                                <ActivityIndicator size={"small"} color={"white"} />
                                <Text style={styles.solidBtnText}>Please wait..</Text>
                            </>
                            :
                            <Text style={styles.solidBtnText}>Login</Text>
                        }
                    </TouchableOpacity>
                </View>

                <Text style={styles.link}>Don't have an account? <Text onPress={() => navigation.navigate("Signup")} style={[styles.borderBtnText, { fontSize: 14 }]}>Sign up</Text></Text>
            </View>
        </View>
    )
}

export default LoginScreen