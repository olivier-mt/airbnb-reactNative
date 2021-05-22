import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import axios from "axios";
import { FontAwesome, MaterialIcons, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export default function SettingsScreen({ setToken, userId, userToken }) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState();
  const [description, setDescription] = useState();
  const [username, setUserName] = useState();
  const [image, setImage] = useState();
  const [uploading, setUploading] = useState(false);

  const [update, setUpdate] = useState(false);

  useEffect(() => {
    try {
      setIsLoading(true);
      const fetchData = async () => {
        console.log("userId", userId);
        console.log("userToek", userToken);
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        console.log("response data =>", response.data);
        setData(response.data);
        setDescription(response.data.description);
        setEmail(response.data.email);
        setUserName(response.data.username);
        setIsLoading(false);
        await setImage(response.data.photo[0].url);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error.response.data);
      console.log("ok");
    }
  }, [update]);

  const handleLogOut = async () => {
    setToken(null);
    await AsyncStorage.removeItem("storedId");
    console.log("done!!!");
  };

  const handleUpdate = () => {
    const tab = image.split(".");
    const formData = new FormData();
    formData.append("photo", {
      uri: image,
      name: `my-picture.${tab[tab.length - 1]}`,
      type: `image/${tab[tab.length - 1]}`,
    });

    try {
      const sendModif = async () => {
        setIsLoading(true);

        const response = await axios.put(
          "https://express-airbnb-api.herokuapp.com/user/update",
          {
            email,
            description,
            username,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        console.log("response ==>", response.data);

        await sendImage();
        setUpdate(!update);
        alert("Updated !");
      };

      const sendImage = async () => {
        // send image with axios

        try {
          const response = await axios.put(
            "https://express-airbnb-api.herokuapp.com/user/upload_picture",
            formData,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
          console.log(response.data);
        } catch (error) {
          console.log(error.response);
        }
        setIsLoading(false);
      };

      sendModif();
    } catch (error) {
      console.log(error);
    }
  };

  const getPicture = async () => {
    const cameraRollPerm =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    console.log("permission response", cameraRollPerm);

    if (cameraRollPerm.status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync();

      if (!result.cancelled) {
        handleImagePicked(result.uri);
        console.log(result.uri);
      }
    }
  };

  const handleImagePicked = (img) => {
    //  console.log("Image=>", img);
    return setImage(img);
  };

  return isLoading ? (
    <>
      <ActivityIndicator />
      <Text>please wait few secondes</Text>
    </>
  ) : (
    <View style={styles.main}>
      <View
        style={styles.imgContainer}
        onPress={() => {
          console.log("coucou");
        }}
      >
        {image ? (
          <Image style={styles.img} source={{ uri: image }} />
        ) : (
          <FontAwesome name="user-circle-o" size={200} color="black" />
        )}

        <View style={styles.iconeContainer}>
          <AntDesign
            name="picture"
            size={35}
            color="black"
            onPress={getPicture}
          />

          <MaterialIcons
            name="camera-alt"
            size={35}
            color="black"
            onPress={() => {
              console.log("coucou");
            }}
          />
        </View>
      </View>

      <TextInput
        style={styles.textInput1}
        placeholder={data.email}
        placeholderTextColor="black"
        onChangeText={(e) => {
          setEmail(e || data.email);
        }}
      />
      <TextInput
        style={styles.textInput1}
        placeholder={data.username}
        placeholderTextColor="black"
        onChangeText={(e) => {
          setUserName(e || data.username);
        }}
      />
      <TextInput
        style={styles.textInput1}
        placeholder={data.description}
        placeholderTextColor="black"
        onChangeText={(e) => {
          setDescription(e || data.description);
        }}
      />

      <View>
        <Text>{email}</Text>
        <Text>{description}</Text>
        <Text>{username}</Text>
      </View>
      <Button title="Update" onPress={handleUpdate} />

      <Button title="Log Out" onPress={handleLogOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
  },

  img: {
    height: 200,
    width: 200,
    borderWidth: 1,
    borderRadius: 100,
  },

  img2: {
    height: 200,
    width: 200,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "red",
  },

  imgContainer: {
    flexDirection: "row",
  },
  iconeContainer: {
    justifyContent: "space-evenly",
  },
  textInput1: {
    height: 30,
    width: "70%",
    borderWidth: 1,
    borderColor: "white",
    borderBottomColor: "red",
    padding: 5,
  },
  textInput2: {
    height: 30,
    width: 100,
  },
});
