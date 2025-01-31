import { Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import CustomHeader from '../components/CustomHeader';
import styles from "./../styles/styles";
import AntDesign from "react-native-vector-icons/AntDesign"
import banner from "./../../assests/images/login_background2.jpg";
import Swiper from 'react-native-swiper';
import axios from 'axios';



const Homescreen = ({ navigation }) => {
  const arr = [1, 2, 3, 4, 5, 6]
  const [selectedBoard, setSelectedBoard] = useState(null);

  const swiperRef = useRef(null);

  const { width } = Dimensions.get("window");

  const images = [
    banner, banner, banner
  ];


  const fetchBoards = async() => {
    try {
      const response = await axios.get(`http://192.168.29.215:8000/api/board-list/`);
      console.log("response===>", response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchBoards()
  }, [])


  return (
    <View style={styles.homeMainContainer}>
      <CustomHeader />

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
          <TouchableOpacity style={selectedBoard === null ? styles.selectedBoardItemContainer : styles.boardItemContainer} onPress={() => setSelectedBoard(null)}>
            <Text style={selectedBoard === null ? styles.selectedBoardName : styles.boardName}>All Boards</Text>
          </TouchableOpacity>

          {arr.map((item, i) => (
            <TouchableOpacity style={selectedBoard === i ? styles.selectedBoardItemContainer : styles.boardItemContainer} key={i} onPress={() => setSelectedBoard(i)}>
              <Text style={selectedBoard === i ? styles.selectedBoardName : styles.boardName}>CBSE</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>


        <View style={styles.classListContainer}>
          {
            arr.map((item, i) => (
              <TouchableOpacity style={styles.classCardContainer} key={i} activeOpacity={0.2} onPress={() => navigation.navigate("Course Details")}>
                <View style={styles.classImageContainer}>
                  <Image source={banner} style={styles.classImage} />
                </View>
                <View style={styles.classDetails}>
                  <Text style={styles.className}>Class V</Text>
                  <Text style={styles.fees}>INR 500</Text>
                </View>
              </TouchableOpacity>
            ))
          }
        </View>
      </ScrollView>

    </View>
  )
}

export default Homescreen
