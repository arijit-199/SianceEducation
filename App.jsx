import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import EvilIcons from "react-native-vector-icons/EvilIcons";



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



function App() {

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



  function TabScreen() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name={"Homestack"}
          component={HomeStack}
          options={{
            headerShown: false,
            tabBarLabel: "Home",
            tabBarIconStyle: { color: "gray" },
            tabBarActiveTintColor: style.mainColor,
            tabBarInactiveTintColor: "gray",
            tabBarIcon: ({ color, focused }) => (
              <AntDesign name="home" color={focused ? style.mainColor : "gray"} size={25} />
            )
          }} />

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
              <Feather name="shopping-cart" color={focused ? style.mainColor : "gray"} size={28} />
            )
          }} />
      </Tab.Navigator>
    )
  }




  return (
    <NavigationContainer>
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />

      <Stack.Navigator initialRouteName="Tab">
        <Stack.Screen name="Login" component={LoginScreen} options={options} />
        <Stack.Screen name="Otp" component={OtpScreen} options={options} />
        <Stack.Screen name="Signup" component={SignupScreen} options={options} />
        <Stack.Screen name="SignupOtp" component={SignupOtp} options={options} />
        <Stack.Screen name="Tab" component={TabScreen} options={options} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App