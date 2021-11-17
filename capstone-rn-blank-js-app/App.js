import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as Location from "expo-location";
import { render } from "react-dom";
import t from 'tcomb-form-native'; // 0.6.9

const queryInfo = t.struct({
  Search: t.String,
  useCurrentLocation: t.Boolean
});



export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [baseURL, setBaseURL] = useState("https://api.tomtom.com");
  const [versionNumber, setVersionNumber] = useState("2");
  const [responseFormat, setResponseFormat] = useState("json");
  const [apiKey, setApiKey] = useState("zGpy7bbwejkRKMGFfZMhGG4FCpR6IgKV");
  const [radius, setRadius] = useState("100");
  const [query, setQuery] = useState("pizza");
  const [response, setResponse] = useState();
  const Form = t.form.Form;

  useEffect(() => {
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
    text = JSON.stringify(response);
  }

  async function callAPI() {
    try {
      let url =
        baseURL + "/search/" + versionNumber + "/poiSearch/" + query +
        "." + responseFormat + "?key=" + apiKey + "&radius=" + radius +
        "&lon=" + location.coords.latitude + "&lat=" + location.coords.longitude;

      console.log("lat:" + location.coords.latitude + ",lon:" + location.coords.longitude + ",query:" + query);
      console.log("apiurl:" + url);

      const res = await fetch(url).then((res) => res.json()).then(data=>setResponse(data.results))

    } catch (err) {
      console.log("ERROR: " + err);
    }
  }
  
  return (
    <View style={styles.container}>
      
      <View>
        <Form type={queryInfo} /> 
        {/* Notice the addition of the Form component */}
      </View>
      <View>
        <Button title="Search" onPress={callAPI} />
        <Text style={styles.paragraph}>{text}</Text>
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
