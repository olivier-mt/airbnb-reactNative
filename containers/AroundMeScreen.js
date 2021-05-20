import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import MapView from "react-native-maps";
import axios from "axios";

const AroundMeScreen = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms/around"
        );

        setData(result.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.message);
      }
    };

    fetchData();
  }, []);

  console.log("data around", data);

  return isLoading ? (
    <View>
      <Text>Is Loading</Text>
    </View>
  ) : (
    <SafeAreaView style={styles.view}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.856614,
          longitude: 2.3522219,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
      >
        {/* GET EACH ROOM LOCATION*/}

        {data.map((elem, index) => {
          console.log("log", index);
          return (
            <MapView.Marker
              key={elem._id}
              coordinate={{
                latitude: elem.location[1],
                longitude: elem.location[0],
              }}
              title={elem.title}
              description={elem.description}
            />
          );
        })}

        {/*------------------------*/}
      </MapView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default AroundMeScreen;
