import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

const cartRef = collection(db, 'cart');

// Add to Cart (with duplicate check)
export const addToCart = async (item) => {
  const q = query(cartRef, where('id', '==', item.id));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const docRef = snapshot.docs[0].ref;
    const existing = snapshot.docs[0].data();
    await updateDoc(docRef, {
      quantity: existing.quantity + 1
    });
  } else {
    await addDoc(cartRef, {
      ...item,
      quantity: 1
    });
  }
};

// View Cart
export const getCartItems = async () => {
  const snapshot = await getDocs(cartRef);
  return snapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id }));
};

// Update Quantity
export const updateCartItem = async (docId, quantity) => {
  const itemRef = doc(db, 'cart', docId);
  await updateDoc(itemRef, { quantity });
};

// Remove from Cart
export const removeCartItem = async (docId) => {
  const itemRef = doc(db, 'cart', docId);
  await deleteDoc(itemRef);
};
