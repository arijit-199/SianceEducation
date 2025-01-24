import { Dimensions, StyleSheet } from "react-native";
import { style } from "./globalStyles";

const styles = StyleSheet.create({
    ///////////   LOGIN   ///////////
    loginContainer: {
        margin: 0,
        padding: 0,
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        alignItems: "center",
    },
    loginBackgroundImage: {
        marginTop: 48,
        marginBottom: 56,
        width: "100%",
        height: 200,
        objectFit: "cover"
    },
    loginForm: {
        padding: 16,
        width: "100%",
        height: Dimensions.get('window').height - 318,
        gap: 18,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between"
    },
    textInput: {
        padding: 12,
        height: 48,
        borderWidth: 1.5,
        borderColor: style.mainColor,
        borderRadius: 10,
        width: "100%",
        letterSpacing: 0.8
    },
    loginBtn: {
        marginTop: 24,
        backgroundColor: style.mainColor,
        fontSize: 14,
        color: "white",
        width: "100%",
        height: 48,
        borderRadius: 10,
        borderWidth: 0,
        justifyContent: "center"
    },
    loginBtnText: {
        color: "white",
        textAlign: "center",
        fontWeight: "500",
        fontSize: 15,
        letterSpacing: 0.8
    },
    signupBtn: {
        marginTop: 24,
        backgroundColor: "white",
        fontSize: 14,
        color: "white",
        width: "100%",
        height: 48,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: style.mainColor,
        justifyContent: "center",

    },
    signupBtnText: {
        color: style.mainColor,
        textAlign: "center",
        fontWeight: "500",
        fontSize: 15,
        letterSpacing: 0.8
    },
    forgotLink: {
        textAlign: "right",
        color: style.mainColor,
        fontSize: 12,
        fontWeight: "500",
        marginTop: -12
    },


    /////////////    OTP     //////////////////
    otpContainer: {
        paddingTop: 64,
        padding: 16,
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        alignItems: "center",
    },
    otpInputContainer: {
        marginVertical: 36,
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 2
    },
    otpInput: {
        width: 52,
        height: 52,
        borderWidth: 1.5,
        borderColor: style.mainColor,
        borderRadius: 12,
        textAlign: "center",
        fontSize: 24
    },
    otpBtn: {
        marginTop: 24,
        backgroundColor: style.mainColor,
        fontSize: 14,
        color: "white",
        width: "100%",
        height: 48,
        borderRadius: 10,
        borderWidth: 0,
        justifyContent: "center"
    },
    otpBtnText: {
        color: "white",
        textAlign: "center",
        fontWeight: "500",
        fontSize: 15,
        letterSpacing: 0.8
    },
    resendOtpBtn: {
        marginTop: 48,
        backgroundColor: "white",
        fontSize: 14,
        color: "white",
        width: "100%",
        borderRadius: 10,
        borderWidth: 0,
        borderColor: style.mainColor,
        justifyContent: "center",
    },
    resendOtpBtnText: {
        color: style.mainColor,
        textAlign: "center",
        fontWeight: "500",
        fontSize: 15,
        letterSpacing: 0.8
    },
    boldText: {
        marginTop: 32,
        fontSize: 22,
        fontWeight: "500",
        color: "black"
    },
    lightText: {
        marginTop: 12,
        color: "#bababa",
        textAlign: "center",
        fontSize: 12,
        width: 250
    }
    
})

export default styles