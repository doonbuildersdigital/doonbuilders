/**
 * Contact form submission — provider adapters.
 *
 * Configure in .env (see .env.example):
 *   VITE_CONTACT_PROVIDER = web3forms | formsubmit | netlify | custom
 *   VITE_CONTACT_FORM_KEY = <Web3Forms access key>          (web3forms)
 *   VITE_CONTACT_ENDPOINT = <https endpoint>                (formsubmit / custom)
 *
 * Only public, browser-safe keys belong here. Never put server secrets in VITE_ variables.
 * Until a provider is configured, submitContact() throws ContactNotConfiguredError and the
 * UI tells the visitor to call or email instead — it never fakes a successful submission.
 */
const env = import.meta.env;
const provider = String(env.VITE_CONTACT_PROVIDER || '').trim().toLowerCase();
const formKey = env.VITE_CONTACT_FORM_KEY || '';
const endpoint = env.VITE_CONTACT_ENDPOINT || '';

export class ContactNotConfiguredError extends Error {
  constructor() {
    super('Contact form provider is not configured.');
    this.name = 'ContactNotConfiguredError';
  }
}

export function isContactConfigured() {
  switch (provider) {
    case 'web3forms':
      return Boolean(formKey);
    case 'formsubmit':
    case 'custom':
      return Boolean(endpoint);
    case 'netlify':
      return true;
    default:
      return false;
  }
}

const subjectFor = (data) => `Project enquiry — ${data.projectType || 'General'} — ${data.name}`;

const postJson = (url, body) =>
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  });

const adapters = {
  async web3forms(data) {
    const res = await postJson('https://api.web3forms.com/submit', {
      access_key: formKey,
      subject: subjectFor(data),
      from_name: data.name,
      ...data,
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || json.success === false) throw new Error(json.message || 'Submission failed');
  },
  async formsubmit(data) {
    const res = await postJson(endpoint, { _subject: subjectFor(data), _template: 'table', ...data });
    if (!res.ok) throw new Error('Submission failed');
  },
  async netlify(data) {
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ 'form-name': 'contact', ...data }).toString(),
    });
    if (!res.ok) throw new Error('Submission failed');
  },
  async custom(data) {
    const res = await postJson(endpoint, data);
    if (!res.ok) throw new Error('Submission failed');
  },
};

export async function submitContact(data) {
  if (!isContactConfigured()) throw new ContactNotConfiguredError();
  await adapters[provider](data);
}

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';

  const digits = values.phone.replace(/\D/g, '');
  if (!values.phone.trim()) errors.phone = 'Please enter a phone number.';
  else if (digits.length < 10 || digits.length > 13) errors.phone = 'Please enter a valid phone number.';

  if (!values.email.trim()) errors.email = 'Please enter an email address.';
  else if (!EMAIL.test(values.email.trim())) errors.email = 'Please enter a valid email address.';

  if (values.message.length > 4000) errors.message = 'Please keep the message under 4000 characters.';
  return errors;
}
