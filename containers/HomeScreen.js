import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";
import { shouldUseActivityState } from "react-native-screens";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <View style={{ flex: 1 }}>
      <ActivityIndicator size="large" color="grey" />
    </View>
  ) : (
    //<ScrollView>
    //  <>
    <FlatList
      style={{ flex: 1 }}
      contentContainerStyle={{ alignItems: "center" }}
      data={data}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => {
        console.log("item ===>", item); // ici
        return (
          <TouchableOpacity
            style={styles.sheet}
            onPress={() => {
              navigation.navigate("Room", {
                roomId: item._id,
              });
            }}
          >
            <Image
              style={styles.img}
              source={{ uri: item.photos[0].url }}
            ></Image>
            <View style={styles.price}>
              <Text style={{ color: "white" }}>{item.price}</Text>
            </View>
            <Text numberOfLines={1} styles={styles.text}>
              {item.title}
            </Text>
          </TouchableOpacity>
        );
      }}
    />

    //  </ScrollView>
  );
}

const styles = StyleSheet.create({
  sheet: {
    width: 300,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "red",
    alignItems: "center",
  },

  text: {
    color: "black",
    width: 100,
    height: 100,
  },

  img: {
    width: 300,
    height: 200,
    position: "relative",
  },

  price: {
    width: 50,
    height: 30,
    position: "absolute",
    backgroundColor: "black",
    left: 0,
    bottom: 20,
  },

  flatList: {
    flex: 1,
  },
});
