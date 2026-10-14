import { useEffect } from 'react';
import { company } from '@/data/company';

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!href) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Sets page title, description, canonical, Open Graph and Twitter tags.
 * Canonical/og:url are emitted only when VITE_SITE_URL is configured.
 */
export default function Seo({ title, description, path = '', image = '/og/og-default.jpg', noindex = false }) {
  useEffect(() => {
    document.title = title;
    const url = company.siteUrl ? `${company.siteUrl}${path}` : '';
    const imageUrl = company.siteUrl && image.startsWith('/') ? `${company.siteUrl}${image}` : image;

    setMeta('name', 'description', description);
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow');
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', imageUrl);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', imageUrl);
    if (url) setMeta('property', 'og:url', url);
    setCanonical(url);
  }, [title, description, path, image, noindex]);

  return null;
}
