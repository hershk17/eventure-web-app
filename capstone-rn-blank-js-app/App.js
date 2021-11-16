import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Location from 'expo-location';
import { render } from 'react-dom';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [baseURL, setBaseURL] = useState("api.tomtom.com");
  const [versionNumber, setVersionNumber] = useState("2");
  const [responseFormat, setResponseFormat] = useState("json");
  const [apiKey, setApiKey] = useState("zGpy7bbwejkRKMGFfZMhGG4FCpR6IgKV");
  const [radius, setRadius] = useState("100");
  const [fullURL, setFullURL] = useState("");
  const [query, setQuery] = useState("pizza");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  async function callAPI()
  {
    try{
      setFullURL("https://" + baseURL + "/search/" + versionNumber + "/poiSearch/" + query + ".JSON?key=" + apiKey);
      console.log(fullURL);

      const res = await fetch(fullURL);
      const data = await res.json();
      

    }catch (err) {console.log("ERROR: " + err)};
  }

  return (
        
    <View style={styles.container}>
      <Button title = "Call API" onPress={callAPI}/>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
