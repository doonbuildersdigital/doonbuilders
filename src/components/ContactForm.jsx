import { useRef, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { company } from '@/data/company';
import { contactProjectTypes } from '@/data/capabilities';
import {
  submitContact,
  validateContact,
  ContactNotConfiguredError,
} from '@/services/contactService';

const initialValues = {
  name: '',
  company: '',
  phone: '',
  email: '',
  projectType: '',
  projectLocation: '',
  message: '',
};

const fieldOrder = ['name', 'phone', 'email', 'message'];

const inputClass =
  'mt-2.5 block w-full rounded-xl border bg-paper px-4 py-3 text-base text-ink placeholder:text-steel/70 transition-all duration-300 focus:border-brand focus:bg-surface focus:shadow-[0_0_0_4px_rgba(200,16,46,0.1)] focus:outline-none focus-visible:outline-none';

function Field({ id, label, required, error, children, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="meta-label flex gap-1">
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="text-brand">
              *
            </span>
            <span className="sr-only">(required)</span>
          </>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-[13px] text-brand" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Enquiry form with in-browser validation. Sending is handled by src/services/contactService.js,
 * which is switched on with VITE_CONTACT_PROVIDER in .env (see README → Contact form).
 */
export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error | unconfigured
  const formRef = useRef(null);

  const update = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const fieldProps = (name) => ({
    id: `contact-${name}`,
    name,
    value: values[name],
    onChange: update,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
    className: `${inputClass} ${errors[name] ? 'border-brand' : 'border-line'}`,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (form.get('bot-field')) return; // honeypot

    const found = validateContact(values);
    setErrors(found);
    const firstInvalid = fieldOrder.find((key) => found[key]);
    if (firstInvalid) {
      formRef.current.querySelector(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus('submitting');
    try {
      await submitContact(values);
      setStatus('success');
      setValues(initialValues);
    } catch (err) {
      setStatus(err instanceof ContactNotConfiguredError ? 'unconfigured' : 'error');
    }
  };

  if (status === 'success') {
    return (
      <div className="border-t-2 border-brand pt-10" role="status">
        <p className="eyebrow">Enquiry received</p>
        <h2 className="mt-6 text-3xl font-bold leading-tight tracking-[-0.02em] md:text-4xl">
          Thank you. We will be in touch.
        </h2>
        <p className="lead mt-6">
          Your project details have been sent to our team. For anything urgent, call {company.phone}.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="link-underline mt-8 text-[12px] font-semibold uppercase tracking-[0.14em]"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-x-6 gap-y-6 md:grid-cols-2">
      <p className="hidden" aria-hidden="true">
        <label>
          Leave this field empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <Field id="contact-name" label="Name" required error={errors.name}>
        <input type="text" autoComplete="name" {...fieldProps('name')} />
      </Field>
      <Field id="contact-company" label="Company">
        <input type="text" autoComplete="organization" {...fieldProps('company')} />
      </Field>
      <Field id="contact-phone" label="Phone" required error={errors.phone}>
        <input type="tel" inputMode="tel" autoComplete="tel" {...fieldProps('phone')} />
      </Field>
      <Field id="contact-email" label="Email" required error={errors.email}>
        <input type="email" autoComplete="email" {...fieldProps('email')} />
      </Field>
      <Field id="contact-projectType" label="Project Type">
        <div className="relative">
          <select {...fieldProps('projectType')} className={`${fieldProps('projectType').className} appearance-none pr-8`}>
            <option value="">Select a project type</option>
            {contactProjectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden="true"
            strokeWidth={1.5}
            className="pointer-events-none absolute right-4 top-[calc(50%+5px)] h-4 w-4 -translate-y-1/2 text-steel-dark"
          />
        </div>
      </Field>
      <Field id="contact-projectLocation" label="Project Location">
        <input type="text" autoComplete="off" {...fieldProps('projectLocation')} />
      </Field>
      <Field id="contact-message" label="Tell us about your project" error={errors.message} className="md:col-span-2">
        <textarea rows={5} {...fieldProps('message')} className={`${fieldProps('message').className} resize-y`} />
      </Field>

      <div className="flex flex-col gap-6 md:col-span-2 md:flex-row md:items-center md:justify-between">
        <p className="text-[13px] text-steel-dark">
          Fields marked <span className="text-brand">*</span> are required.
        </p>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="group/btn inline-flex h-14 items-center justify-center gap-3 rounded-full bg-brand px-8 text-[15px] font-semibold text-white shadow-brand transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-deep active:scale-[0.97] disabled:opacity-60 md:px-10"
        >
          {status === 'submitting' ? 'Sending…' : 'Start a Conversation'}
          <ArrowRight
            aria-hidden="true"
            strokeWidth={1.75}
            className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        </button>
      </div>

      <div aria-live="polite" className="md:col-span-2">
        {status === 'unconfigured' && (
          <div className="rounded-xl border-l-4 border-brand bg-brand/[0.05] p-5 text-[15px] leading-relaxed text-ink">
            {import.meta.env.DEV ? (
              <p>
                <strong>Development notice:</strong> the form is validated but no submission service is configured, so
                nothing was sent. Set <code>VITE_CONTACT_PROVIDER</code> in <code>.env</code> (see README).
              </p>
            ) : (
              <p>
                Online enquiries are not connected yet, so your message was not sent. Please call{' '}
                <a href={company.phoneHref} className="font-semibold underline">
                  {company.phone}
                </a>{' '}
                or email{' '}
                <a href={company.emailHref} className="font-semibold underline">
                  {company.email}
                </a>
                .
              </p>
            )}
          </div>
        )}
        {status === 'error' && (
          <div className="rounded-xl border-l-4 border-brand bg-brand/[0.05] p-5 text-[15px] leading-relaxed text-ink" role="alert">
            We could not send your enquiry. Please try again, or call{' '}
            <a href={company.phoneHref} className="font-semibold underline">
              {company.phone}
            </a>
            .
          </div>
        )}
      </div>
    </form>
  );
}
