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

  // Fetch history on mount
  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/notices');
      const json = await res.json();
      if (json && json.success && Array.isArray(json.data)) {
        setHistory(json.data);
      }
    } catch (err) {
      console.warn("Failed to load history from API:", err);
      try {
        const local = localStorage.getItem('ajeer_notices_history');
        if (local) setHistory(JSON.parse(local));
      } catch (e) {}
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
  }, []);

  // Set validity state
  const handleStatusChange = useCallback((isValid) => {
    setFormData(prev => ({
      ...prev,
      isValid,
      statusText: isValid ? "ساري / فعال" : "منتهي / ملغي"
    }));
  }, []);

  // Save notice and generate link
  const handleSave = useCallback(async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const token = generateNoticeToken(formData);
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const fullUrl = `${origin}/notice-verification/${token}`;

      const newRecord = {
        ...formData,
        token,
        url: fullUrl,
        createdAt: new Date().toISOString()
      };

      const res = await fetch('/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecord)
      });
      const resData = await res.json();

      if (!resData.success) {
        throw new Error(resData.error || 'فشل في حفظ التصريح');
      }

      try {
        const localHistory = JSON.parse(localStorage.getItem('ajeer_notices_history') || '[]');
        const updated = [newRecord, ...localHistory.filter(item => item.token !== token)].slice(0, 50);
        localStorage.setItem('ajeer_notices_history', JSON.stringify(updated));
      } catch (e) {}

      setCreatedNotice(newRecord);
      setShowModal(true);
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

  // Delete notice
  const handleDelete = useCallback(async (token) => {
    if (!token) return;
    try {
      await fetch(`/api/notices/${encodeURIComponent(token)}`, {
        method: 'DELETE'
      });
      setHistory(prev => prev.filter(item => item.token !== token));
      try {
        const localHistory = JSON.parse(localStorage.getItem('ajeer_notices_history') || '[]');
        localStorage.setItem('ajeer_notices_history', JSON.stringify(localHistory.filter(item => item.token !== token)));
      } catch (e) {}
    } catch (err) {
      console.error("Delete error:", err);
    }
  }, []);

  // Reset form
  const handleReset = useCallback(() => {
    setFormData({
      ...DEFAULT_NOTICE_DATA,
      noticeNumber: "",
      workerName: "",
      iqamaNumber: "",
      facilityNumber: "",
      facilityName: "",
      occupation: ""
    });
    setCreatedNotice(null);
  }, []);

  // Load an existing record into form
  const handleEdit = useCallback((record) => {
    setFormData({ ...DEFAULT_NOTICE_DATA, ...record });
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
    handleChange,
    handleStatusChange,
    handleSave,
    handleDelete,
    handleReset,
    handleEdit
  };
}
