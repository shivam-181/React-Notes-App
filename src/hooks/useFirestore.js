import { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export const useFirestore = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, collectionName), (snap) => {
      let list = [];
      snap.docs.forEach(doc => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setData(list);
      setLoading(false);
    }, (err) => {
      console.error("Firestore Error:", err);
      setError(err);
      setLoading(false);
    });

    return () => unsub();
  }, [collectionName]);

  const addItem = async (item) => {
    try {
        await addDoc(collection(db, collectionName), item);
    } catch (err) {
        console.error("Error adding document: ", err);
        throw err;
    }
  };

  const deleteItem = async (id) => {
    try {
        await deleteDoc(doc(db, collectionName, id));
    } catch (err) {
        console.error("Error deleting document: ", err);
        throw err;
    }
  };

  const updateItem = async (id, updatedFields) => {
    try {
        await updateDoc(doc(db, collectionName, id), updatedFields);
    } catch (err) {
        console.error("Error updating document: ", err);
        throw err;
    }
  };

  return { data, loading, error, addItem, deleteItem, updateItem };
};
