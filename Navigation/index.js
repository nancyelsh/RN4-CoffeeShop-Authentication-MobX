import { createAppContainer } from "react-navigation";

import StackNav from "./StackNav";
import AuthNav from "./AuthNav";
import BottomNav from "./BottomNav";

const AppContainer = createAppContainer(AuthNav);

export default AppContainer;
