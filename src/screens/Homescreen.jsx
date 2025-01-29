import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomHeader from '../components/CustomHeader';
import styles from "./../styles/styles";
import AntDesign from "react-native-vector-icons/AntDesign"
import banner from "./../../assests/images/login_background2.jpg";



const Homescreen = ({navigation}) => {
  const arr = [1, 2, 3, 4, 5, 6]
  const [selectedBoard, setSelectedBoard] = useState(null);


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

        <View style={styles.bannerContainer}>
          <Image source={banner} style={styles.banner} />
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
