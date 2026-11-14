import fs from 'fs';
import path from 'path';
import { DEFAULT_NOTICE_DATA } from './constants';
import { parseNoticeToken } from './token';

const DATA_FILE = path.join(process.cwd(), 'data', 'notices.json');

// Ensure data directory exists
function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch (e) {}
  }
}

// Read all notices from local JSON storage
export function getSavedNotices() {
  try {
    ensureDataDir();
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.warn("Storage read warning:", error.message);
  }
  return [];
}

// Save notice to file
export function saveNotice(notice) {
  try {
    ensureDataDir();
    const notices = getSavedNotices();
    const existingIndex = notices.findIndex(n => n.token === notice.token || (notice.id && n.id === notice.id));
    
    if (existingIndex >= 0) {
      notices[existingIndex] = { ...notices[existingIndex], ...notice, updatedAt: new Date().toISOString() };
    } else {
      notices.unshift({ ...notice, createdAt: new Date().toISOString() });
    }

    // Keep top 100
    const limited = notices.slice(0, 100);
    fs.writeFileSync(DATA_FILE, JSON.stringify(limited, null, 2), 'utf-8');
    return { success: true };
  } catch (error) {
    console.error("Storage save error:", error);
    return { success: false, error: error.message };
  }
}

// Delete notice from file
export function deleteSavedNotice(token) {
  try {
    ensureDataDir();
    const notices = getSavedNotices();
    const filtered = notices.filter(n => n.token !== token);
    fs.writeFileSync(DATA_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Find notice by token or extract from token
export function findNotice(token) {
  if (!token) return DEFAULT_NOTICE_DATA;

  // 1. Search in saved file storage
  const notices = getSavedNotices();
  const match = notices.find(n => n.token === token || n.id === token);
  if (match) {
    return { ...DEFAULT_NOTICE_DATA, ...match };
  }

  // 2. Decode from JWT token payload directly
  const parsed = parseNoticeToken(token);
  if (parsed) {
    return { ...DEFAULT_NOTICE_DATA, ...parsed };
  }

  return DEFAULT_NOTICE_DATA;
}
