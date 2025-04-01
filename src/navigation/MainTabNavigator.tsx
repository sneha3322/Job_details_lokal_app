import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import JobsScreen from "../screens/JobsScreen";
import BookmarksScreen from "../screens/BookmarksScreen";
import { MainTabParamList } from "./types";

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Jobs" component={JobsScreen} />
      <Tab.Screen name="Bookmarks" component={BookmarksScreen} />
    </Tab.Navigator>
  );
}
