import {
  getClientIp,
  checkRateLimit,
  recordFailedAttempt,
  resetRateLimit,
  verifyPassword,
  createSessionToken,
  verifySessionToken,
  parseCookies,
  setSessionCookie,
  clearSessionCookie,
  parseJsonBody,
  normalizeResponse
} from './_security.js';

export default async function handler(req: any, res: any) {
  normalizeResponse(res);
  // Set JSON content type header
  res.setHeader('Content-Type', 'application/json');

  const method = req.method?.toUpperCase();
  const cookies = parseCookies(req);
  const sessionToken = cookies['gallery_session'];
  const ip = getClientIp(req);

  // 1. Session status check (GET)
  if (method === 'GET') {
    const isValid = verifySessionToken(sessionToken);
    return res.status(200).json({
      authenticated: isValid
    });
  }

  // 2. Logout (DELETE or POST with action="logout")
  if (method === 'DELETE') {
    clearSessionCookie(res);
    return res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  }

  // 3. Login or action (POST)
  if (method === 'POST') {
    const body = await parseJsonBody(req);

    if (body.action === 'logout') {
      clearSessionCookie(res);
      return res.status(200).json({
        success: true,
        message: 'Logged out successfully'
      });
    }

    // Rate-limiting check against repeated brute-force attacks
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return res.status(429).json({
        success: false,
        error: `Too many failed login attempts. Please wait ${rateCheck.remainingLockSeconds} seconds before trying again.`
      });
    }

    const { password } = body;
    if (!password || typeof password !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Password is required'
      });
    }

    const isMatch = verifyPassword(password);
    if (!isMatch) {
      const attemptResult = recordFailedAttempt(ip);
      if (attemptResult.locked) {
        return res.status(429).json({
          success: false,
          error: 'Too many failed login attempts. Account temporarily locked for 15 minutes.'
        });
      }
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials. Please verify your password and try again.',
        attemptsLeft: attemptResult.attemptsLeft
      });
    }

    // Login succeeded: reset rate limit counter and issue session
    resetRateLimit(ip);
    const token = createSessionToken('admin');
    setSessionCookie(res, token);

    return res.status(200).json({
      success: true,
      message: 'Authenticated successfully'
    });
  }

  // Method not allowed
  res.setHeader('Allow', 'GET, POST, DELETE');
  return res.status(405).json({
    success: false,
    error: 'Method Not Allowed'
  });
}
