import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
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



const Profile = () => {
  const [editName, setEditName] = useState(false);
  const [editMobile, setEditMobile] = useState(false);
  const [editDob, setEditDob] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const [fullName, setFullName] = useState("Arijit Ghosh");
  const [mobile, setMobile] = useState("7003993095");
  const [dob, setDob] = useState("19-05-1996");
  const [address, setAddress] = useState("25/11, R.B Road, Rabindrapalli, Naihati, 25/11, R.B Road, Rabindrapalli, Naihati");
  const [date, setDate] = useState(new Date());
  const [imageUri, setImageUri] = useState(null);

  const [user, setUser] = useState({
    fullName: "Arijit Ghosh",
    mobile: "7003993095",
    dob: "19-05-1996",
    address: "25/11, R.B Road, Rabindrapalli, Naihati"
  });


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
      console.log("Selected Image:", res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User canceled the picker");
      } else {
        console.error("Error picking image:", err);
      }
    }
  };


  return (
    <View style={styles.profileScreenContainer}>
      <CustomHeader />

      <ScrollView contentContainerStyle={styles.profileInnerContainer}>
        <View style={styles.profileTop}>
          <View style={styles.profilePictureContainer}>
            {imageUri ?
              <Image source={{ uri: imageUri }} style={styles.profilePicture} />
              :
              <Image source={banner} style={styles.profilePicture} />
            }

            <TouchableOpacity style={styles.changePictureBtn} onPress={pickImage}>
              <SimpleLineIcons name={"camera"} size={24} color={"white"} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={imageUri ? styles.uploadPictureBtn : styles.disabledUploadPictureBtn} disabled={imageUri ? false : true} onPress={() => console.log("Pressed")}>
            <Text style={styles.uploadPictureBtnText}>Upload Picture</Text>
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
              <Text>arijitghosh808@gmail.com</Text>
            </View>
          </View>


          <View style={styles.mutableDataBox}>
            <View style={styles.spaceDataRow}>
              <View style={styles.row}>
                <AntDesign name={"user"} size={20} color={"black"} />
                {
                  !editName ?
                    <Text style={styles.userDetailsText}>{user.fullName}</Text>
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
                    <Text style={styles.userDetailsText}>{user.mobile}</Text>
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
                    <Text style={styles.userDetailsText}>{user.dob}</Text>
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


            <View style={styles.spaceDataRow}>
              <View style={styles.row}>
                <FontAwesome name={"building-o"} size={20} color={"black"} />
                {
                  !editAddress ?
                    <Text style={styles.userDetailsText}>{user.address}</Text>
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
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Profile