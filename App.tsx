import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabNavigator from "./src/navigation/MainTabNavigator";
import JobDetailScreen from "./src/screens/JobDetailScreen";
import { RootStackParamList } from "./src/navigation/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="JobDetail"
          component={JobDetailScreen}
          options={{ title: "Job Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
