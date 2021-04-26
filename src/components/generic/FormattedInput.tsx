import { useRef } from 'react';
import styles from './Input.css';

type Props = {
  maxLength?: number;
  placeholder?: string;
  type?: string;
  value: string;
  setValue(value: string): void;
  format(value: string): string;
  cursorPosition?(length: number): number;
  validKey?(key: string): boolean;
};

export default function FormattedInput({
  maxLength,
  placeholder,
  value,
  type,
  setValue,
  format,
  cursorPosition,
  validKey,
}: Props): JSX.Element {
  const elt = useRef<HTMLInputElement>(null);
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    const { key } = event;
    if (key !== 'Escape' && key !== 'Enter') event.preventDefault();
    let newValue = value;
    if (
      (!validKey || validKey(key)) &&
      (!maxLength || value.length < maxLength)
    )
      newValue = value + key;
    if (key == 'Backspace') newValue = value.substring(0, value.length - 1);

    setValue(newValue);
    if (elt.current) {
      elt.current.value = format(newValue);
      if (cursorPosition) {
        const pos = cursorPosition(newValue.length);
        elt.current.setSelectionRange(pos, pos);
      }
    }
  }
  return (
    <input
      className={styles.input}
      type={type || 'text'}
      placeholder={placeholder}
      onKeyDown={handleKeyDown}
      ref={elt}
    />
  );
}
