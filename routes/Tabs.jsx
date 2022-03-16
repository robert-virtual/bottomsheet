import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Pay, Profile } from "../pages";

const Tab = createMaterialTopTabNavigator();

export function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="profile" component={Profile} />
      <Tab.Screen name="pay" component={Pay} />
    </Tab.Navigator>
  );
}
