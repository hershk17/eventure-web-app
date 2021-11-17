import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getAllEvents } from "./api/firebase";
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
  useEffect(() => {
    getAllEvents(setEvents);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      {events.length > 0 ? (
        <Text>{events[0].event_name}</Text>
      ) : (
        <Text>No</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
};

export default App;
