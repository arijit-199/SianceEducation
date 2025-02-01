import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '../components/CustomHeader';
import styles from "./../styles/styles";
import banner from "./../../assests/images/login_background2.jpg";
import axios from 'axios';
import { BASE_URL } from '../services/apiManager';
import { apiErrorHandler } from '../helper';
import { style } from '../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CourseDetailsScreen = ({ navigation, route }) => {
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const arr = [1, 2, 3, 4, 5, 6]

    const { selectedBoard } = route.params;
    console.log("selectedBoard===>", selectedBoard);


    const fetchCourses = async () => {
        try {
            setLoading(true);
            setError(null);

            const refreshToken = JSON.parse(await AsyncStorage.getItem("refreshToken"));

            const response = await axios.get(`${BASE_URL}/courses/?class=${selectedBoard.name}&&board=${selectedBoard.board_name}&&refresh_token=${refreshToken}`);
            console.log("course response=============>", response.data);

            if (response.status === 200) {
                const data = response.data;
                setCourseList(data)
            }
        } catch (error) {
            console.log(error);
            const errMsg = apiErrorHandler(error);
            setError(errMsg);
        } finally {
            setLoading(false);
        }
    }

    const addToCart = async (selectedCourse) => {
        const refreshToken = JSON.parse(await AsyncStorage.getItem("refreshToken"));
        const body = {
            refresh_token: refreshToken,
            course_id: selectedCourse.id,
        }
        try {
            const response = await axios.post(`${BASE_URL}/cart/add/`, body);
            console.log("add to cart response===>", response)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchCourses()
    }, [])

    return (
        <View style={styles.courseDetailsScreenContainer}>
            <CustomHeader />

            {loading ?
                <View style={{ display: "flex", alignItems: 'center', justifyContent: "center" }}>
                    <ActivityIndicator size={'small'} color={style.mainColor} />
                    <Text>Loading..</Text>
                </View>
                :

                <ScrollView contentContainerStyle={styles.courseListContainer} showsVerticalScrollIndicator={false}>
                    <Text style={styles.courseHeading}>Courses</Text>

                    {courseList.length > 0 ?
                        courseList.map((course, i) => (
                            <View style={styles.courseDetailsCardContainer} key={i}>
                                <View style={styles.cardTop}>
                                    <View style={styles.courseImageContainer}>
                                        <Image source={{ uri: course.image }} style={styles.courseImage} />
                                    </View>

                                    <View style={styles.courseDetails}>
                                        <Text style={{ fontWeight: "400" }}>Course:  <Text style={{ fontWeight: "500" }}>{course.name}</Text></Text>
                                        <Text style={{ fontWeight: "400" }}>Fees:   <Text style={{ fontWeight: "500" }}>₹ {course.offer_price}</Text> <Text style={{ color: "gray", textDecorationLine: 'line-through' }}>{course.mrp}</Text></Text>
                                        {course.course_purchase === "0" && <Text style={{ color: "red", fontWeight: "500" }}>Subscription ended</Text>}
                                    </View>
                                </View>

                                {
                                    course.course_purchase === null ?
                                        <View style={styles.courseBottom}>
                                            <TouchableOpacity style={styles.courseViewBtn} onPress={() => addToCart(course)}>
                                                <Text style={styles.courseViewBtnText}>Add to Cart</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={styles.courseBuyBtn}>
                                                <Text style={styles.courseBuyBtnText}>Purcahse Course</Text>
                                            </TouchableOpacity>
                                        </View>
                                        : course.course_purchase === "1" ?
                                            <View style={styles.courseBottom}>
                                                <TouchableOpacity style={styles.courseViewBtn}>
                                                    <Text style={styles.courseViewBtnText}>Renew</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity style={styles.courseBuyBtn}>
                                                    <Text style={styles.courseBuyBtnText}>Explore</Text>
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            course.course_purchase === "2" ?
                                                <View style={styles.courseBottom}>
                                                    <TouchableOpacity style={styles.disabledCourseViewBtn} disabled={true}>
                                                        <Text style={styles.courseViewBtnText}>Renew</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={styles.courseBuyBtn}>
                                                        <Text style={styles.courseBuyBtnText}>Explore</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                :
                                                <View style={styles.courseBottom}>
                                                    <TouchableOpacity style={styles.courseViewBtn}>
                                                        <Text style={styles.courseViewBtnText}>Renew</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={styles.disabledCourseBuyBtn} disabled={true}>
                                                        <Text style={styles.courseBuyBtnText}>Explore</Text>
                                                    </TouchableOpacity>
                                                </View>
                                }
                            </View>
                        ))
                        :
                        <Text>No courses available</Text>
                    }
                </ScrollView>
            }

        </View>
    )
}

export default CourseDetailsScreen
