import { useState, useEffect, useCallback } from 'react';
import { DEFAULT_NOTICE_DATA } from '@/lib/constants';
import { generateNoticeToken } from '@/lib/token';

export function useAdminNotices() {
  const [formData, setFormData] = useState({ ...DEFAULT_NOTICE_DATA });
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [createdNotice, setCreatedNotice] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  // Fetch history on mount
  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      let list = [];

      // 1. Try API first (loads local + firestore)
      try {
        const res = await fetch('/api/notices');
        const json = await res.json();
        if (json && json.success && Array.isArray(json.data)) {
          list = json.data;
        }
      } catch (apiErr) {
        console.warn("Failed to load history from API:", apiErr);
      }

      // 2. Fetch direct client Firestore to ensure instant real-time sync
      if (typeof window !== 'undefined') {
        try {
          const { getAllNoticesFromFirestore } = await import('@/lib/firestoreNotices');
          const firestoreList = await getAllNoticesFromFirestore();
          if (firestoreList && Array.isArray(firestoreList) && firestoreList.length > 0) {
            const map = new Map();
            list.forEach(item => { if (item?.token) map.set(item.token, item); });
            firestoreList.forEach(item => { if (item?.token) map.set(item.token, item); });
            list = Array.from(map.values());
          }
        } catch (fErr) {
          console.warn("Direct Firestore history fetch:", fErr);
        }
      }

      // 3. Fallback to localStorage if empty
      if (list.length === 0 && typeof window !== 'undefined') {
        try {
          const local = localStorage.getItem('ajeer_notices_history');
          if (local) list = JSON.parse(local);
        } catch (e) {}
      }

      // Sort newest / updated first (latest at TOP)
      list.sort((a, b) => {
        const timeA = new Date(a.updatedAt || a.createdAt || 0).getTime();
        const timeB = new Date(b.updatedAt || b.createdAt || 0).getTime();
        return timeB - timeA;
      });

      setHistory(list);
    } catch (err) {
      console.warn("fetchHistory error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // Handle form field change
  const handleChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  }, []);

  // Set validity state
  const handleStatusChange = useCallback((isValid) => {
    setFormData(prev => ({
      ...prev,
      isValid,
      statusText: isValid ? "ساري / فعال" : "منتهي / ملغي"
    }));
    setIsDirty(true);
  }, []);

  // Save notice and generate link (or update existing)
  const handleSave = useCallback(async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // Use existing token if editing, or generate new token if creating
      const token = formData.token || generateNoticeToken(formData);
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const fullUrl = `${origin}/notice-verification/${token}`;

      const newRecord = {
        ...DEFAULT_NOTICE_DATA,
        ...formData,
        token,
        url: fullUrl,
        updatedAt: new Date().toISOString(),
        createdAt: formData.createdAt || new Date().toISOString()
      };

      // 1. Direct browser sync to Firestore
      let firestoreOk = false;
      try {
        if (typeof window !== 'undefined') {
          const { saveNoticeToFirestore } = await import('@/lib/firestoreNotices');
          const fRes = await saveNoticeToFirestore(newRecord);
          if (fRes && fRes.success) {
            firestoreOk = true;
          } else if (fRes && fRes.error) {
            console.warn("Direct Firestore save message:", fRes.error);
          }
        }
      } catch (fErr) {
        console.warn("Direct Firestore sync note:", fErr);
      }

      // 2. Server API sync
      try {
        const res = await fetch('/api/notices', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRecord)
        });
        const resData = await res.json();
        if (!resData.success) {
          console.warn("Server API sync response:", resData.error);
        }
      } catch (apiErr) {
        console.warn("API sync call error:", apiErr);
      }

      // 3. Update localStorage history
      try {
        const localHistory = JSON.parse(localStorage.getItem('ajeer_notices_history') || '[]');
        const updated = [newRecord, ...localHistory.filter(item => item.token !== token && item.noticeNumber !== newRecord.noticeNumber)].slice(0, 50);
        localStorage.setItem('ajeer_notices_history', JSON.stringify(updated));
      } catch (e) {}

      // 4. Update UI states immediately
      setFormData(newRecord);
      setCreatedNotice(newRecord);
      setShowModal(true);
      setIsDirty(false);

      // 5. Update history table immediately (newest record at the very TOP)
      setHistory(prev => {
        const remaining = (prev || []).filter(item => item.token !== token && item.noticeNumber !== newRecord.noticeNumber);
        return [newRecord, ...remaining];
      });

      // 6. Refresh full history from Firestore
      fetchHistory();
      return newRecord;
    } catch (err) {
      console.error("Save error:", err);
      setError(err.message || 'حدث خطأ أثناء الحفظ');
      return null;
    } finally {
      setSaving(false);
    }
  }, [formData, fetchHistory]);

  // Reset form to default notice data from image
  const handleReset = useCallback(() => {
    setFormData({
      ...DEFAULT_NOTICE_DATA,
      token: undefined
    });
    setCreatedNotice(null);
    setIsDirty(false);
  }, []);

  // Delete notice (from Firestore, server storage, and UI)
  const handleDelete = useCallback(async (token, noticeNumber) => {
    if (!token && !noticeNumber) return;
    const confirmDelete = typeof window !== 'undefined'
      ? window.confirm("هل أنت متأكد من حذف هذا التصريح والرابط نهائياً؟ (Are you sure you want to delete this notice permanently?)")
      : true;
    if (!confirmDelete) return;

    try {
      // 1. Direct browser delete from Firestore
      if (typeof window !== 'undefined') {
        const { deleteNoticeFromFirestore } = await import('@/lib/firestoreNotices');
        if (token) await deleteNoticeFromFirestore(token);
        if (noticeNumber && noticeNumber !== token) await deleteNoticeFromFirestore(noticeNumber);
      }
    } catch (err) {
      console.warn("Direct Firestore delete warning:", err);
    }

    try {
      // 2. Server API delete
      const target = token || noticeNumber;
      await fetch(`/api/notices/${encodeURIComponent(target)}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.error("API delete error:", err);
    }

    // 3. Immediately update UI state (remove from history)
    setHistory(prev => (prev || []).filter(item => {
      const matchToken = token && item.token === token;
      const matchNum = noticeNumber && item.noticeNumber === noticeNumber;
      return !matchToken && !matchNum;
    }));

    try {
      const localHistory = JSON.parse(localStorage.getItem('ajeer_notices_history') || '[]');
      const filtered = localHistory.filter(item => {
        const matchToken = token && item.token === token;
        const matchNum = noticeNumber && item.noticeNumber === noticeNumber;
        return !matchToken && !matchNum;
      });
      localStorage.setItem('ajeer_notices_history', JSON.stringify(filtered));
    } catch (e) {}

    // 4. Reset form if deleted notice was currently open in editor
    if (
      (token && formData.token === token) || 
      (noticeNumber && formData.noticeNumber === noticeNumber)
    ) {
      handleReset();
    }
  }, [formData.token, formData.noticeNumber, handleReset]);

  // Load an existing record into form
  const handleEdit = useCallback((record) => {
    setFormData({ ...DEFAULT_NOTICE_DATA, ...record });
    setIsDirty(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return {
    formData,
    history,
    loading,
    saving,
    createdNotice,
    showModal,
    setShowModal,
    error,
    isDirty,
    handleChange,
    handleStatusChange,
    handleSave,
    handleDelete,
    handleReset,
    handleEdit,
    fetchHistory
  };
}
