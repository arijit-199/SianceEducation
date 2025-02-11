import { ActivityIndicator, Image, ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import styles from "./../styles/styles";
import CustomHeader from '../components/CustomHeader';
import banner from "./../../assests/images/login_background2.jpg";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import DatePicker from 'react-native-date-picker';
import DocumentPicker from "react-native-document-picker";
import { apiErrorHandler } from '../helper';
import axios from 'axios';
import { BASE_URL } from '../services/apiManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { style } from '../styles/globalStyles';
import { useFocusEffect } from '@react-navigation/native';




const Profile = ({ navigation, route }) => {
  const [editName, setEditName] = useState(false);
  const [editMobile, setEditMobile] = useState(false);
  const [editDob, setEditDob] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [date, setDate] = useState(new Date());
  const [profilePcture, setProfilepicture] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  const formatDate = (selectedDate) => {
    const today = new Date(selectedDate);
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const fullDate = `${year}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date}`;
    return fullDate
  }

  const pickImage = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images], // Allows only image selection
      });

      setImageUri(res[0].uri); // Get the image URI
      setProfilePhoto(res[0].name);
      // console.log("Selected Image:", res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // console.log("User canceled the picker");
      } else {
        console.error("Error picking image:", err);
      }
    }
  };

  const fetchUserDetails = async () => {
    try {
      setLoading(true)
      setError(null);
      const refreshToken = JSON.parse(await AsyncStorage.getItem("refreshToken"));

      const response = await axios.get(`${BASE_URL}/customer/profile/get-details/?refresh_token=${refreshToken}`);
      // console.log("get profile response====>", response.data);

      if (response.status === 200) {
        const { full_name, dob, email, mobile, address, profile_photo } = response.data;
        setFullName(full_name);
        setDob(dob);
        setEmail(email);
        setMobile(mobile);
        setAddress(address);
        setProfilepicture(profile_photo);
      }
      else {
        const errMsg = apiErrorHandler(response);
        setError(errMsg);
      }

    } catch (error) {
      console.log(error);
      const errMsg = apiErrorHandler(error);
      setError(errMsg)
    } finally {
      setLoading(false);
    }
  }

  const handleUpdateProfileDetails = async () => {
    // console.log("profilePhoto===>", profilePhoto);
    try {
      setLoading(true);
      setError(null);

      const refreshTokenString = await AsyncStorage.getItem("refreshToken");
      if (!refreshTokenString) {
        throw new Error("Refresh token not found. Please log in again.");
      }
      const refreshToken = JSON.parse(refreshTokenString);

      const body = {
        email: email,
        full_name: fullName,
        address: address,
        mobile: mobile,
        dob: dob,
      }

      const response = await axios.post(`${BASE_URL}/customer/profile/update-details/?refresh_token=${refreshToken}`, body);
      console.log(response.data)

      if (response.status === 200) {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      } else {
        throw new Error(apiErrorHandler(response));
      }
    } catch (error) {
      console.log("Error:", error.message);
      const errMsg = error.response ? apiErrorHandler(error.response) : error.message;
      setError(errMsg);
      ToastAndroid.show(errMsg, ToastAndroid.SHORT);
    } finally {
      setEditAddress(false);
      setLoading(false);
    }
  };

  const handleUpdateProfilePicture = async () => {
    try {
      // Retrieve the refresh token
      const refreshTokenString = await AsyncStorage.getItem("refreshToken");
      if (!refreshTokenString) {
        throw new Error("Refresh token not found. Please log in again.");
      }
      const refreshToken = JSON.parse(refreshTokenString);

      // Ensure profilePhoto exists
      if (!profilePhoto) {
        throw new Error("Profile photo is required.");
      }

      // Ensure URI is valid
      // if (!profilePhoto.startsWith("file://") && !profilePhoto.startsWith("content://")) {
      //   throw new Error("Invalid profile photo URI.");
      // }

      // Create FormData object
      const formData = new FormData();
      formData.append("profile_photo", {
        uri: imageUri,
        type: "image/jpeg", // Correct MIME type
        name: "profilePicture.jpg",
      });
      // formData.append("refresh_token", refreshToken);

      // Make API call with correct headers
      const response = await axios.post(
        `${BASE_URL}/customer/profile/profile-details/?refresh_token=${refreshToken}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json", // Ensure server accepts JSON responses
          },
          transformRequest: (data, headers) => {
            return data; // Prevent Axios from modifying FormData
          },
        }
      );

      console.log("Upload Success:", response.data);
      ToastAndroid.show("Profile picture updated!", ToastAndroid.SHORT);

    } catch (error) {
      console.log("Error:", error.message);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };



  useFocusEffect(
    useCallback(() => {
      fetchUserDetails()
    }, [])
  )


  return (
    <View style={styles.profileScreenContainer}>
      <CustomHeader />

      {loading ?
        <View style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: 'center' }}>
          <ActivityIndicator size={'large'} color={style.mainColor} />
          <Text style={{ marginTop: 12 }}>Loading..</Text>
        </View>
        :
        <ScrollView contentContainerStyle={styles.profileInnerContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.profileTop}>
            <View style={styles.profilePictureContainer}>
              {imageUri ?
                <Image source={{ uri: imageUri }} style={styles.profilePicture} />
                : profilePcture ?
                  <Image source={{ uri: `http://192.168.29.213:8000/${profilePcture}` }} style={styles.profilePicture} />
                  :
                  <Image source={banner} style={styles.profilePicture} />
              }

              <TouchableOpacity style={styles.changePictureBtn} onPress={pickImage}>
                <SimpleLineIcons name={"camera"} size={24} color={"white"} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.uploadPictureBtn} onPress={() => handleUpdateProfilePicture()}>
              <Text style={styles.uploadPictureBtnText}>Update Profile Picture</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.profileBottom}>
            <View style={styles.immutableDataBox}>
              <View style={styles.row}>
                <AntDesign name={"idcard"} size={20} color={"black"} />
                <Text>12jhs1146.pyhc54</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Referral Id</Text>
                </View>
              </View>

              <View style={styles.row}>
                <Fontisto name={"email"} size={20} color={"black"} />
                <Text>{email}</Text>
              </View>
            </View>


            <View style={styles.mutableDataBox}>
              <View style={styles.spaceDataRow}>
                <View style={styles.row}>
                  <AntDesign name={"user"} size={20} color={"black"} />
                  {
                    !editName ?
                      <Text style={styles.userDetailsText}>{fullName}</Text>
                      :
                      <TextInput placeholder="Enter Fullname" value={fullName} style={styles.editTextInput} onChangeText={(val) => setFullName(val)} />
                  }
                </View>
                {!editName ?
                  <TouchableOpacity onPress={() => setEditName(true)}>
                    <Feather name={"edit"} size={20} color={"black"} />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity onPress={() => setEditName(false)}>
                    <AntDesign name={"closecircleo"} size={20} color={"black"} />
                  </TouchableOpacity>
                }
              </View>


              <View style={styles.spaceDataRow}>
                <View style={styles.row}>
                  <Ionicons name={"call-outline"} size={20} color={"black"} />
                  {
                    !editMobile ?
                      <Text style={styles.userDetailsText}>{mobile}</Text>
                      :
                      <TextInput placeholder="Enter Mobile" value={mobile} style={styles.editTextInput} onChangeText={(val) => setMobile(val)} />
                  }
                </View>

                {!editMobile ?
                  <TouchableOpacity onPress={() => setEditMobile(true)}>
                    <Feather name={"edit"} size={20} color={"black"} />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity onPress={() => setEditMobile(false)}>
                    <AntDesign name={"closecircleo"} size={20} color={"black"} />
                  </TouchableOpacity>
                }
              </View>


              <View style={styles.spaceDataRow}>
                <View style={styles.row}>
                  <AntDesign name={"calendar"} size={20} color={"black"} />
                  {
                    !editDob ?
                      <Text style={styles.userDetailsText}>{dob}</Text>
                      :
                      <TextInput placeholder="Enter dob" value={dob} style={styles.editTextInput} onPress={() => setOpenDatePicker(true)} />
                  }
                </View>
                {!editDob ?
                  <TouchableOpacity onPress={() => setEditDob(true)}>
                    <Feather name={"edit"} size={20} color={"black"} />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity onPress={() => setEditDob(false)}>
                    <AntDesign name={"closecircleo"} size={20} color={"black"} />
                  </TouchableOpacity>
                }
              </View>

              <DatePicker
                modal // Show the date picker in a modal
                mode='date'
                open={openDatePicker}
                date={date} // Pass the Date object here
                onConfirm={(selectedDate) => {
                  setOpenDatePicker(false);
                  setDate(selectedDate); // Update the Date object
                  setDob(formatDate(selectedDate)); // Update the formatted string
                }}
                onCancel={() => setOpenDatePicker(false)} // Close the modal if canceled
              />


              {address || editAddress ?
                <View style={styles.spaceDataRow}>
                  <View style={[styles.row, { gap: 17 }]}>
                    <FontAwesome name={"building-o"} size={20} color={"black"} />
                    {
                      !editAddress ?
                        <Text style={styles.userDetailsText}>{address}</Text>
                        :
                        <TextInput placeholder="Enter address" value={address} style={styles.editTextInput} onChangeText={(val) => setAddress(val)} />
                    }
                  </View>


                  {!editAddress ?
                    <TouchableOpacity onPress={() => setEditAddress(true)}>
                      <Feather name={"edit"} size={20} color={"black"} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => setEditAddress(false)}>
                      <AntDesign name={"closecircleo"} size={20} color={"black"} />
                    </TouchableOpacity>
                  }
                </View>
                :
                <TouchableOpacity style={styles.addAddressBtn} onPress={() => setEditAddress(true)}>
                  <Ionicons name={"add"} size={18} color={style.mainColor} />
                  <Text style={styles.addAddressBtnText}>Add Address</Text>
                </TouchableOpacity>
              }

              <TouchableOpacity style={styles.uploadPictureBtn} onPress={() => handleUpdateProfileDetails()}>
                <Text style={styles.uploadPictureBtnText}>Update Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      }
    </View>
  )
}

export default Profile