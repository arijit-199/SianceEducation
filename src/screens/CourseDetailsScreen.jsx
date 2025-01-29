import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomHeader from '../components/CustomHeader';
import styles from "./../styles/styles";
import banner from "./../../assests/images/login_background2.jpg";


const CourseDetailsScreen = () => {
    const arr = [1, 2, 3, 4, 5, 6]
    return (
        <View style={styles.courseDetailsScreenContainer}>
            <CustomHeader />

            <ScrollView contentContainerStyle={styles.courseListContainer} showsVerticalScrollIndicator={false}>
                {arr.map((course, i) => (
                    <View style={styles.courseDetailsCardContainer} key={i}>
                        <View style={styles.cardTop}>
                            <View style={styles.courseImageContainer}>
                                <Image source={banner} style={styles.courseImage} />
                            </View>

                            <View style={styles.courseDetails}>
                                <Text style={{ fontWeight: "500" }}>Course: JEE - Advanced</Text>
                                <Text style={{ fontWeight: "500" }}>Duration: 8 months</Text>
                                <Text style={{ fontWeight: "500" }}>Fees: 500</Text>
                            </View>
                        </View>

                        <View style={styles.courseBottom}>
                            <TouchableOpacity style={styles.courseViewBtn}>
                                <Text style={styles.courseViewBtnText}>View Course</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.courseBuyBtn}>
                                <Text style={styles.courseBuyBtnText}>Purcahse Course</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

        </View>
    )
}

export default CourseDetailsScreen
