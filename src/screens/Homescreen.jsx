import { Image, ScrollView, Text, TextInput, TouchableOpacity, View, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import CustomHeader from '../components/CustomHeader';
import styles from "./../styles/styles";
import AntDesign from "react-native-vector-icons/AntDesign"
import banner from "./../../assests/images/login_background2.jpg";
import Swiper from 'react-native-swiper';
import axios from 'axios';
import { apiErrorHandler } from '../helper';
import { style } from '../styles/globalStyles';
import { BASE_URL } from '../services/apiManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../services/services';



const Homescreen = ({ navigation }) => {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [boardList, setBoardList] = useState([]);
  const [classList, setClassList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadClasses, setLoadClasses] = useState(false);
  const [error, setError] = useState(null);

  const swiperRef = useRef(null);

  const images = [
    banner, banner, banner
  ];


  const fetchBoards = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${BASE_URL}/board-list/`);
      // console.log("response===>", response.data);

      if (response.status === 200) {
        const data = response.data;
        setBoardList(data);
      }

    } catch (error) {
      // console.log(error);
      const errMsg = apiErrorHandler(error);
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  }


  const fetchAllClassList = async () => {
    setSelectedBoard(null)
    try {
      setLoadClasses(true);
      setError(null);

      const response = await axios.get(`${BASE_URL}/class-list/`);
      // console.log("Class List=======>", response.data);

      if (response.status === 200) {
        const data = response.data;
        setClassList(data);
      }
    } catch (error) {
      // console.log(error);
      const errMsg = apiErrorHandler(error);
      setError(errMsg);
    } finally {
      setLoadClasses(false);
    }
  }

  const fetchBoardWiseClasslist = async (selectedBoard) => {
    setSelectedBoard(selectedBoard)
    try {
      setLoadClasses(true);
      setError(null);

      const response = await axios.get(`${BASE_URL}/board_wise_class-list/?board_name=${selectedBoard}`);
      // console.log("board wise class=========>", response);

      if (response.status === 200) {
        setClassList(response.data);
      }
    } catch (error) {
      // console.log(error);
      const errMsg = apiErrorHandler(error);
      setError(errMsg);
    } finally {
      setLoadClasses(false)
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

  useEffect(() => {
    fetchBoards()
    fetchAllClassList()
  }, [])


  return (
    <View style={styles.homeMainContainer}>
      <CustomHeader onPressLogout={() => handleLogout()} />

      {loading ?
        <View style={[styles.row, { marginTop: 24 }]}>
          <ActivityIndicator size={"small"} color={style.mainColor} />
          <Text>Loading..</Text>
        </View>

        :

        <ScrollView contentContainerStyle={styles.homeInnerContainer} showsVerticalScrollIndicator={false}>

          <View style={styles.searchInputContainer}>
            <TextInput placeholder='Search by class' style={styles.searchInput} />
            <TouchableOpacity style={styles.searchButton}>
              <AntDesign name="search1" size={24} color={"black"} />
            </TouchableOpacity>
          </View>

          <View style={styles.swiperContainer}>
            <Swiper
              ref={swiperRef}
              loop={true}
              autoplay={true}
              autoplayTimeout={3}
              showsPagination={true} // Set to true to show pagination
              paginationStyle={styles.paginationStyle} // Add styles for pagination
              dotStyle={styles.dotStyle} // Add styles for dots
              activeDotStyle={styles.activeDotStyle} // Add styles for the active dot
            >
              {images.map((imageUrl, index) => (
                <View key={index} style={styles.slide}>
                  <Image source={imageUrl} style={styles.image} />
                </View>
              ))}
            </Swiper>
          </View>



          <ScrollView contentContainerStyle={styles.boardListContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={selectedBoard === null ? styles.selectedBoardItemContainer : styles.boardItemContainer} onPress={() => fetchAllClassList()}>
              <Text style={selectedBoard === null ? styles.selectedBoardName : styles.boardName}>All Boards</Text>
            </TouchableOpacity>

            {boardList.map((board, i) => (
              <TouchableOpacity style={selectedBoard === board.name ? styles.selectedBoardItemContainer : styles.boardItemContainer} key={i} onPress={() => fetchBoardWiseClasslist(board.name)}>
                <Text style={selectedBoard === board.name ? styles.selectedBoardName : styles.boardName}>{board.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>


          {loadClasses ?
            <View style={style.row}>
              <ActivityIndicator size={'small'} color={style.mainColor} />
              <Text>Loading..</Text>
            </View>
            :
            <View style={styles.classListContainer}>
              {
                classList.map((board, i) => (
                  <TouchableOpacity style={styles.classCardContainer} key={i} activeOpacity={0.2} onPress={() => navigation.navigate("Course Details", { selectedBoard: board })}>
                    <View style={styles.classImageContainer}>
                      <Image source={{ uri: `http://192.168.29.215:8000/${board?.image}` }} style={styles.classImage} />
                    </View>
                    <View style={styles.classDetails}>
                      <Text style={styles.className}>Class {board.name}</Text>
                      <Text style={[styles.boardName, { color: "gray", marginTop: 4 }]}>{board.board_name}</Text>
                    </View>
                  </TouchableOpacity>
                ))
              }
            </View>
          }
        </ScrollView>
      }

    </View>
  )
}

export default Homescreen
