import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

export default function RoomScreen({ navigation, route }) {
  const { roomId } = route.params;

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [linesLimit, setLinesLimit] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${roomId}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);

  {
    console.log("data", data);
  }

  return isLoading ? (
    <View style={{ flex: 1 }}>
      <ActivityIndicator style={styles.activity} size="large" color="red" />
    </View>
  ) : (
    <View>
      <Image
        source={{
          uri: data.photos[0].url,
        }}
        style={styles.img}
      />
      <Text>{data.title}</Text>

      <TouchableOpacity
        onPress={() => {
          setLinesLimit(!linesLimit);
        }}
      >
        {linesLimit ? (
          <Text numberOfLines={3}>{data.description}</Text>
        ) : (
          <Text>{data.description}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: Dimensions.get("window").width,
    height: 300,
  },
  description: {
    fontSize: 15,
  },

  activity: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});