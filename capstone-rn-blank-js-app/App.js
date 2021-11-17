import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as Location from "expo-location";
import { render } from "react-dom";
import t from 'tcomb-form-native'; // 0.6.9

const queryInfo = t.struct({
  Search: t.String,
  Location: t.maybe(t.String),
  useCurrentLocation: t.Boolean
});

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [baseURL, setBaseURL] = useState("https://api.tomtom.com");
  const [versionNumber, setVersionNumber] = useState("2");
  const [responseFormat, setResponseFormat] = useState("json");
  const [apiKey, setApiKey] = useState("YlHRCAWHnD2YVU8wWQqwfJA5VRKpHOPm");
  const [radius, setRadius] = useState("100");
  const [query, setQuery] = useState("pizza");
  const [response, setResponse] = useState(null);
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
    //text = JSON.stringify(response);
    text="Done loading";
  }

  function callAPI(structVal) {
    try {
      let url =
        baseURL + "/search/" + versionNumber + "/search/" + structVal.Search +
        "." + responseFormat + "?lat=" + location.coords.latitude + 
        "&lon=" + location.coords.longitude + "&limit=3" + "&key=" + apiKey;


      console.log("lat: " + location.coords.latitude + ", lon: " + location.coords.longitude + ", query: " + query);
      console.log("apiurl: " + url);

      const res = fetch(url).then((res) => res.json()).then(data=>{
        setResponse(data);
        console.log(response);
        console.log("Response is type: " + typeof(response));
        console.log(response.results[0].poi.name);
      });

    } catch (err) {
      console.log("ERROR: " + err);
    }
  }
  
  function handleSearch()
  {
    const value = this._form.getValue(); // use that ref to get the form value
    // console.log('value: ', value);
    if (value != "")
    {
      // console.log("Search: "+ value.Search);
      callAPI(value);
    }
    else
    {
      console.log("empty search!");
    }
    
  }
  

  return (
    
    <View style={styles.container}>
      <View>
        <Form 
        ref={c => this._form = c} // assign a ref
        type={queryInfo} /> 
        {/* Notice the addition of the Form component */}
      </View>
      <View>
        <Button title="Search" onPress={handleSearch} />
        {/* <Button title="CallAPI" onPress={callAPI} /> */}
        {/* <Text style={styles.paragraph}>{text}</Text> */}
      </View>

      {response != null ? 
      <View>
        <Text>Restaurants nearby for {query}:</Text>
        <Text style={styles.paragraph}>{response.results[0].poi.name}, {response.results[0].address.streetNumber} &nbsp; 
        {response.results[0].address.streetName}, {response.results[0].address.municipality}, {response.results[0].address.extendedPostalCode}</Text> 
        <Text style={styles.paragraph}>{response.results[1].poi.name}, {response.results[1].address.streetNumber} &nbsp; 
        {response.results[1].address.streetName}, {response.results[1].address.municipality}, {response.results[1].address.extendedPostalCode} </Text>
        <Text style={styles.paragraph}>{response.results[2].poi.name}, {response.results[2].address.streetNumber} &nbsp; 
        {response.results[2].address.streetName}, {response.results[2].address.municipality}, {response.results[2].address.extendedPostalCode}</Text>
        </View>
      : <Text style={styles.paragraph}>{text}</Text>}

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
