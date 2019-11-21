import { decorate, observable } from "mobx";
import { AsyncStorage } from "react-native";
import { instance } from "./instance";
import jwt_decode from "jwt-decode";

class AuthStore {
  user = null;

  setUser = async token => {
    if (token) {
      await AsyncStorage.setItem("myToken", token);
      instance.defaults.headers.common.Authorization = `jwt ${token}`;
      this.user = jwt_decode(token);
    } else {
      await AsyncStorage.removeItem("myToken");
      delete instance.defaults.headers.common.Authorization;
      this.user = null;
    }
  };

  signup = async (userData, navigation) => {
    try {
      const res = await instance.post("register/", userData);
      const user = res.data;
      await this.setUser(user.token);
      navigation.navigate("StackNav");
    } catch (err) {
      console.log(err.response.data);
    }
  };

  login = async (userData, navigation) => {
    console.log("LOGIN", userData);
    try {
      const res = await instance.post("login/", userData);
      const user = res.data;
      console.log("LOGINNNN", user);
      await this.setUser(user.token);
      navigation.navigate("StackNav");
    } catch (err) {
      console.log(err.response.data);
    }
  };

  logout = async navigation => {
    await this.setUser();
  };

  checkForToken = async () => {
    const token = await AsyncStorage.getItem("myToken");
    if (token) {
      const currentTime = Date.now() / 1000;
      const user = jwt_decode(token);
      if (user.exp >= currentTime) {
        this.setUser(token);
      } else {
        this.setUser();
      }
    }
  };
}

decorate(AuthStore, {
  user: observable
});

const authStore = new AuthStore();
authStore.checkForToken();

export default authStore;
