import { Dimensions, StyleSheet } from "react-native";
import { style } from "./globalStyles";
import jestConfig from "../../jest.config";

const premiumModalWidth = Dimensions.get('window').width * 0.90
const premiumModalHeight = Dimensions.get('window').height * 0.4

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
        marginTop: 16,
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
        marginTop: -6,
        backgroundColor: style.mainColor,
        fontSize: 14,
        color: "white",
        width: "100%",
        height: 48,
        borderRadius: 10,
        borderWidth: 0,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
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
    },
    signUpScreenInner: {
        margin: 0,
        padding: 4,
        paddingBottom: 12,
        backgroundColor: "white",
        width: "100%",
        flexGrow: 1,
    },
    pgTitle: {
        paddingHorizontal: 4,
        marginTop: 6,
        marginBottom: 12,
        color: "black",
        fontSize: 24,
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
        marginTop: 24,
        color: "gray",
        fontSize: 14,
        textAlign: "center"
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
        height: Dimensions.get('window').height,
        overflow: "hidden",
        alignItems: "center",
    },
    homeInnerContainer: {
        width: "100%",
        padding: 12,
        paddingVertical: 8,
        backgroundColor: style.bgColor,
        flexGrow: 1,
        paddingBottom: 12,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
    },
    searchInputContainer: {
        marginBottom: 6,
        paddingHorizontal: 10,
        width: "98%",
        height: 48,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 0,
        borderRadius: 8,
        backgroundColor: "white",
        alignSelf: "center"
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
    swiperContainer: {
        width: "100%",
        height: 160,
        borderRadius: 12,
        borderWidth: 0,
        overflow: "hidden",
        backgroundColor: "transparent",
    },
    slide: {
        width: "100%",
        height: 160,
        borderRadius: 12,
        borderWidth: 0,
        overflow: "hidden"
    },
    image: {
        width: "100%",
        height: "100%"
    },
    paginationStyle: {
        height: 10,
    },
    dotStyle: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#dadada',
        margin: 3,
    },
    activeDotStyle: {
        width: 18,
        height: 8,
        borderRadius: 8,
        margin: 3,
    },
    bannerContainer: {
        width: "96%",
        height: 160,
        borderWidth: 0,
        borderRadius: 6,
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
        height: 50,
        backgroundColor: "transparent",
        // marginBottom: 50
    },
    boardItemContainer: {
        padding: 12,
        paddingHorizontal: 40,
        backgroundColor: "white",
        borderWidth: 0,
        borderRadius: 6,
        shadowColor: "gray",
        shadowOffset: { width: 8, height: -2 },
        elevation: 6,
        shadowRadius: 12,
    },
    selectedBoardItemContainer: {
        padding: 12,
        paddingHorizontal: 40,
        backgroundColor: style.mainColor,
        borderWidth: 0,
        borderRadius: 6,
    },
    boardName: {
        color: "black",
        letterSpacing: 0.6,
        fontWeight: "500",
        fontSize: 10,
        textTransform: "uppercase"
    },
    selectedBoardName: {
        color: "white",
        letterSpacing: 0.6,
        fontWeight: "500",
        fontSize: 10,
        textTransform: "uppercase"
    },
    className: {
        fontWeight: "500",
        fontSize: 14,
    },
    classListContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: 12,
        backgroundColor: "transparent",
        paddingBottom: 70
    },
    classCardContainer: {
        padding: 6,
        width: "47%",
        height: 150,
        borderWidth: 0,
        borderRadius: 16,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        shadowColor: "gray",
        shadowOffset: { width: 8, height: -2 },
        elevation: 6,
        shadowRadius: 12,
    },
    classImageContainer: {
        width: "100%",
        height: "60%",
        borderWidth: 0,
        borderRadius: 8,
        backgroundColor: "white",
        overflow: "hidden"

    },
    classImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
    },
    classDetails: {
        marginTop: 4,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
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
        position: "relative"
    },
    courseHeading: {
        paddingTop: 6,
        paddingHorizontal: 12,
        width: "100%",
        color: "black",
        fontSize: 18,
        fontWeight: "400",
        textAlign: 'left'
    },
    courseListContainer: {
        padding: 10,
        paddingBottom: 100,
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16
    },

    courseDetailsCardContainer: {
        padding: 12,
        width: "96%",
        height: 184,
        backgroundColor: "white",
        borderWidth: 0,
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        shadowColor: "gray",
        shadowOffset: { width: 8, height: -2 },
        elevation: 6,
        shadowRadius: 12,
    },
    cardTop: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 12,
        backgroundColor: "white"
    },
    courseImageContainer: {
        width: 100,
        height: 100,
        borderRadius: 18,
        overflow: "hidden"
    },
    courseImage: {
        width: "100%",
        height: "100%"
    },
    courseDetails: {
        marginTop: 6,
        alignItems: "flex-start",
        width: "100%",
        gap: 4,
    },
    courseBuyBtn: {
        width: "48.5%",
        height: 40,
        backgroundColor: style.mainColor,
        borderWidth: 0,
        borderRadius: 12,
        justifyContent: 'center'
    },
    courseBuyBtnText: {
        fontWeight: "500",
        color: "white",
        textAlign: "center",
        textAlignVertical: "center"
    },
    courseViewBtn: {
        width: "49%",
        height: 40,
        backgroundColor: "white",
        borderWidth: 1.5,
        borderRadius: 12,
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



    //////////////      PROFILE     //////////////
    profileScreenContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: style.bgColor,
        alignItems: "center"
    },
    profileInnerContainer: {
        width: "100%",
        alignItems: "center",
        gap: 12,
        flexGrow: 1,
        paddingBottom: 50
    },
    profileTop: {
        width: "100%",
        height: "40%",
        display: "flex",
        flexDirection: "column",
        gap: "4%",
        alignItems: "center",
    },
    profilePictureContainer: {
        marginTop: 14,
        width: "100%",
        height: "60%",
        alignItems: "center",
        position: "relative",
    },
    profilePicture: {
        width: 120,
        height: 120,
        borderWidth: 0,
        borderRadius: 100,
        overflow: "hidden",
    },
    uploadPictureBtn: {
        padding: 10,
        paddingHorizontal: 24,
        backgroundColor: style.mainColor,
        borderWidth: 0,
        borderRadius: 6,
    },
    changePictureBtn: {
        padding: 12,
        width: 48,
        height: 48,
        justifyContent: "center",
        backgroundColor: style.mainColor,
        borderWidth: 0,
        borderRadius: 50,
        position: "absolute",
        top: 60,
        left: 90
    },
    uploadPictureBtnText: {
        color: "white",
        textAlign: 'center',
        fontWeight: "500",
        fontSize: 14,
    },
    addAddressBtn: {
        marginVertical: -8,
        padding: 8,
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "center",
        gap: 6,
        backgroundColor: "white",
        borderColor: style.mainColor,
        borderWidth: 1.5,
        borderRadius: 6,
        width: "42%"
    },
    addAddressBtnText: {
        color: style.mainColor,
        fontSize: 14,
    },
    profileBottom: {
        width: "100%",
        gap: 12,
        alignItems: "center"
    },
    immutableDataBox: {
        padding: 10,
        paddingVertical: 24,
        backgroundColor: "white",
        borderWidth: 0,
        borderRadius: 4,
        width: Dimensions.get('window').width * 0.92,
        gap: 12
    },
    spaceDataRow: {
        width: "100%",
        height: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 12
    },

    mutableDataBox: {
        padding: 10,
        paddingVertical: 24,
        backgroundColor: "white",
        borderWidth: 0,
        borderRadius: 4,
        width: Dimensions.get('window').width * 0.92,
        gap: 24
    },
    editTextInput: {
        padding: 6,
        paddingHorizontal: 14,
        height: 40,
        borderWidth: 1.2,
        borderColor: style.mainColor,
        borderRadius: 10,
        width: "85%",
        letterSpacing: 0.8
    },

    userDetailsText: {
        width: "85%",
        color: "black",
        fontWeight: "500",
    },
    badge: {
        paddingVertical: 2,
        paddingHorizontal: 10,
        backgroundColor: style.mainColor,
        borderRadius: 10
    },
    badgeText: {
        color: "white",
        fontSize: 10,
        fontWeight: "500",
    },
    disabledUploadPictureBtn: {
        padding: 10,
        paddingHorizontal: 24,
        backgroundColor: style.mainColor,
        borderWidth: 0,
        borderRadius: 6,
        opacity: 0.5
    },



    /////////////       CART      ////////////
    cartScreenContainer: {
        width: "100%",
        minHeight: "100%",
        backgroundColor: style.bgColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
    },
    cartScreenInner: {
        width: "100%",
        height: "89.5%",
    },
    cartHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        width: "94%",
    },
    cartHeading: {
        padding: 18,
        paddingHorizontal: 24,
        color: "black",
        fontSize: 18,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: premiumModalWidth,
        height: premiumModalHeight,
        padding: 20,
        paddingBottom: 20,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 10,
    },
    successImage: {
        width: 140,
        height: 140,
        objectFit: "cover",
    },
    successMessage: {
        color: 'green',
        fontSize: 16
    },
    modalText: {
        fontSize: 15,
        marginBottom: 20,
        fontWeight: "500",
        color: style.mainColor
    },
    cartListContainer: {
        gap: 12,
        flexGrow: 1,
        paddingBottom: "10%",
    },
    cartItemContainer: {
        width: "100%",
        borderWidth: 0,
        borderRadius: 6,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "white"
    },
    cartTop: {
        padding: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 24,
    },
    cartBottom: {
        borderWidth: 1,
        borderColor: "#eee",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    itemImageContainer: {
        width: 60,
        height: 60,
        borderWidth: 0,
        borderRadius: 12,
        overflow: "hidden",
    },
    itemImage: {
        width: "100%",
        height: "100%",
        objectFit: "contain"
    },
    itemDetailsContainer: {
        gap: 12
    },
    removeButton: {
        width: "50%",
        padding: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        borderRightWidth: 1,
        borderColor: "#eee"
    },
    removeButtonText: {
        fontWeight: "500",
        color: "black"
    },
    cartFooter: {
        paddingHorizontal: 24,
        paddingVertical: 10,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#eeeeee"
    },
    orderButton: {
        padding: 12,
        width: 140,
        backgroundColor: style.mainColor,
        borderWidth: 0,
        borderRadius: 12,
    },
    orderButtonText: {
        color: "white",
        fontSize: 15,
        fontWeight: "500",
        textAlign: "center",
    },
    totalPrice: {
        color: "black",
        fontWeight: "500",
        fontSize: 18
    },
    disabledCourseViewBtn: {
        width: "48.5%",
        height: 40,
        backgroundColor: "white",
        borderWidth: 1.5,
        borderRadius: 12,
        borderColor: style.mainColor,
        justifyContent: 'center',
        opacity: 0.3
    },
    disabledCourseBuyBtn: {
        width: "48.5%",
        height: 40,
        backgroundColor: style.mainColor,
        borderWidth: 0,
        borderRadius: 12,
        justifyContent: 'center',
        opacity: 0.3
    },

    emptyCartImageContainer: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    emptyCartImage: {
        width: 140,
        height: 140,
        objectFit: "contain",
    },
    cartEmptyText: {
        textAlign: "center",
        color: "gray"
    },



    ///////////       STUDY MATERIAL        /////////////////// 
    studyMaterialContainer: {
        margin: 0,
        padding: 0,
        backgroundColor: style.bgColor,
        width: "100%",
        height: "100%"
    },
    videoListContainer: {
        margin: 0,
        padding: 18,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: 12,
    },
    studyPgTitle: {
        paddingHorizontal: 24,
        paddingTop: 20,
        color: "black",
        fontSize: 20,
        letterSpacing: 0.8
    },
    singleVideoCard: {
        margin: 0,
        padding: 6,
        backgroundColor: "white",
        borderWidth: 0,
        borderRadius: 14,
        shadowColor: "gray",
        shadowOffset: { width: 8, height: -2 },
        elevation: 6,
        shadowRadius: 12,
        width: "48%",
        height: 140,
        overflow: "hidden",
        position: 'relative'
    },
    videoThumbnailContainer: {
        width: "100%",
        height: 80,
        borderWidth: 0,
        borderRadius: 12,
        backgroundColor: "white",
        overflow: "hidden"
    },
    videoThumbnail: {
        width: "100%",
        height: "100%",
        objectFit: "contain"
    },
    iconContainer: {
        padding: 6,
        backgroundColor: "black",
        borderWidth: 0,
        borderRadius: 50,
        width: 36,
        height: 36,
        position: 'absolute',
        top: 30,
        right: "40%",
        justifyContent: "center",
        zIndex: 1,
        opacity: 0.7
    },
    videoTitleContainer: {
        padding: 6,
        backgroundColor: "white",
        width: "100%",
        height: 60,
        textAlign: "left",
    },
    videoTitle: {
        color: "black",
        fontSize: 12,
        fontWeight: "500",
        textAlignVertical: "center"
    },
    videoDuration: {
        paddingHorizontal: 4,
        backgroundColor: "black",
        position: "absolute",
        bottom: 60,
        right: "8%",
        zIndex: 1
    },
    durationText: {
        color: "white",
        fontSize: 10,
        textAlign: "center"
    },



    //////////      VIDEO SCREEN       /////////////
    videoScreenContainer: {
        width: "100%",
        // height: "100%",
        backgroundColor: "white",
        flexGrow: 1
    },
    videoFrameContainer: {
        width: "100%",
        backgroundColor: "gray"
    },
    videoDetailsContainer: {
        padding: 14,
    },
    videoName: {
        color: "black",
        fontSize: 14,
        fontWeight: "500"
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "#dadada"
    },


    //////////////        PURCHASE COURSE      //////////////////////
    purchasedCoursesContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "white"
    },
    purchasedCoursesInner: {
        padding: 12,
        width: '100%',
        flexGrow: 1,
        gap: 10
    },


    /////////////    WALLET    //////////////
    walletScreenContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: style.bgColor,
    },
    walletPageInner: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
    },
    walletTop: {
        paddingTop: 14,
        width: "100%",
        height: 200,
        backgroundColor: style.mainColor,
        borderWidth: 0,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: "center",
    },
    walletHeading: {
        color: "white",
        fontSize: 19,
        fontWeight: "500",
        textAlign: "center",
        letterSpacing: 0.6
    },
    profileImageContainer: {
        marginTop: 12,
        marginBottom: 6,
        width: 60,
        height: 60,
        borderRadius: 50,
        borderWidth: 0,
        overflow: "hidden",
        backgroundColor: "white",
    },
    profileImage: {
        width: "100%",
        height: "100%",
        objectFit: 'contain'
    },
    normalText: {
        color: "white",
        fontSize: 12,
        marginBottom: 2,
        letterSpacing: 0.4,
        fontWeight: "400",
        textAlign: "center"
    },
    walletBottom: {
        padding: 24,
        paddingTop: 18,
        width: "100%",
        height: Dimensions.get('window').height - 300,
        alignItems: 'center',
        justifyContent: "space-between",
    },
    walletIcon: {
        width: 120,
        height: 120,
        objectFit: "contain",
    },
    creditHead: {
        color: '#535353',
        fontSize: 14,
        textAlign: "center",
        letterSpacing: 0.6,
        marginVertical: 12
    },
    amount: {
        color: style.mainColor,
        fontSize: 36,
        fontWeight: '700',
        letterSpacing: 0.4,
        textAlign: "center"
    },
    withdrawButton: {
        width: "100%",
        padding: 12,
        backgroundColor: style.mainColor,
        borderWidth: 0,
        borderRadius: 12,
    },
    withdrawButtonText: {
        color: "white",
        fontSize: 14,
        letterSpacing: 0.4,
        fontWeight: "500",
        textAlign: 'center'
    },



    ///////////     CHECKOUT PAGE     //////////
    checkoutPageContainer: {
        width: '100%',
        height: "100%",
        backgroundColor: "#eee"
    },
    checkoutPageInner: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "93%",
    },
    checkoutPageScrollView: {
        backgroundColor: "#eee",
        flexGrow: 1,
        paddingBottom: 12,
    },
    userDetails: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 18,
        paddingTop: 8,
        paddingBottom: 10,
        width: Dimensions.get('window').width,
        backgroundColor: "white",
    },
    checkoutPageHeader: {
        padding: 12,
        paddingHorizontal: 14,
        width: "100%",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        gap: 14
    },
    headerTitle: {
        color: 'black',
        fontSize: 18,
    },
    smBorderBtn: {
        display: "flex",
        flexDirection: 'row',
        alignItems: "center",
        gap: 6,
        padding: 8,
        borderWidth: 1.5,
        borderColor: style.mainColor,
        borderRadius: 6,
        width: 100,
    },
    smBorderBtnText: {
        color: style.mainColor,
        fontSize: 13,
        fontWeight: "500",
        letterSpacing: 0.6
    },
    purchaseDetails: {
        marginTop: 10,
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        backgroundColor: "transparent"
    },
    itemCardContainer: {
        padding: 12,
        width: "100%",
        backgroundColor: "white",
    },
    walletPointsContainer: {
        marginTop: 10,
        backgroundColor: "white",
        width: "100%",
        padding: 12,
    },
    walletBadge: {
        margin: 8,
        width: 60,
        backgroundColor: style.mainColor,
        borderWidth: 0,
        borderRadius: 12,
    },
    billingDetailsSections: {
        backgroundColor: "white",
        width: "75%",
        padding: 12,
        marginTop: 12,
    },
    checkoutPageFooter: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        width: "100%",
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: style.bgColor
    },




    /////////////////     WALLET WITHDRAWAL HISTORY      //////////////////
    walletHistoryContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
    }
})
export default styles