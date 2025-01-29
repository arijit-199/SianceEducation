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
        height: 190,
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
    },
    textInput: {
        padding: 12,
        height: 50,
        borderWidth: 1.2,
        borderColor: style.mainColor,
        borderRadius: 10,
        width: "100%",
        letterSpacing: 0.8
    },
    solidBtn: {
        marginTop: 24,
        backgroundColor: style.mainColor,
        fontSize: 14,
        color: "white",
        width: "100%",
        height: 50,
        borderRadius: 10,
        borderWidth: 0,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6
    },
    solidBtnText: {
        color: "white",
        textAlign: "center",
        fontWeight: "500",
        fontSize: 15,
        letterSpacing: 0.8
    },
    borderBtn: {
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
    borderBtnText: {
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
        marginTop: 6,
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
    },



    //////////////    SIGN UP    //////////////////
    signUpScreenContainer: {
        margin: 0,
        padding: 16,
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        alignItems: "center",
    },
    signUpScreenInner: {
        margin: 0,
        padding: 0,
        backgroundColor: "white",
        width: "100%",
        maxHeight: "90%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between"
    },
    pgTitle: {
        marginTop: 12,
        marginBottom: 24,
        color: "black",
        fontSize: 16,
        fontWeight: "500"
    },
    formContainer: {
        marginBottom: 24,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
    },
    inputContainer: {
        width: "100%",
        gap: 6
    },
    inputLabel: {
        fontWeight: "500",
        color: "black",
        letterSpacing: 0.5,
        fontSize: 12
    },
    link: {
        marginTop: 54,
        color: "gray",
        fontSize: 14
    },
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center'
    },




    //////////////       HOME       ///////////////////

    homeMainContainer: {
        backgroundColor: style.bgColor,
        width: "100%",
        minHeight: "100%",
        overflow: "hidden"
    },
    homeInnerContainer: {
        width: "100%",
        padding: 12,
        paddingVertical: 8,
        backgroundColor: "transparent",
        flexGrow: 1,
        paddingBottom: 75,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12
    },
    searchInputContainer: {
        paddingHorizontal: 10,
        width: "96%",
        height: 48,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 0,
        borderRadius: 8,
        backgroundColor: "white"
    },
    searchInput: {
        backgroundColor: "white",
        width: "85%"
    },
    searchButton: {
        padding: 4,
        backgroundColor: "#eee",
        borderWidth: 0,
        borderRadius: 50,
        width: 36,
        height: 36,
        justifyContent: "center"
    },
    bannerContainer: {
        width: "96%",
        height: 160,
        borderWidth: 0,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "white"
    },
    banner: {
        width: "96%",
        height: 160,
        objectFit: "contain"
    },
    boardListContainer: {
        paddingHorizontal: 6,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        height: 60,
        backgroundColor: "transparent"
    },
    boardItemContainer: {
        padding: 14,
        paddingHorizontal: 40,
        backgroundColor: "white",
        borderWidth: 0,
        borderRadius: 6,
    },
    selectedBoardItemContainer: {
        padding: 14,
        paddingHorizontal: 40,
        backgroundColor: style.mainColor,
        borderWidth: 0,
        borderRadius: 6,
    },
    boardName: {
        color: "black",
        letterSpacing: 0.6,
        fontWeight: "500"
    },
    selectedBoardName: {
        color: "white",
        letterSpacing: 0.6,
        fontWeight: "500"
    },
    classListContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: 8
    },
    classCardContainer: {
        padding: 6,
        width: "48%",
        height: 170,
        borderWidth: 0,
        borderRadius: 12,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6
    },
    classImageContainer: {
        width: "100%",
        height: 100,
        borderWidth: 0,
        borderRadius: 8,
        backgroundColor: "white",
        overflow: "hidden"

    },
    classImage: {
        width: "100%",
        height: "100%"
    },
    classDetails: {
        marginTop: 6,
        alignItems: "center",
        justifyContent: "center"
    },
    fees: {
        fontSize: 13,
        fontWeight: "500",
        letterSpacing: 0.4
    },
    courseDetailsScreenContainer: {
        width: "100%",
        minHeight: "100%",
        backgroundColor: style.bgColor,
    },
    courseListContainer: {
        padding: 10,
        paddingBottom: 100,
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10
    },
    courseDetailsCardContainer: {
        padding: 12,
        width: "96%",
        height: 204,
        backgroundColor: "white",
        borderWidth: 0,
        borderRadius: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6
    },
    cardTop: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        backgroundColor: "white"
    },
    courseImageContainer: {
        width: 120,
        height: 120,
        borderRadius: 10,
        overflow: "hidden"
    },
    courseImage: {
        width: "100%",
        height: "100%"
    },
    courseDetails: {
        width: "100%",
        gap: 4,
    },
    courseBuyBtn: {
        width: "48%",
        height: 40,
        backgroundColor: style.mainColor,
        borderWidth: 0,
        borderRadius: 6,
        justifyContent: 'center'
    },
    courseBuyBtnText: {
        fontWeight: "500",
        color: "white",
        textAlign: "center",
        textAlignVertical: "center"
    },
    courseViewBtn: {
        width: "48%",
        height: 40,
        backgroundColor: "white",
        borderWidth: 1.5,
        borderRadius: 6,
        borderColor: style.mainColor,
        justifyContent: 'center'
    },
    courseViewBtnText: {
        fontWeight: "500",
        color: style.mainColor,
        textAlign: "center",
        textAlignVertical: "center"
    },

    courseBottom: {
        marginTop: 12,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%"
    },




})

export default styles