import { useState, useEffect } from 'react';
import { useFirestore } from './useFirestore';

export const useNotes = () => {
  // Flag to toggle between LocalStorage and Firebase
  // In a real app, this might be an env var or a user setting
  // For now, we'll try to use Firebase, but fallback if it fails (handled by useFirestore error state)
  const isFirebaseEnabled = true; 

  const { data: firestoreData, loading: firestoreLoading, error: firestoreError, addItem: addFirestore, deleteItem: deleteFirestore, updateItem: updateFirestore } = useFirestore('notes');
  
  const [localData, setLocalData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load from LocalStorage on mount
  useEffect(() => {
    if (!isFirebaseEnabled || firestoreError) {
        const saved = JSON.parse(localStorage.getItem('myNotes')) || [];
        setLocalData(saved);
        setLoading(false);
    }
  }, [isFirebaseEnabled, firestoreError]);

  // Sync state
  const notes = (isFirebaseEnabled && !firestoreError) ? firestoreData : localData;
  const isLoading = (isFirebaseEnabled && !firestoreError) ? firestoreLoading : loading;

  const addNote = async (note) => {
    if (isFirebaseEnabled && !firestoreError) {
      await addFirestore(note);
    } else {
      const newNote = { ...note, id: Date.now().toString() }; // Local ID
      const updated = [...localData, newNote];
      setLocalData(updated);
      localStorage.setItem('myNotes', JSON.stringify(updated));
    }
  };

  const deleteNote = async (id) => {
    if (isFirebaseEnabled && !firestoreError) {
      await deleteFirestore(id);
    } else {
      const updated = localData.filter(n => n.id !== id);
      setLocalData(updated);
      localStorage.setItem('myNotes', JSON.stringify(updated));
    }
  };

  const updateNote = async (id, updatedFields) => {
    if (isFirebaseEnabled && !firestoreError) {
      await updateFirestore(id, updatedFields);
    } else {
      const updated = localData.map(n => n.id === id ? { ...n, ...updatedFields } : n);
      setLocalData(updated);
      localStorage.setItem('myNotes', JSON.stringify(updated));
    }
  };

  const clearAll = async () => {
      if (isFirebaseEnabled && !firestoreError) {
          // Batch delete would be better here, but for simplicity:
          notes.forEach(n => deleteFirestore(n.id));
      } else {
          setLocalData([]);
          localStorage.removeItem('myNotes');
      }
  }

  return { notes, isLoading, addNote, deleteNote, updateNote, clearAll };
};
