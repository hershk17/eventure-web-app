import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
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

  function updateAPIURL()
  {
    setLongitude(prev => location.coords.longitude, 
      setLatitude(prev => location.coords.latitude, 
        setQuery(prev => "pizza", 
          setFullURL(baseURL + "/search/" 
          + versionNumber + "/poiSearch/" 
          + query + "."+ responseFormat 
          + "?key=" + apiKey 
          + "&radius=" + radius 
          + "&long=" + longitude
          + "&lat=" + latitude), 
            callAPI()
        )
      )
    );          
  }

  function callAPI()
  {
    console.log(location.coords.longitude);
    console.log("longitude: " + longitude);
    console.log(fullURL);
    // const res = fetch(fullURL).then((res)=> JSON.stringify(res));
  }

  // useEffect(()=>{
    
                    
    // try{

      
    //   if ( longitude != ""  && latitude != "")
    //   {
    //     const res = fetch(fullURL).then((res)=> JSON.stringify(res));
    //     console.log("1: " + fullURL);
    //     // const data = res.json();
    //     const response = JSON.stringify(res);
    //     console.log("This is res:" + response);
    //     // console.log("Data returned:\n" + data);

    //   }
      
    // }catch (err) {console.log("ERROR: " + err)};
                          
    // }, [fullURL]);


  return (
        
    <View style={styles.container}>
      <Button title = "Call API" onPress={updateAPIURL}/>
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
