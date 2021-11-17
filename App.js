import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getAllEvents } from "./api/firebase";
import { useFormik } from "formik";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const App = () => {
  const [events, setEvents] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [baseURL] = useState("https://api.tomtom.com");
  const [versionNumber] = useState("2");
  const [responseFormat] = useState("json");
  const [apiKey] = useState("YlHRCAWHnD2YVU8wWQqwfJA5VRKpHOPm");
  const [query, setQuery] = useState();

  const [response, setResponse] = useState();

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
      setQuery("pizza");
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = "Done loading";
  }

  function callAPI(val) {
    try {
      let url =
        baseURL +
        "/search/" +
        versionNumber +
        "/search/" +
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
      <View>
        <form onSubmit={formik.handleSubmit}>
          <input
            id="location"
            name="location"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.location}
          />
          <button>Search</button>
        </form>
      </View>
      {response != null ? (
        <View>
          <Text>Restaurants nearby for {query}:</Text>
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
      ) : (
        <Text style={styles.paragraph}>{text}</Text>
      )}
      {events.length > 0 ? (
        <Text>{events[0].event_name}</Text>
      ) : (
        <Text>No</Text>
      )}
    </View>
  );
};

export default App;
