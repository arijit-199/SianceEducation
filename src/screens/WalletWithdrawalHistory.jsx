import { Text, View } from 'react-native'
import React, { useEffect } from 'react'
import styles from "./../styles/styles";
import CustomHeader from '../components/CustomHeader';
import axios from 'axios';
import { BASE_URL } from '../services/apiManager';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WalletWithdrawalHistory = () => {

   const fetchWalletHistory = async() => {
    try {
        const refreshToken = JSON.parse(await AsyncStorage.getItem("refreshToken"));
        const response = await axios.get(`${BASE_URL}/wallet_withdraw/?refresh_token=${refreshToken}`);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
   }


   useEffect(() => {
    fetchWalletHistory()
   }, [])


  return (
    <View style={styles.walletWithdarwalHistory}>
        <CustomHeader />
      <Text>WalletWithdrawalHistory</Text>
    </View>
  )
}

export default WalletWithdrawalHistory