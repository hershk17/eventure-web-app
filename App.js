import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
// import { getAllEvents } from "./api/firebase";
import { useFormik } from "formik";
import * as Location from "expo-location";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const App = () => {
  // const [events, setEvents] = useState([]);
  const [location, setLocation] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [response, setResponse] = useState();

  const baseURL = "https://api.tomtom.com";
  const versionNumber = "2";
  const responseFormat = "json";
  const apiKey = "YlHRCAWHnD2YVU8wWQqwfJA5VRKpHOPm";

  useEffect(() => {
    // getAllEvents(setEvents);
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
        "&limit=3" +
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

  const formik = useFormik({
    initialValues: {
      location: "",
    },
    onSubmit: (values) => {
      const value = values.location;
      if (value != "") {
        callAPI(value);
      } else {
        alert("empty search!");
      }
    },
  });

  return (
    <View style={styles.container}>
      <form onSubmit={formik.handleSubmit}>
        <input
          id="location"
          name="location"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.location}
        />
        <button onClick={formik.handleSubmit}>Search</button>
      </form>
      {response == null ? (
        <Text style={styles.paragraph}>{text}</Text>
      ) : (
        <View>
          <Text style={styles.paragraph}>
            {response.results[0].poi.name},{" "}
            {response.results[0].address.streetNumber} &nbsp;
            {response.results[0].address.streetName},{" "}
            {response.results[0].address.municipality},{" "}
            {response.results[0].address.extendedPostalCode}
          </Text>
          <Text style={styles.paragraph}>
            {response.results[1].poi.name},{" "}
            {response.results[1].address.streetNumber} &nbsp;
            {response.results[1].address.streetName},{" "}
            {response.results[1].address.municipality},{" "}
            {response.results[1].address.extendedPostalCode}{" "}
          </Text>
          <Text style={styles.paragraph}>
            {response.results[2].poi.name},{" "}
            {response.results[2].address.streetNumber} &nbsp;
            {response.results[2].address.streetName},{" "}
            {response.results[2].address.municipality},{" "}
            {response.results[2].address.extendedPostalCode}
          </Text>
        </View>
      )}
      {/* {events.length > 0 ? (
        <Text>{events[0].event_name}</Text>
      ) : (
        <Text>No</Text>
      )} */}
    </View>
  );
};

export default App;
