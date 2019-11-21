import React from "react";
import { observer } from "mobx-react";
import { withNavigation } from "react-navigation";

import { Button, Text } from "native-base";

// Stores
import authStore from "../../Stores/authStore";

const AuthButton = ({ navigation }) => {
  return (
    <Button
      onPress={() => {
        authStore.user
          ? authStore.logout(navigation)
          : navigation.navigate("Login");
      }}
    >
      <Text>Log {authStore.user ? "out" : "in"}!</Text>
    </Button>
  );
};

export default withNavigation(observer(AuthButton));
