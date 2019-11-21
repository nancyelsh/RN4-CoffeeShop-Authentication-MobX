import { createSwitchNavigator } from "react-navigation";

// Components
import Login from "../Components/Authentication/Login";
import Signup from "../Components/Authentication/Signup";

// Navigators
import StackNav from "./StackNav";
import BottomNav from "./BottomNav";

const AuthNav = createSwitchNavigator({
  Login: Login,
  Signup: Signup,
  StackNav: StackNav
  // BottomNav: BottomNav
});

export default AuthNav;
