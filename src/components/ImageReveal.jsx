import Media from './Media';

/**
 * Media with a clip-path reveal (inset 100% → 0) and a subtle image scale (1.08 → 1),
 * driven by useReveal() in the parent section. Use for key editorial images only.
 */
export default function ImageReveal(props) {
  return <Media data-reveal="image" {...props} />;
}
