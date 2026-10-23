/**
 * S Kumar Construction & Interior — Form Submission Service
 * 
 * Integrates contact and estimator forms with Google Sheets via Google Apps Script Web App.
 * Ensures data integrity, prevents duplicates, and strictly reports success only after confirmation.
 */

export interface ContactSubmissionPayload {
  name: string;
  phone: string;
  email?: string;
  projectType: string;
  location: string;
  budget: string;
  message?: string;
  website_hp?: string; // honeypot
}

export interface EstimatorSubmissionPayload {
  name: string;
  phone: string;
  lookingFor: string;
  propertyType: string;
  areaSqFt: string;
  location?: string;
  budget: string;
  notes?: string;
  website_hp?: string; // honeypot
}

export interface SubmissionResponse {
  success: boolean;
  message: string;
  timestamp?: string;
}

const getScriptUrl = (): string => {
  return (import.meta.env.VITE_GOOGLE_SCRIPT_URL || '').trim();
};

/**
 * Submits the main Contact Page inquiry form to Google Sheets
 */
export async function submitContactForm(
  data: ContactSubmissionPayload
): Promise<SubmissionResponse> {
  const scriptUrl = getScriptUrl();

  if (!scriptUrl) {
    throw new Error(
      'Google Sheets integration URL is not configured. Please set VITE_GOOGLE_SCRIPT_URL in your .env configuration.'
    );
  }

  // Client-side guard for required fields
  if (!data.name.trim() || !data.phone.trim()) {
    throw new Error('Please enter your full name and phone number.');
  }

  const payload = {
    formType: 'contact',
    submissionId: `CN-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: data.name.trim(),
    phone: data.phone.trim(),
    email: (data.email || '').trim(),
    projectType: data.projectType,
    location: data.location,
    budget: data.budget,
    message: (data.message || '').trim(),
    website_hp: data.website_hp || '',
  };

  return sendToGoogleScript(scriptUrl, payload);
}

/**
 * Submits the Project Estimator modal form to Google Sheets
 */
export async function submitEstimatorForm(
  data: EstimatorSubmissionPayload
): Promise<SubmissionResponse> {
  const scriptUrl = getScriptUrl();

  if (!scriptUrl) {
    throw new Error(
      'Google Sheets integration URL is not configured. Please set VITE_GOOGLE_SCRIPT_URL in your .env configuration.'
    );
  }

  // Client-side guard for required fields
  if (!data.name.trim() || !data.phone.trim()) {
    throw new Error('Please enter your full name and phone number.');
  }

  const payload = {
    formType: 'estimator',
    submissionId: `EST-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: data.name.trim(),
    phone: data.phone.trim(),
    lookingFor: data.lookingFor,
    propertyType: data.propertyType,
    areaSqFt: data.areaSqFt,
    location: (data.location || '').trim(),
    budget: data.budget,
    notes: (data.notes || '').trim(),
    website_hp: data.website_hp || '',
  };

  return sendToGoogleScript(scriptUrl, payload);
}

/**
 * Internal helper to send payload to Google Apps Script Web App
 * Uses text/plain to avoid CORS OPTIONS preflight failures in Google Apps Script
 */
async function sendToGoogleScript(
  url: string,
  payload: Record<string, unknown>
): Promise<SubmissionResponse> {
  let response: Response;

  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      'Network error: Unable to connect to the submission server. Please check your internet connection or contact us via WhatsApp.'
    );
  }

  if (!response.ok) {
    throw new Error(
      `Server error (${response.status}): Failed to save enquiry. Please try again or reach out on WhatsApp.`
    );
  }

  let result: { status?: string; message?: string; timestamp?: string };
  try {
    result = await response.json();
  } catch {
    throw new Error(
      'Invalid server response format. Please try again or reach out directly on WhatsApp.'
    );
  }

  if (result.status !== 'success') {
    throw new Error(
      result.message || 'The server could not record your submission. Please try again.'
    );
  }

  return {
    success: true,
    message: result.message || 'Thank you! Your enquiry has been submitted successfully.',
    timestamp: result.timestamp,
  };
}
