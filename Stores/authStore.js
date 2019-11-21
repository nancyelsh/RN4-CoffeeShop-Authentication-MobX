import { decorate, observable } from "mobx";
import jwt_decode from "jwt-decode";
import { AsyncStorage } from "react-native";
import instance from "./instance";

class AuthStore {
  user = null;

  setUser = async token => {
    if (token) {
      instance.defaults.headers.common.Authorization = `JWT ${token}`;
      this.user = jwt_decode(token);
      await AsyncStorage.setItem("myToken", token);
      console.log("USER", this.user);
    } else {
      delete instance.defaults.headers.common.Authorization;
      this.user = null;
      await AsyncStorage.removeItem("myToken");
    }
  };

  login = async (userData, navigation) => {
    try {
      const res = await instance.post("login/", userData);
      const user = res.data;
      this.setUser(user.token);
      navigation.navigate("StackNav");
    } catch (err) {
      console.error(err);
    }
  };

  signup = async userData => {
    try {
      await instance.post("register/", userData);
      this.login(userData);
    } catch (err) {
      console.error(err);
    }
  };

  logout = () => {
    this.setUser();
  };

  checkForToken = async () => {
    const token = await AsyncStorage.getItem("myToken");
    if (token) {
      const currentTime = Date.now() / 1000;
      const decodedToken = jwt_decode(token);
      if (decodedToken.exp >= currentTime) {
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

export default authStore;
