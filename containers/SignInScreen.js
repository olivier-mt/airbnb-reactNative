import React, { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import axios from "axios";
import Logo from "../assets/Logo.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignInScreen({ setToken, navigation, route }) {
  console.log("props", route);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldRemember, setFieldRemember] = useState(false);

  const sendRequest = () => {
    const fetchData = async () => {
      try {
        console.log("fetched");
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email: email,
            password: password,
          }
        );

        alert("Vous êtes connecté");
      } catch (error) {
        console.log(error.response.status);
        if (error.response.status === 401) {
          alert("account does not exists");
        }
      }
    };

    fetchData();
  };

  const checkInput = () => {
    console.log("checked");

    if (!email || !password) {
      setFieldRemember(true);
    } else {
      sendRequest();
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View>
        <View>
          <View style={{ alignItems: "center" }}>
            <Image source={Logo} style={style.logo} resizeMode="contain" />
          </View>
          <Text>Email: </Text>
          <TextInput
            placeholder="Email"
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          <Text>{email}</Text>
          <Text>Password: </Text>
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          <Text>{password}</Text>
          <Button
            title="Sign in"
            onPress={async () => {
              checkInput();
              console.log("pressed");
              const userToken = "secret-token";
              setToken(userToken);
            }}
          />
          {fieldRemember && <Text>Please fill all the fields</Text>}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text>Create an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const style = StyleSheet.create({
  logo: {
    marginVertical: 30,
    marginHorizontal: "auto",
    height: 100,
    width: 100,
  },
});
