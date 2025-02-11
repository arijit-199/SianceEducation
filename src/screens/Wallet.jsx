import { ActivityIndicator, Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from "./../styles/styles";
import CustomHeader from '../components/CustomHeader';
import image from "./../../assests/images/login_background2.jpg";
import { style } from '../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../services/apiManager';
import axios from 'axios';
import wallet from "./../../assests/images/wallet-money-isolated-600nw-627068804.webp";


const Wallet = () => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);


    const getUserProfile = async() => {
        try {
            setLoading(true);
            const refreshToken = JSON.parse(await AsyncStorage.getItem("refreshToken"));

            const response = await axios.get(`${BASE_URL}/customer/profile/get-details/?refresh_token=${refreshToken}`);
            console.log("Profile response from wallet===>", response.data);

            if(response.status === 200) {
               const data = response.data;
               setUser(data);
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
        <View style={styles.walletScreenContainer}>
            <CustomHeader />

            {loading ?
                <View>
                    <ActivityIndicator size={'small'} color={style.mainColor} />
                    <Text>Loading..</Text>
                </View>

                :

                <View style={styles.walletPageInner}>
                    <View style={styles.walletTop}>
                        <Text style={styles.walletHeading}>Wallet</Text>
                        <View style={styles.profileImageContainer}>
                            <Image source={image} style={styles.profileImage} />
                        </View>
                        <Text style={[styles.normalText, { fontSize: 18, marginBottom: 4 }]}>Hi, {user.full_name}</Text>
                        <Text style={styles.normalText}>{user.email}</Text>
                        <Text style={styles.normalText}>{user.mobile}</Text>
                    </View>

                    <View style={styles.walletBottom}>
                        <View style={{ height: Dimensions.get('window').height - 400, alignItems: 'center', paddingTop: 28 }}>
                            <Image source={wallet} style={styles.walletIcon}/>
                            <Text style={styles.creditHead}>Your Credit Points</Text>
                            <Text style={styles.amount}>{user.cus_wallet}</Text>
                        </View>

                        <TouchableOpacity style={styles.withdrawButton}>
                            <Text style={styles.withdrawButtonText}>Withdraw</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    )
}

export default Wallet