import { app } from "./app";
// prettier-ignore
import { getFirestore, collection, query, onSnapshot } from "firebase/firestore";

const db = getFirestore(app);
/**
 * getAllEvents gets all events using realtime querySnapshot and call setState to set state of a component
 * @param {function} setState a setState hook
 */
const getAllEvents = (setState) => {
  const statement = query(collection(db, "Events"));
  let events = [];
  onSnapshot(statement, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      events.push(doc.data());
    });
    setState(events);
  });
};

export { getAllEvents };
