import { Fragment } from 'react';

/**
 * Display heading whose words lift out of their own mask, one after the next.
 *
 * This is the FAQ hero's entrance generalised so every page opens the same way.
 * Each word sits in an `overflow: hidden` box and slides up from below it; the
 * masking is what makes the movement read as typography rather than a fade.
 * Styling lives in `src/App.css` (`.atmos-word`); reduced-motion is handled
 * there too.
 *
 * `lines` is an array of lines. A line may be a plain string (split on spaces)
 * or an array of items, where each item is a word or `{ word, className, as }`
 * for words that need their own colour or emphasis — `as: 'em'` keeps the
 * semantics of emphasised text while the word still rides up out of its mask.
 *
 * @param {object} props
 * @param {import('react').ElementType} [props.as]  Tag to render (default h1).
 * @param {string} [props.className]                Class for the heading itself.
 * @param {Array} props.lines                       Lines of words, see above.
 * @param {number} [props.step]                     Per-word stagger in ms.
 * @param {number} [props.delay]                    Extra delay before word one.
 * @param {import('react').ReactNode} [props.trailing]  Node appended after the
 *                                                  final word (e.g. a period).
 */
const RisingHeading = ({
  as: Tag = 'h1',
  className = '',
  lines,
  step = 70,
  delay = 0,
  trailing = null,
}) => {
  // Words are split up front so each one knows its position across the whole
  // heading, not just its own line — the cascade has to read as one gesture.
  const splitLines = lines.map((line) =>
    typeof line === 'string'
      ? line.split(/\s+/).filter(Boolean).map((word) => ({ word }))
      : line.map((item) => (typeof item === 'string' ? { word: item } : item)),
  );

  const lineOffsets = splitLines.reduce(
    (acc, words) => [...acc, acc[acc.length - 1] + words.length],
    [0],
  );

  return (
    <Tag className={className}>
      {splitLines.map((words, li) => {
        return (
          <span className="atmos-word-line" key={li}>
            {words.map(({ word, className: wordClass, as: Inner = 'span' }, wi) => {
              const d = delay + (lineOffsets[li] + wi) * step;

              return (
                <Fragment key={`${li}-${wi}-${word}`}>
                  {wi > 0 && ' '}
                  <span
                    className={`atmos-word${wordClass ? ` ${wordClass}` : ''}`}
                    style={{ '--d': `${d}ms` }}
                  >
                    <Inner>{word}</Inner>
                  </span>
                </Fragment>
              );
            })}
            {trailing && li === splitLines.length - 1 && trailing}
          </span>
        );
      })}
    </Tag>
  );
};

export default RisingHeading;
