import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const getUserCartRef = (userId) => collection(db, "cart_" + userId);

export const addOrUpdateCartItem = async (userId, product) => {
  const cartRef = getUserCartRef(userId);
  const q = query(cartRef, where("id", "==", product.id));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const cartDoc = querySnapshot.docs[0];
    const data = cartDoc.data();
    await updateDoc(cartDoc.ref, { quantity: data.quantity + 1 });
  } else {
    await addDoc(cartRef, { ...product, quantity: 1 });
  }
};

export const getCartItems = async (userId) => {
  const cartRef = getUserCartRef(userId);
  const querySnapshot = await getDocs(cartRef);
  return querySnapshot.docs.map((doc) => ({ docId: doc.id, ...doc.data() }));
};

export const updateCartItemQuantity = async (userId, docId, quantity) => {
  const itemRef = doc(db, "cart_" + userId, docId);
  await updateDoc(itemRef, { quantity });
};

export const removeCartItem = async (userId, docId) => {
  const itemRef = doc(db, "cart_" + userId, docId);
  await deleteDoc(itemRef);
};

export const clearCart = async (userId) => {
  const cartRef = getUserCartRef(userId);
  const querySnapshot = await getDocs(cartRef);
  const batchDeletes = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
  await Promise.all(batchDeletes);
};
