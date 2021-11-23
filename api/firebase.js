import { initializeApp } from "firebase/app";
// prettier-ignore
import { getFirestore, collection, query, onSnapshot } from "firebase/firestore";

const app = initializeApp({
  apiKey: "AIzaSyBoF4LVp-KDss5LUVLFCXVARsiCZFRx-8Q",
  authDomain: "events-b1eb4.firebaseapp.com",
  projectId: "events-b1eb4",
  storageBucket: "events-b1eb4.appspot.com",
  messagingSenderId: "79393024029",
  appId: "1:79393024029:web:6b82256c0c500d86303ef4",
  measurementId: "G-4K8TB0WSQ8",
});
const db = getFirestore(app);

const getAllEvents = (setEvents) => {
  const statement = query(collection(db, "Events"));
  let events = [];
  onSnapshot(statement, (querySnapshot) => {
    events = [];
    querySnapshot.forEach((doc) => {
      events.push(doc.data());
    });
    setEvents(events);
  });
};

export { getAllEvents };
