import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "./app";

const auth = getAuth(app);
/**
 * createUser returns a Promise of an object
 * @param {string} email
 * @param {string} password
 */
function createUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
export { createUser };
