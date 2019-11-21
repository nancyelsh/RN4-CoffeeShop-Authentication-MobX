import React from "react";
import { observer } from "mobx-react";
import { withNavigation } from "react-navigation";
import { Icon, Text, Button } from "native-base";

// Stores
import cartStore from "../../Stores/cartStore";
import authStore from "../../Stores/authStore";
import { red } from "ansi-colors";

const Logout = ({ navigation }) => {
  //   const handlePress = () => {
  //     if (authStore.user) navigation.navigate("Login");
  //     else navigation.navigate("Login");
  //   };

  return (
    <Button onPress={authStore.logout} style={{ color: red }} transparent light>
      {/* {authStore.user ? (
        <>
          <Text style={{ color: "white" }}></Text>
          <Icon
            name="shoppingcart"
            type="AntDesign"
            style={{ color: "red" }}
            onPress={() => navigation.navigate("CartScreen")}
          />
        </>
      ) : (
        <Icon
          name="login"
          type="MaterialCommunityIcons"
          style={{ color: "white" }}
          onPress={() => navigation.navigate("Login")}
        />
      )} */}
    </Button>
  );
};

export default withNavigation(observer(Logout));
