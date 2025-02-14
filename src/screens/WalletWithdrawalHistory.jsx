import { ActivityIndicator, Image, ScrollView, Text, ToastAndroid, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import styles from "./../styles/styles";
import CustomHeader from '../components/CustomHeader';
import axios from 'axios';
import image from "./../../assests/images/login_background2.jpg";
import { BASE_URL } from '../services/apiManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { style } from '../styles/globalStyles';
import { apiErrorHandler } from '../helper';
import { logout } from '../services/services';

const WalletWithdrawalHistory = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [walletHistory, setWalletHistory] = useState([]);



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

  const fetchWalletHistory = async () => {
    try {
      setLoading(true);
      const refreshToken = JSON.parse(await AsyncStorage.getItem("refreshToken"));
      const response = await axios.get(`${BASE_URL}/wallet_withdraw/?refresh_token=${refreshToken}`);
      console.log("History===>", response.data);

      if (response.status === 200) {
        const data = response.data;
        setWalletHistory(data);
      }
    } catch (error) {
      console.log(error);
      const errMsg = apiErrorHandler(error);
      ToastAndroid.show(errMsg, ToastAndroid.SHORT);
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



  useFocusEffect(
    useCallback(() => {
      getUserProfile()
      fetchWalletHistory()
    }, [])
  )


  return (
    <View style={styles.walletWithdarwalHistory}>
      <CustomHeader onPressLogout={() => handleLogout()} />

      {loading ?
        <View style={{ width: "100%", height: "100%", alignItems: 'center', justifyContent: "center" }}>
          <ActivityIndicator size={'large'} color={style.mainColor} />
          <Text>Loading..</Text>
        </View>

        :

        <View style={styles.walletWithdarwalHistoryInner}>
          <View style={styles.walletTop}>
            <Text style={styles.walletHeading}>Wallet</Text>
            <View style={styles.profileImageContainer}>
              <Image source={image} style={styles.profileImage} />
            </View>
            <Text style={[styles.normalText, { fontSize: 18, marginBottom: 4 }]}>Hi, {user?.full_name}</Text>
            <Text style={styles.normalText}>{user?.email}</Text>
            <Text style={styles.normalText}>{user?.mobile}</Text>
          </View>

          <ScrollView style={styles.walletHistoryListContainer}>
            <Text style={{ textAlign: "left", fontSize: 18, marginBottom: 12 }}>Wallet History</Text>

            {walletHistory.length > 0 ?
              walletHistory.map((history, i) => (
                <View style={styles.singleTransactionCard} key={i}>
                  <View>
                    <Text style={{ color: "black", fontSize: 16, fontWeight: "500" }}>{history.title}</Text>
                    <Text style={{ color: "black", fontSize: 14, marginTop: 2 }}>{history.created_at}</Text>
                  </View>
                  <View style={{gap: 6}}>
                    <Text style={{ color: history.type === "debit" ? "black" : "green", fontSize: 18, fontWeight: "400", paddingRight: 12 }}>{history.type === "debit" ? "-" : "+"} {history.amount}</Text>
                  </View>
                </View>
              ))
              :
              <Text>No wallet history</Text>
            }
          </ScrollView>
        </View>
      }
    </View>
  )
}

export default WalletWithdrawalHistory