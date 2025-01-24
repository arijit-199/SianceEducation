import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import styles from '../styles/styles';
import loginBackground from "./../assests/images/login_background2.jpg";


const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    return (
        <View style={styles.loginContainer}>
            <Image source={loginBackground} style={styles.loginBackgroundImage} />

            <View style={styles.loginForm}>
                <View style={{width: "100%"}}>
                    <TextInput placeholder='Enter email' value={email} onChangeText={(val) => setEmail(val)} style={styles.textInput} />

                    <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate("Otp")}>
                        <Text style={styles.loginBtnText}>Login</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.signupBtn}>
                    <Text style={styles.signupBtnText}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginScreen