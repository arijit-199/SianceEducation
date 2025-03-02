import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar, ToastAndroid, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Octicons from "react-native-vector-icons/Octicons";




//////////       SCREENS       //////////////
import LoginScreen from "./src/screens/LoginScreen";
import OtpScreen from "./src/screens/OtpScreen";
import SignupScreen from "./src/screens/SignupScreen";
import SignupOtp from "./src/screens/SignupOtp";
import Homescreen from "./src/screens/Homescreen";
import { style } from "./src/styles/globalStyles";
import CourseDetailsScreen from "./src/screens/CourseDetailsScreen";
import Profile from "./src/screens/Profile";
import Cart from "./src/screens/Cart";
import StudyMaterialScreen from "./src/screens/StudyMaterialScreen";
import VideoScreen from "./src/screens/VideoScreen";
import { BASE_URL } from "./src/services/apiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import InitialLoadingScreen from "./src/screens/InitialLoadingScreen";
import PurchasedCourse from "./src/screens/PurchasedCourse";
import Wallet from "./src/screens/Wallet";
import CheckoutPage from "./src/screens/CheckoutPage";
import WalletWithdrawalHistory from "./src/screens/WalletWithdrawalHistory";
import CartCheckoutPage from "./src/screens/CartCheckoutPage";



function App() {
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const options = { headerShown: false };



  function HomeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name={"Home"} component={Homescreen} options={options} />
        <Stack.Screen name={"Course Details"} component={CourseDetailsScreen} options={options} />
        <Stack.Screen name={"StudyMaterial"} component={StudyMaterialScreen} options={options} />
        <Stack.Screen name="Video" component={VideoScreen} options={options} />
      </Stack.Navigator>
    )
  }

  function WalletStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Wallet Main" component={Wallet} options={options} />
        <Stack.Screen name="Wallet Withdrawal History" component={WalletWithdrawalHistory} options={options} />
      </Stack.Navigator>
    )
  }



  function TabScreen() {
    return (
      <Tab.Navigator initialRouteName="Homestack">
        <Tab.Screen
          name={"Profile"}
          component={Profile}
          options={{
            headerShown: false,
            tabBarLabel: "Profile",
            // tabBarItemStyle: {margin},
            tabBarIconStyle: { color: "gray" },
            tabBarActiveTintColor: style.mainColor,
            tabBarInactiveTintColor: "gray",
            tabBarIcon: ({ color, focused }) => (
              <EvilIcons name="user" color={focused ? style.mainColor : "gray"} size={35} />
            )
          }} />

        <Tab.Screen
          name={"PurchasedCourse"}
          component={PurchasedCourse}
          options={{
            headerShown: false,
            tabBarLabel: "Purchases",
            // tabBarItemStyle: {margin},
            tabBarIconStyle: { color: "gray" },
            tabBarActiveTintColor: style.mainColor,
            tabBarInactiveTintColor: "gray",
            tabBarIcon: ({ color, focused }) => (
              <Octicons name="checklist" color={focused ? style.mainColor : "gray"} size={22} />
            )
          }} />

        <Tab.Screen
          name={"Homestack"}
          component={HomeStack}
          options={{
            headerShown: false,
            tabBarLabel: "Home",
            tabBarIconStyle: { color: "gray" },
            tabBarActiveTintColor: style.mainColor,
            // tabBarStyle: { height: 48, },
            tabBarInactiveTintColor: "gray",
            tabBarIcon: ({ color, focused }) => (
              <AntDesign name="home" color={focused ? style.mainColor : "gray"} size={24} />
            )
          }} />

        <Tab.Screen
          name={"Wallet"}
          component={WalletStack}
          options={{
            headerShown: false,
            tabBarLabel: "Wallet",
            // tabBarItemStyle: {margin},
            tabBarIconStyle: { color: "gray" },
            tabBarActiveTintColor: style.mainColor,
            tabBarInactiveTintColor: "gray",
            tabBarIcon: ({ color, focused }) => (
              <AntDesign name="wallet" color={focused ? style.mainColor : "gray"} size={24} />
            )
          }} />

        <Tab.Screen
          name={"Cart"}
          component={Cart}
          options={{
            headerShown: false,
            tabBarLabel: "Cart",
            // tabBarItemStyle: {margin},
            tabBarIconStyle: { color: "gray" },
            tabBarActiveTintColor: style.mainColor,
            tabBarInactiveTintColor: "gray",
            tabBarIcon: ({ color, focused }) => (
              <AntDesign name="shoppingcart" color={focused ? style.mainColor : "gray"} size={28} />
            )
          }} />
      </Tab.Navigator>
    )
  }




  const checkUserLoginStatus = async () => {
    setLoading(true)
    const accessToken = await AsyncStorage.getItem("accessToken");
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    const currentUser = await AsyncStorage.getItem("currentUser");
    // console.log(accessToken, refreshToken, currentUser);

    if (accessToken && refreshToken && currentUser) {
      setUserLoggedIn(true)
      setLoading(false)
    }
    else {
      setUserLoggedIn(false)
      setLoading(false)
    }
  }


  useEffect(() => {
    checkUserLoginStatus()
  }, [])


  if (loading) {
    return <InitialLoadingScreen />
  }





  return (
    <NavigationContainer>
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />

      <Stack.Navigator initialRouteName={isUserLoggedIn ? "Tab" : "Login"}>
        <Stack.Screen name="Login" component={LoginScreen} options={options} />
        <Stack.Screen name="Otp" component={OtpScreen} options={options} />
        <Stack.Screen name="Signup" component={SignupScreen} options={options} />
        <Stack.Screen name="SignupOtp" component={SignupOtp} options={options} />
        <Stack.Screen name="Tab" component={TabScreen} options={options} />
        <Stack.Screen name="Checkout" component={CheckoutPage} options={options} />
        <Stack.Screen name="CartCheckoutPage" component={CartCheckoutPage} options={options} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App