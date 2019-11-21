import { createBottomTabNavigator } from "react-navigation-tabs";

import StackNav from "./StackNav";

const BottomNav = createBottomTabNavigator({
  StackNav: StackNav
});

export default BottomNav;
