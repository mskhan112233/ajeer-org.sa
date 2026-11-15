import { db } from './firebase.js';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  orderBy,
  limit
} from 'firebase/firestore';

const NOTICES_COLLECTION = 'notices';
const TIMEOUT_MS = 2500;

function withTimeout(promise, ms = TIMEOUT_MS) {
  let timer;
  const timeoutPromise = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error('Firestore operation timed out')), ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => {
    clearTimeout(timer);
  });
}

/**
 * Save notice to Firestore
 */
export async function saveNoticeToFirestore(notice) {
  try {
    if (!notice || !notice.token) return { success: false, error: 'Token missing' };

    const docRef = doc(db, NOTICES_COLLECTION, notice.token);
    const dataToSave = {
      ...notice,
      updatedAt: new Date().toISOString()
    };

    await withTimeout(setDoc(docRef, dataToSave, { merge: true }), 3000);
    return { success: true };
  } catch (error) {
    console.warn('Firestore save warning:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Get notice by token from Firestore
 */
export async function getNoticeFromFirestore(token) {
  try {
    if (!token) return null;
    const docRef = doc(db, NOTICES_COLLECTION, token);
    const docSnap = await withTimeout(getDoc(docRef), 2000);

    if (docSnap && docSnap.exists && docSnap.exists()) {
      return docSnap.data();
    }
  } catch (error) {
    console.warn('Firestore fetch warning:', error.message);
  }
  return null;
}

/**
 * Get all notices from Firestore
 */
export async function getAllNoticesFromFirestore() {
  try {
    const q = query(collection(db, NOTICES_COLLECTION), orderBy('createdAt', 'desc'), limit(50));
    const querySnapshot = await withTimeout(getDocs(q), 2500);
    const list = [];
    if (querySnapshot && querySnapshot.forEach) {
      querySnapshot.forEach((d) => {
        list.push(d.data());
      });
    }
    return list;
  } catch (error) {
    console.warn('Firestore getAll warning:', error.message);
    return [];
  }
}

/**
 * Delete notice from Firestore
 */
export async function deleteNoticeFromFirestore(token) {
  try {
    if (!token) return { success: false };
    const docRef = doc(db, NOTICES_COLLECTION, token);
    await withTimeout(deleteDoc(docRef), 2000);
    return { success: true };
  } catch (error) {
    console.warn('Firestore delete warning:', error.message);
    return { success: false, error: error.message };
  }
}
