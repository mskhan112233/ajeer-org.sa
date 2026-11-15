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
        ...formData,
        token,
        url: fullUrl,
        updatedAt: new Date().toISOString(),
        createdAt: formData.createdAt || new Date().toISOString()
      };

      // 1. Direct browser sync to Firestore
      try {
        if (typeof window !== 'undefined') {
          const { saveNoticeToFirestore } = await import('@/lib/firestoreNotices');
          await saveNoticeToFirestore(newRecord);
        }
      } catch (fErr) {
        console.warn("Direct Firestore sync note:", fErr);
      }

      // 2. Server API sync
      const res = await fetch('/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecord)
      });
      const resData = await res.json();

      if (!resData.success) {
        throw new Error(resData.error || 'فشل في حفظ التصريح');
      }

      // 3. Update localStorage history
      try {
        const localHistory = JSON.parse(localStorage.getItem('ajeer_notices_history') || '[]');
        const updated = [newRecord, ...localHistory.filter(item => item.token !== token && item.noticeNumber !== newRecord.noticeNumber)].slice(0, 50);
        localStorage.setItem('ajeer_notices_history', JSON.stringify(updated));
      } catch (e) {}

      setCreatedNotice(newRecord);
      setShowModal(true);
      setIsDirty(false);
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
  const handleDelete = useCallback(async (token) => {
    if (!token) return;
    const confirmDelete = typeof window !== 'undefined'
      ? window.confirm("هل أنت متأكد من حذف هذا التصريح والرابط نهائياً؟")
      : true;
    if (!confirmDelete) return;

    try {
      // 1. Direct browser delete from Firestore
      if (typeof window !== 'undefined') {
        const { deleteNoticeFromFirestore } = await import('@/lib/firestoreNotices');
        await deleteNoticeFromFirestore(token);
      }
    } catch (err) {
      console.warn("Direct Firestore delete warning:", err);
    }

    try {
      // 2. Server API delete
      await fetch(`/api/notices/${encodeURIComponent(token)}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.error("API delete error:", err);
    }

    // 3. Immediately update UI state
    setHistory(prev => prev.filter(item => item.token !== token && item.noticeNumber !== token));
    try {
      const localHistory = JSON.parse(localStorage.getItem('ajeer_notices_history') || '[]');
      localStorage.setItem('ajeer_notices_history', JSON.stringify(localHistory.filter(item => item.token !== token && item.noticeNumber !== token)));
    } catch (e) {}

    // 4. Reset form if deleted notice was currently open in editor
    if (formData.token === token || formData.noticeNumber === token) {
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
