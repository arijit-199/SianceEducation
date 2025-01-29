import { ActivityIndicator, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import styles from "./../styles/styles";
import DatePicker from 'react-native-date-picker';
import axios from 'axios';



const SignupScreen = ({ navigation }) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [fullname, setFullname] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(new Date());
  const [dob, setDob] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const formatDate = (selectedDate) => {
    const today = new Date(selectedDate);
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const fullDate = `${year}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date}`;
    return fullDate
  }



  const handleSignUp = async () => {
    if (!fullname || !mobile || !email || !dob) return ToastAndroid.show("All the fields are required!!", ToastAndroid.SHORT);

    if (fullname?.length < 6) return ToastAndroid.show("Fullname must be atleast 6-digits long!!", ToastAndroid.SHORT);
    if (mobile?.length < 10) return ToastAndroid.show("Invalid Mobile number!!", ToastAndroid.SHORT);

    const body = {
      mobile: mobile,
      email: email
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(`http://192.168.29.215:8000/api/register/`, body);
      // console.log("response===>", response.data);

      if (response?.status === 200) {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
        return navigation.navigate("SignupOtp", { details: {fullname, email, mobile, dob}})
      }
      else {
        const errMsg = apiErrorHandler(response);
        ToastAndroid.show(errMsg, ToastAndroid.SHORT);
        setError(errMsg)
      }
    } catch (error) {
      console.log(error.response.data.message);
      const errMsg = apiErrorHandler(error);
      ToastAndroid.show(errMsg, ToastAndroid.SHORT);
      setError(errMsg)
    } finally {
      setLoading(false);
    }
  }



  return (
    <View style={styles.signUpScreenContainer}>
      <Text style={styles.pgTitle}>Sign up</Text>

      <View style={styles.signUpScreenInner}>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Fullname</Text>
            <TextInput placeholder='Enter fullname' style={styles.textInput} value={fullname} onChangeText={(val) => setFullname(val)} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Mobile</Text>
            <TextInput placeholder='Enter Mobile' style={styles.textInput} value={mobile} onChangeText={(val) => setMobile(val)} keyboardType='numeric' maxLength={10} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput placeholder='Enter Email' style={styles.textInput} value={email} onChangeText={(val) => setEmail(val)} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Date of Birth</Text>
            <TouchableOpacity onPress={() => setOpenDatePicker(true)} style={{ width: "100%" }}>
              <TextInput
                placeholder='DD-MM-YYYY'
                value={dob}
                style={styles.textInput}
                editable={false} // Disable typing
              />
            </TouchableOpacity>
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
        </View>

        <TouchableOpacity style={styles.solidBtn} onPress={() => handleSignUp()}>
          {loading ?
            <>
              <ActivityIndicator size={'small'} color={"white"} />
              <Text style={styles.solidBtnText}>Please wait...</Text>
            </>
            :
            <Text style={styles.solidBtnText}>Sign up</Text>
          }

        </TouchableOpacity>

        {error &&
          <Text style={{ color: "red", marginTop: 24, width: "75%", textAlign: "center" }}>{error}</Text>
        }

        <Text style={styles.link}>Already have an account? <Text onPress={() => navigation.navigate("Login")} style={[styles.borderBtnText, { fontSize: 14 }]}>Login</Text></Text>
      </View>
    </View>
  )
}

export default SignupScreen