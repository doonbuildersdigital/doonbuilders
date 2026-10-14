import { prefersReducedMotion } from './gsap';

const KEY = 'db-intro-seen';
let active = null;

/** Whether the short branded intro plays — first visit per session, motion allowed. */
export function introIsActive() {
  if (active === null) {
    try {
      active = !prefersReducedMotion() && !sessionStorage.getItem(KEY);
    } catch {
      active = false;
    }
  }
  return active;
}

export function completeIntro() {
  active = false;
  try {
    sessionStorage.setItem(KEY, '1');
  } catch {
    /* storage unavailable — intro simply plays again next time */
  }
}

/** Seconds the intro occupies before page content should begin animating. */
export const INTRO_HANDOFF = 3.9;
