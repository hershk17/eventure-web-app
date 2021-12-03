import { app } from "./app";
// prettier-ignore
import { getFirestore, collection, query, onSnapshot } from "firebase/firestore";

const db = getFirestore(app);
/**
 * getAllEvents gets all events using realtime querySnapshot and call setState to set state of a component
 * @param {function} setEvents a setState hook
 */
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
