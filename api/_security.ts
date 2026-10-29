import crypto from 'node:crypto';

// Server-side secret for HMAC session signing
const SESSION_SECRET = process.env.SESSION_SECRET || 'skumar-gallery-secure-session-key-2025';

// Master administrator password (configurable via environment variable)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Skumar@Admin2025!';

// In-memory rate-limiter tracker for failed login attempts
interface RateLimitRecord {
  failedAttempts: number;
  lastAttempt: number;
  lockedUntil?: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

// Clean up stale rate-limit records every 30 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now - record.lastAttempt > 30 * 60 * 1000) {
      rateLimitMap.delete(ip);
    }
  }
}, 30 * 60 * 1000);

export function getClientIp(req: any): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || '127.0.0.1';
}

export function checkRateLimit(ip: string): { allowed: boolean; remainingLockSeconds?: number } {
  const record = rateLimitMap.get(ip);
  if (!record) return { allowed: true };

  const now = Date.now();
  if (record.lockedUntil && now < record.lockedUntil) {
    const remainingLockSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    return { allowed: false, remainingLockSeconds };
  }

  // If lockout expired, reset
  if (record.lockedUntil && now >= record.lockedUntil) {
    rateLimitMap.delete(ip);
    return { allowed: true };
  }

  return { allowed: true };
}

export function recordFailedAttempt(ip: string): { locked: boolean; attemptsLeft: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip) || { failedAttempts: 0, lastAttempt: now };

  record.failedAttempts += 1;
  record.lastAttempt = now;

  // Max 5 failed attempts allowed before a 15-minute lockout
  if (record.failedAttempts >= 5) {
    record.lockedUntil = now + 15 * 60 * 1000;
    rateLimitMap.set(ip, record);
    return { locked: true, attemptsLeft: 0 };
  }

  rateLimitMap.set(ip, record);
  return { locked: false, attemptsLeft: 5 - record.failedAttempts };
}

export function resetRateLimit(ip: string) {
  rateLimitMap.delete(ip);
}

export function verifyPassword(inputPassword: string): boolean {
  if (!inputPassword || typeof inputPassword !== 'string') return false;
  // Constant-time comparison to prevent timing attacks
  const inputHash = crypto.createHash('sha256').update(inputPassword).digest();
  const actualHash = crypto.createHash('sha256').update(ADMIN_PASSWORD).digest();
  return crypto.timingSafeEqual(inputHash, actualHash);
}

export function createSessionToken(userId: string = 'admin'): string {
  const payloadData = {
    sub: userId,
    iat: Date.now()
  };
  const payloadBase64 = Buffer.from(JSON.stringify(payloadData)).toString('base64url');
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(payloadBase64).digest('base64url');
  return `${payloadBase64}.${signature}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token || typeof token !== 'string' || !token.includes('.')) return false;
  const [payloadBase64, signature] = token.split('.');
  if (!payloadBase64 || !signature) return false;

  const expectedSignature = crypto.createHmac('sha256', SESSION_SECRET).update(payloadBase64).digest('base64url');
  if (signature !== expectedSignature) return false;

  try {
    const payload = JSON.parse(Buffer.from(payloadBase64, 'base64url').toString('utf8'));
    // Expire session after 4 hours
    const maxAgeMs = 4 * 60 * 60 * 1000;
    if (Date.now() - payload.iat > maxAgeMs) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function parseCookies(req: any): Record<string, string> {
  const list: Record<string, string> = {};
  const header = req.headers?.cookie;
  if (!header) return list;

  header.split(';').forEach((item: string) => {
    const [name, ...val] = item.trim().split('=');
    if (name) {
      list[name] = decodeURIComponent(val.join('='));
    }
  });

  return list;
}

export function setSessionCookie(res: any, token: string) {
  const isProd = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
  // Max-Age = 4 hours (14400 seconds)
  const cookieStr = `gallery_session=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=14400${
    isProd ? '; Secure' : ''
  }`;
  res.setHeader('Set-Cookie', cookieStr);
}

export function clearSessionCookie(res: any) {
  const isProd = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
  const cookieStr = `gallery_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${
    isProd ? '; Secure' : ''
  }`;
  res.setHeader('Set-Cookie', cookieStr);
}

export function normalizeResponse(res: any) {
  if (!res.status) {
    res.status = function (code: number) {
      this.statusCode = code;
      return this;
    };
  }
  if (!res.json) {
    res.json = function (data: any) {
      this.setHeader('Content-Type', 'application/json');
      this.end(JSON.stringify(data));
      return this;
    };
  }
}

export async function parseJsonBody(req: any): Promise<any> {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk: any) => {
      data += chunk;
    });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        resolve({});
      }
    });
  });
}
