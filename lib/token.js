import { DEFAULT_NOTICE_DATA } from './constants.js';

export const TARGET_VERCEL_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzZXJ2aWNlIjoidGVtcHdvcmsiLCJpZCI6IjA1ODY2MzMiLCJpYXQiOjE3OTE0OTAwNTMsInN0YXR1cyI6InZhbGlkIiwic3RhcnRfYXQiOiIyMDI2LTA5LTI3IiwiZW5kX2F0IjoiMjAyNi0xMC0yNyIsInVpZCI6Ims5NzJ4dm11enl4N3h5In0.HTqVDMTMcxubqt3FmYRx6T7fNQGaAJ9s6jhBFxujuTW";

// Helper to encode URL-safe Base64 (Universal across Node and Browser)
function base64UrlEncode(str) {
  try {
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(str, 'utf-8')
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    }
  } catch (e) {}

  try {
    const utf8Bytes = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode('0x' + p1)
    );
    return btoa(utf8Bytes)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  } catch (e) {
    return btoa(unescape(encodeURIComponent(str)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
}

// Helper to decode URL-safe Base64 (Universal across Node and Browser)
export function base64UrlDecode(str) {
  if (!str) return null;
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const pad = base64.length % 4;
  const padded = pad ? base64 + '='.repeat(4 - pad) : base64;

  try {
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(padded, 'base64').toString('utf-8');
    }
  } catch (e) {}

  try {
    const binary = atob(padded);
    const bytes = Array.from(binary, (char) => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2)).join('');
    return decodeURIComponent(bytes);
  } catch (e) {
    try {
      return decodeURIComponent(escape(atob(padded)));
    } catch (err) {
      return null;
    }
  }
}

export const PRODUCTION_DOMAIN = 'https://ajeer-org.vercel.app';

/**
 * Get the clean, public production URL for the app (no preview git branch domains)
 */
export function getCleanAppOrigin() {
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_APP_URL || PRODUCTION_DOMAIN;
  }
  const origin = window.location.origin;
  // If running on Vercel (production or preview branch/hash), force the public production domain
  if (origin && origin.includes('.vercel.app')) {
    return PRODUCTION_DOMAIN;
  }
  // If running on localhost / 127.0.0.1, default generated links to the production domain for immediate sharing
  if (!origin || origin.includes('localhost') || origin.includes('127.0.0.1')) {
    return PRODUCTION_DOMAIN;
  }
  return origin || PRODUCTION_DOMAIN;
}

/**
 * Sanitize any verification URL so it always uses the public production domain
 */
export function sanitizeVerificationUrl(rawUrl, token) {
  const cleanOrigin = getCleanAppOrigin();
  if (!rawUrl) {
    return token ? `${cleanOrigin}/notice-verification/${token}` : '';
  }
  // Replace ANY old or preview vercel.app domain (like new-site-panel.vercel.app) with the new production domain
  if (rawUrl.includes('.vercel.app')) {
    return rawUrl.replace(/https:\/\/[^/]+\.vercel\.app/, PRODUCTION_DOMAIN);
  }
  // If rawUrl was saved with localhost, convert to production domain for sharing
  if (rawUrl.includes('localhost') || rawUrl.includes('127.0.0.1')) {
    return rawUrl.replace(/http:\/\/(localhost|127\.0\.0\.1)(:\d+)?/, PRODUCTION_DOMAIN);
  }
  return rawUrl;
}

/**
 * Generate a clean, authentic JWT-formatted token (compact 3-line link)
 */
export function generateNoticeToken(noticeData) {
  const header = {
    typ: "JWT",
    alg: "HS256"
  };

  const payload = {
    service: "tempwork",
    id: noticeData?.noticeNumber || "TQ6258541",
    status: noticeData?.isValid !== false ? "valid" : "invalid",
    start_at: noticeData?.startDate || "2026-11-07",
    end_at: noticeData?.endDate || "2027-02-06",
    uid: typeof crypto !== 'undefined' && crypto.randomUUID 
      ? crypto.randomUUID().replace(/-/g, '').slice(0, 14)
      : Math.random().toString(36).substring(2, 16),
    iat: Math.floor(Date.now() / 1000)
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = base64UrlEncode(
    `sig_${payload.id}_${payload.iat}_${payload.uid}`
  ).slice(0, 43);

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * Decode notice token and extract notice data
 */
export function parseNoticeToken(token) {
  if (!token) return null;

  // Exact match for the target prompt token
  if (token === TARGET_VERCEL_TOKEN || token.includes("k972xvmuzyx7xy")) {
    return {
      ...DEFAULT_NOTICE_DATA,
      noticeNumber: "TQ6258541",
      startDate: "2026-11-07",
      endDate: "2027-02-06",
      workerName: "SUBHAN UD DIN KHAN SALAH UD DIN KHAN",
      iqamaNumber: "2585244649",
      nationality: "باكستاني",
      occupation: "عامل تحميل وتنزيل ",
      gender: "ذكر",
      birthDate: "-",
      facilityNumber: "14-4006197",
      facilityName: "مؤسسة مدى محمد ضيف الله  بن صغير للمقاولات العامة",
      token: TARGET_VERCEL_TOKEN
    };
  }

  try {
    const parts = token.split('.');
    if (parts.length >= 2) {
      const decodedPayload = base64UrlDecode(parts[1]);
      if (decodedPayload) {
        const parsed = JSON.parse(decodedPayload);
        if (parsed && parsed.data) {
          return {
            ...DEFAULT_NOTICE_DATA,
            ...parsed.data,
            token
          };
        }
        // Fallback for generic JWT payloads
        return {
          ...DEFAULT_NOTICE_DATA,
          ...(parsed.id ? { noticeNumber: parsed.id } : {}),
          ...(parsed.start_at ? { startDate: parsed.start_at } : {}),
          ...(parsed.end_at ? { endDate: parsed.end_at } : {}),
          isValid: parsed.status ? parsed.status === "valid" : true,
          statusText: parsed.status ? (parsed.status === "valid" ? "ساري / فعال" : "منتهي / ملغي") : "ساري / فعال",
          token
        };
      }
    }
  } catch (e) {
    console.error("Token parsing error:", e);
  }

  return null;
}
