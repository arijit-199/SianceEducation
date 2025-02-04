import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import styles from "./../styles/styles";
import CustomHeader from '../components/CustomHeader';
import Entypo from "react-native-vector-icons/Entypo";
import image from "./../../assests/images/login_background.jpg";
import axios from 'axios';
import { BASE_URL } from '../services/apiManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiErrorHandler } from '../helper';
import { style } from '../styles/globalStyles';



const StudyMaterialScreen = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [videoList, setVideoList] = useState([]);
  const [error, setError] = useState(null);

  const arr = [1, 2, 3, 4, 5]

  const { selectedCourse } = route.params;

  console.log("selectedCourse====>", selectedCourse);


  const fetchVideoList = async () => {
    try {
      setLoading(true);
      setError(null);

      const refreshToken = JSON.parse(await AsyncStorage.getItem("refreshToken"));
      const response = await axios.get(`${BASE_URL}/video-list/?course_id=${selectedCourse.id}&&refresh_token=${refreshToken}`);

      console.log("video list response==========>", response.data)

      if (response.status === 200) {
        const data = response.data;
        setVideoList(data);
      } else {
        const errMsg = apiErrorHandler(response);
        setError(errMsg);
      }
    } catch (error) {
      console.log(error);
      const errMsg = apiErrorHandler(error);
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchVideoList()
  }, [])
  return (
    <View style={styles.studyMaterialContainer}>
      <CustomHeader />

      <Text style={styles.studyPgTitle}>Videos</Text>

      {
        loading ?
          <View style={[styles.row, {alignItems: "center", width: "100%", justifyContent: "100%"}]}>
            <ActivityIndicator size={"small"} color={style.mainColor} />
            <Text>Loading..</Text>
          </View>
          :
          <ScrollView contentContainerStyle={styles.videoListContainer}>
            {            
              videoList.map((video, i) => (
                <TouchableOpacity style={styles.singleVideoCard} key={i} onPress={() => navigation.navigate("Video", {video: video})}>
                  <View style={styles.iconContainer}>
                    <Entypo name={"controller-play"} size={24} color={"white"} />
                  </View>
                  <View style={styles.videoDuration}>
                    <Text style={styles.durationText}>{video.duration}</Text>
                  </View>
                  <View style={styles.videoThumbnailContainer}>
                    <Image source={{uri: `http://192.168.29.215:8000/${video.thumbnail}`}} style={styles.videoThumbnail} />
                  </View>
                  <View style={styles.videoTitleContainer}>
                    <Text style={styles.videoTitle}>{video.description}</Text>
                  </View>
                </TouchableOpacity>
              ))
            }
          </ScrollView>
      }
    </View>
  )
}

export default StudyMaterialScreen