/**
 * Renders text as masked lines for the architectural "rise from below" reveal.
 * `lines` is a string or an array of strings/nodes; each item becomes one line.
 */
export default function MaskLines({
  lines,
  as: Tag = 'span',
  className = '',
  lineClassName = '',
  reveal = true,
  ...rest
}) {
  const list = Array.isArray(lines) ? lines : [lines];
  return (
    <Tag className={className} data-reveal={reveal ? 'lines' : undefined} {...rest}>
      {list.map((line, i) => (
        <span key={i} className="line-mask">
          <span className={`line-inner ${lineClassName}`}>
            {line}{' '}
          </span>
        </span>
      ))}
    </Tag>
  );
}
