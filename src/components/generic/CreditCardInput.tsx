import { useRef } from 'react';
import styles from './Input.css';

type Props = {
  value: string;
  setValue(value: string): void;
};

export default function CreditCardInput({
  value,
  setValue,
}: Props): JSX.Element {
  function format(num: string): string {
    const len = num.length;
    let formatted = num.substring(0, 4);
    if (len >= 4) formatted += ' ' + num.substring(4, 8);
    if (len >= 8) formatted += ' ' + num.substring(8, 12);
    if (len >= 12) formatted += ' ' + num.substring(12, 16);

    return formatted;
  }
  function cursorPosition(length: number): number {
    return length + 1 + Math.floor(length / 4);
  }

  const elt = useRef<HTMLInputElement>(null);
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    const key = event.key;
    if (key !== 'Escape' && key !== 'Enter') event.preventDefault();
    let newValue = value;
    if (key >= '0' && key <= '9' && value.length < 16) newValue = value + key;
    if (key == 'Backspace') newValue = value.substring(0, value.length - 1);

    setValue(newValue);
    if (elt.current) {
      elt.current.value = format(newValue);
      const pos = cursorPosition(newValue.length);
      elt.current.setSelectionRange(pos, pos);
    }
  }
  return (
    <input
      className={styles.input}
      type="text"
      placeholder="Card number"
      onKeyDown={handleKeyDown}
      ref={elt}
    />
  );
}
