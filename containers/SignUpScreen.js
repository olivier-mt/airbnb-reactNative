import React, { useState } from "react";
//import { useNavigation } from "@react-navigation/core";

import { Button, Text, TextInput, View, TouchableOpacity } from "react-native";

export default function SignUpScreen({ setToken, navigation, route }) {
  //const navigation = useNavigation();

  return (
    <View>
      <View>
        <Text>Name: </Text>
        <TextInput placeholder="Username" />
        <Text>Password: </Text>
        <TextInput placeholder="Password" secureTextEntry={true} />
        <Button
          title="Sign up"
          onPress={async () => {
            const userToken = "secret-token";
            setToken(userToken);
          }}
        />
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
