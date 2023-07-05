import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

// Saving new Item
export const saveItem = async (data) => {
  await setDoc(doc(firestore, "products", `${Date.now()}`), data, {
    merge: true,
  });
};

// getall products
/*function fetches documents from the Firestore "products" collection and
 returns the extracted data as an array of products. 
*/
export const getAllProducts = async () => {
  const items = await getDocs(
    query(collection(firestore, "products"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};
