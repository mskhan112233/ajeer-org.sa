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
import { sanitizeVerificationUrl, base64UrlDecode } from './token.js';

const NOTICES_COLLECTION = 'notices';
const TIMEOUT_MS = 8000;

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
    if (!notice || (!notice.token && !notice.noticeNumber)) {
      return { success: false, error: 'Notice identifier missing' };
    }

    const cleanUrl = sanitizeVerificationUrl(notice.url, notice.token);

    // Save with primary docId (notice.noticeNumber or notice.token)
    let docId = notice.noticeNumber || notice.token;
    if (!docId || docId.length > 1200 || docId.includes('/')) {
      docId = `notice_${Date.now()}`;
    }

    const docRef = doc(db, NOTICES_COLLECTION, docId);
    const dataToSave = {
      ...notice,
      url: cleanUrl,
      docId,
      updatedAt: new Date().toISOString()
    };

    await withTimeout(setDoc(docRef, dataToSave, { merge: true }), TIMEOUT_MS);

    // If notice.token exists and is different from docId, also save/link it under token docId for instant lookup
    if (notice.token && notice.token !== docId && notice.token.length < 1200 && !notice.token.includes('/')) {
      try {
        const tokenRef = doc(db, NOTICES_COLLECTION, notice.token);
        await withTimeout(setDoc(tokenRef, dataToSave, { merge: true }), TIMEOUT_MS);
      } catch (tErr) {}
    }

    return { success: true, docId };
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

    const formatRecord = (item) => {
      if (!item) return null;
      return {
        ...item,
        url: sanitizeVerificationUrl(item.url, item.token || token)
      };
    };

    // 1. Direct doc lookup by token (if valid doc ID)
    if (token.length < 1400 && !token.includes('/')) {
      try {
        const docRef = doc(db, NOTICES_COLLECTION, token);
        const docSnap = await withTimeout(getDoc(docRef), TIMEOUT_MS);
        if (docSnap && docSnap.exists && docSnap.exists()) {
          return formatRecord(docSnap.data());
        }
      } catch (e) {}
    }

    // 2. Direct doc lookup by extracted notice number / ID
    let extractedId = null;
    if (token.includes('.')) {
      try {
        const parts = token.split('.');
        if (parts.length >= 2) {
          const payloadStr = base64UrlDecode(parts[1]);
          if (payloadStr) {
            const p = JSON.parse(payloadStr);
            extractedId = p.id || p?.data?.noticeNumber;
          }
        }
      } catch (e) {}
    } else {
      extractedId = token;
    }

    if (extractedId && extractedId.length < 1400 && !extractedId.includes('/')) {
      try {
        const idRef = doc(db, NOTICES_COLLECTION, extractedId);
        const idSnap = await withTimeout(getDoc(idRef), TIMEOUT_MS);
        if (idSnap && idSnap.exists && idSnap.exists()) {
          return formatRecord(idSnap.data());
        }
      } catch (e) {}
    }

    // 3. Query collection for matching token, noticeNumber, or docId
    const q = query(collection(db, NOTICES_COLLECTION));
    const querySnapshot = await withTimeout(getDocs(q), TIMEOUT_MS);
    let found = null;
    if (querySnapshot && querySnapshot.forEach) {
      querySnapshot.forEach((d) => {
        const item = d.data();
        if (item && (
          item.token === token ||
          item.noticeNumber === token ||
          d.id === token ||
          item.docId === token ||
          (extractedId && (item.noticeNumber === extractedId || d.id === extractedId))
        )) {
          found = formatRecord(item);
        }
      });
    }
    return found;
  } catch (error) {
    console.warn('Firestore fetch warning:', error.message);
    return null;
  }
}

/**
 * Get all notices from Firestore (newest first)
 */
export async function getAllNoticesFromFirestore() {
  try {
    const q = query(collection(db, NOTICES_COLLECTION));
    const querySnapshot = await withTimeout(getDocs(q), TIMEOUT_MS);
    const list = [];
    if (querySnapshot && querySnapshot.forEach) {
      querySnapshot.forEach((d) => {
        const item = d.data();
        if (item && (item.token || item.noticeNumber)) {
          list.push({
            ...item,
            url: sanitizeVerificationUrl(item.url, item.token)
          });
        }
      });
    }

    // Always sort newest and latest updated at the very TOP
    list.sort((a, b) => {
      const timeA = new Date(a.updatedAt || a.createdAt || 0).getTime();
      const timeB = new Date(b.updatedAt || b.createdAt || 0).getTime();
      return timeB - timeA;
    });

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

    // 1. Delete document directly by token doc ID
    if (token.length < 1400 && !token.includes('/')) {
      try {
        const docRef = doc(db, NOTICES_COLLECTION, token);
        await withTimeout(deleteDoc(docRef), TIMEOUT_MS);
      } catch (e) {}
    }

    // 2. Also search if any doc has matching token or noticeNumber field
    try {
      const q = query(collection(db, NOTICES_COLLECTION));
      const snap = await withTimeout(getDocs(q), TIMEOUT_MS);
      if (snap && snap.forEach) {
        snap.forEach(async (d) => {
          const dData = d.data();
          if (dData.token === token || dData.noticeNumber === token || d.id === token || dData.docId === token) {
            await deleteDoc(d.ref).catch(() => {});
          }
        });
      }
    } catch (e) {}

    return { success: true };
  } catch (error) {
    console.warn('Firestore delete warning:', error.message);
    return { success: false, error: error.message };
  }
}
