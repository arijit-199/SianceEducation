import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"


//////////       SCREENS       //////////////
import LoginScreen from "./src/screens/LoginScreen";
import OtpScreen from "./src/screens/OtpScreen";
import SignupScreen from "./src/screens/SignupScreen";
import SignupOtp from "./src/screens/SignupOtp";
import Homescreen from "./src/screens/Homescreen";
import { style } from "./src/styles/globalStyles";
import CourseDetailsScreen from "./src/screens/CourseDetailsScreen";



function App() {

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const options = { headerShown: false };



  function HomeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name={"Home"} component={Homescreen} options={options} />
        <Stack.Screen name={"Course Details"} component={CourseDetailsScreen} options={options} />
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
            tabBarIconStyle: {color: "gray"},
            tabBarActiveTintColor: style.mainColor,
            tabBarInactiveTintColor: "gray",
            tabBarIcon: ({ color, focused }) => (
              <AntDesign name="home" color={focused ? style.mainColor : "gray"} size={20} />
            )
          }} />
      </Tab.Navigator>
    )
  }




  return (
    <NavigationContainer>
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />

      <Stack.Navigator>
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