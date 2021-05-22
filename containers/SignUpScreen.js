import React, { useState } from "react";
//import { useNavigation } from "@react-navigation/core";

import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { set } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUpScreen({ setToken, navigation, setUserId }) {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleOnPress = () => {
    if ((email, username, description, password, password2)) {
      if (password2 === password) {
        const sendData = async () => {
          try {
            const response = await axios.post(
              "https://express-airbnb-api.herokuapp.com/user/sign_up",
              {
                email,
                username,
                description,
                password,
              }
            );

            console.log("response", response.data);
            setToken(response.data.token);
            setUserId(response.data.id);
            AsyncStorage.setItem("storedId", JSON.stringify(response.data.id));
          } catch (error) {
            console.log(error);
          }
        };

        sendData();
        storeId();
      }
    } else {
      alert("please fill all the fields");
    }
  };

  return (
    <View>
      <View>
        <Text>Email:{email}</Text>
        <TextInput
          placeholder="Email"
          onChangeText={(e) => {
            setEmail(e);
          }}
        />
        <Text>username: {username}</Text>
        <TextInput
          placeholder="username"
          onChangeText={(e) => {
            setUserName(e);
          }}
        />
        <Text>Description: {description}</Text>
        <TextInput
          placeholder="Describe yourself in few words"
          onChangeText={(e) => {
            setDescription(e);
          }}
        />
        <Text>Password: {password} </Text>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(e) => {
            setPassword(e);
          }}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(e) => {
            setPassword2(e);
          }}
        />

        <TouchableOpacity
          style={styles.button}
          title="Sign up"
          onPress={
            handleOnPress

            //  const userToken = "secret-token";
            //  setToken(userToken);
          }
        >
          <Text>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignIn", {});
          }}
        >
          <Text>Already have an account? Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 30,
    width: 100,
    borderColor: "red",
    borderWidth: 3,
  },
});
