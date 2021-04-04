import { useRef } from 'react';
import { input } from './PhoneInput.css';

type Props = {
  value: string;
  setValue(value: string): void;
};

export default function PhoneInput({ value, setValue }: Props): JSX.Element {
  function format(phone: string): string {
    const len = phone.length;
    if (len >= 1 && len <= 3) return `(${phone.substring(0, len)})`;

    if (len >= 4 && len <= 6)
      return `(${phone.substring(0, 3)}) ${phone.substring(3, len)}`;

    if (len >= 7 && len <= 10)
      return `(${phone.substring(0, 3)}) ${phone.substring(
        3,
        6
      )}–${phone.substring(6, len)}`;

    return phone;
  }
  function cursorPosition(length: number): number {
    if (length <= 3) return length + 1;
    if (length >= 4 && length <= 6) return length + 3;
    if (length >= 7 && length <= 10) return length + 4;
    return length;
  }

  const elt = useRef<HTMLInputElement>(null);
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    event.preventDefault();
    const key = event.key;
    let newValue = value;
    if (key >= '0' && key <= '9' && value.length < 10) newValue = value + key;
    if (key == 'Backspace') newValue = value.substring(0, value.length - 1);

    setValue(newValue);
    if (elt.current) {
      elt.current.value = format(newValue);
      const pos = cursorPosition(newValue.length);
      elt.current.setSelectionRange(pos, pos);
    }
  }
  return (
    <input className={input} type="tel" onKeyDown={handleKeyDown} ref={elt} />
  );
}
