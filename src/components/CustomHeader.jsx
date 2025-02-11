import { BackHandler, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import logo from "./../../assests/images/app_logo.jpg";
import Entypo from "react-native-vector-icons/Entypo"
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign"



const CustomHeader = ({ onPressLogout }) => {
    const [showMenuModal, setShowMenuModal] = useState(false);

    const handleExit = () => {
        BackHandler.exitApp();
    };


    return (
        <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} />
            </View>
            <TouchableOpacity style={styles.menuButton} onPress={() => setShowMenuModal(!showMenuModal)}>
                <Entypo name={"dots-three-vertical"} color={"black"} size={22} />
            </TouchableOpacity>

            {
                showMenuModal &&
                <View style={styles.menuModal}>
                    {/* <View style={styles.menuModalInner}> */}
                    <TouchableOpacity style={styles.listButton} onPress={onPressLogout}>
                        <MaterialIcons name={"logout"} color={"black"} size={22} />
                        <Text>Logout</Text>
                    </TouchableOpacity>
                    {/* </View> */}

                    <TouchableOpacity style={styles.listButton} onPress={() => handleExit()}>
                        <AntDesign name={"close"} color={"black"} size={22} />
                        <Text>Close App</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.listButton}>
                        <MaterialIcons name={"list-alt"} color={"black"} size={22} />
                        <Text>Terms & Conditions</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.listButton}>
                        <MaterialCommunityIcons name={"shield-alert-outline"} color={"black"} size={22} />
                        <Text>Privacy Policy</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

export default CustomHeader

const styles = StyleSheet.create({
    headerContainer: {
        padding: 12,
        width: "100%",
        height: 50,
        backgroundColor: "#eaf7ff",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    logoContainer: {
        width: 90,
        height: 40,
        backgroundColor: "transparent",
        overflow: "hidden"
    },
    logo: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
    },
    menuButton: {
        backgroundColor: "transparent",
        width: 40,
        height: 40,
        borderWidth: 0,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    menuModal: {
        paddingVertical: 16,
        paddingHorizontal: 12,
        backgroundColor: "white",
        borderWidth: 0,
        borderRadius: 12,
        width: "60%",
        height: 175,
        position: "absolute",
        top: 48,
        right: 12,
        zIndex: 1,
        shadowColor: "black",
        shadowOffset: { width: 8, height: -2 },
        elevation: 6,
        shadowRadius: 12,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 16
    },
    listButton: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6
    },
    menuModalInner: {
        paddingTop: 6,
        height: "80%",
        gap: 12
    }
})
