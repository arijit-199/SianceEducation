import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"


//////////       SCREENS       //////////////
import LoginScreen from "./screens/LoginScreen";
import { StatusBar } from "react-native";
import OtpScreen from "./screens/OtpScreen";

function App() {

  const Stack = createNativeStackNavigator();
  const options = { headerShown: false };



  return (
    <NavigationContainer>
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"}/>

      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={options}/>
        <Stack.Screen name="Otp" component={OtpScreen} options={options}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App