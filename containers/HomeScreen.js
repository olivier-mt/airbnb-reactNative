import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, View, FlatList, StyleSheet } from "react-native";
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
    <View>
      <Text>Is Loading...</Text>
    </View>
  ) : (
    <View>
      <Text>Welcome home!</Text>
      <View>
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={(item) => (
            <View style={styles.title}>
              <Text styles={styles.style}>{item.title}</Text>
            </View>
          )}
        />
      </View>
      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    height: 50,
    width: 50,
  },
  title: {
    color: "black",
    height: 60,
    width: 200,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "red",
  },
  text: {
    color: "black",
    width: 150,
    height: 100,
  },
});
