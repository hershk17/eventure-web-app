import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-elements";
import { getAllEvents } from "./api/firebase";
import { Formik } from "formik";
import * as Location from "expo-location";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import openMap from "react-native-open-maps";
// import { createMapLink } from "react-native-open-maps";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 30,
  },
});

const App = () => {
  const [events, setEvents] = useState([]);
  const [location, setLocation] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [response, setResponse] = useState();

  const baseURL = "https://api.tomtom.com";
  const versionNumber = "2";
  const responseFormat = "json";
  const apiKey = "YlHRCAWHnD2YVU8wWQqwfJA5VRKpHOPm";

  useEffect(() => {
    getAllEvents(setEvents);
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Loading...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = null;
  }

  // function _goToYosemite() {
  //   openMap({ latitude: 37.865101, longitude: -119.53833 });
  // }

  function callAPI(val) {
    try {
      let url =
        baseURL +
        "/search/" +
        versionNumber +
        "/poiSearch/" +
        val +
        "." +
        responseFormat +
        "?lat=" +
        location.coords.latitude +
        "&lon=" +
        location.coords.longitude +
        "&key=" +
        apiKey;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setResponse(data);
        });
    } catch (err) {
      console.log("ERROR: " + err);
    }
  }

  function EventsScreen() {
    return (
      <View style={styles.container}>
        {events.length > 0 ? (
          <View>
            {events.map((event) => (
              <Text key={event.event_id}>{event.event_name}</Text>
            ))}
          </View>
        ) : (
          <Text>No</Text>
        )}
      </View>
    );
  }

  function POISearchScreen() {
    console.log(response);
    return (
      <View style={styles.container}>
        <Formik
          initialValues={{ location: "" }}
          onSubmit={(values) => {
            const value = values.location;
            if (value != "") {
              callAPI(value);
            } else {
              alert("empty search!");
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <TextInput
                onChangeText={handleChange("location")}
                onBlur={handleBlur("location")}
                style={{
                  height: 35,
                  borderColor: "black",
                  borderWidth: 1,
                  width: "50%",
                }}
                value={values.location}
              />
              <Button onPress={handleSubmit} title="Search" />
            </View>
          )}
        </Formik>

        {response == null ? (
          <Text>{text}</Text>
        ) : (
          <ScrollView>
            {response.results.map((loc, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  console.log("lmao");
                  openMap({
                    latitude: 37.865101,
                    longitude: -119.53833,
                  });
                }}
              >
                <Card>
                  <Card.Title>{loc.poi.name}</Card.Title>
                  <Card.Divider />
                  <Text>
                    {loc.address.streetName +
                      ", " +
                      loc.address.municipality +
                      ", " +
                      loc.address.postalCode +
                      ", " +
                      loc.address.country}
                  </Text>
                </Card>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    );
  }

  const Tab = createMaterialBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Events" component={EventsScreen} />
        <Tab.Screen name="POI Search" component={POISearchScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
