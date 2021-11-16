import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Location from 'expo-location';
import { render } from 'react-dom';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // const [coordinates, setCoordinates] = useState([longitude: "",latitude: ""]);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [baseURL, setBaseURL] = useState("https://api.tomtom.com");
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
    text = fullURL;

  }

  async function callAPI()
  {

    try{
      //setFullURL("https://" + baseURL + "/search/" + versionNumber + "/poiSearch/" + query + ".JSON?key=" + apiKey);

    console.log("nice");

    setLongitude(prev => location.coords.longitude);
    setLatitude(prev => location.coords.latitude);
    setQuery(prev => "pizza");
    setFullURL(baseURL + "/search/" 
                        + versionNumber + "/poiSearch/" 
                        + query + "."+ responseFormat 
                        + "?key=" + apiKey 
                        + "&radius=" + radius 
                        + "&long=" + longitude
                        + "&lat=" + latitude);


    console.log(fullURL);
    const res = await fetch(fullURL).then((res)=> JSON.stringify(res));

    //const data = await res.json();
    console.log("This is res:" + res);
    //console.log("Data returned:\n" + data);

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
