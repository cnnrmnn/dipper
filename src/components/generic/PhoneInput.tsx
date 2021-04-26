import FormattedInput from './FormattedInput';

type Props = {
  value: string;
  setValue(value: string): void;
};

export default function PhoneInput({ value, setValue }: Props): JSX.Element {
  function format(phone: string): string {
    const len = phone.length;
    let formatted = '';
    if (len >= 1) formatted += `(${phone.substring(0, 3)})`;
    if (len >= 4) formatted += ` ${phone.substring(3, 6)}`;
    if (len >= 7) formatted += `-${phone.substring(6, len)}`;

    return formatted;
  }
  function cursorPosition(length: number): number {
    if (length <= 3) return length + 1;
    if (length >= 4 && length <= 6) return length + 3;
    if (length >= 7 && length <= 10) return length + 4;
    return length;
  }

  function validKey(key: string): boolean {
    return key >= '0' && key <= '9';
  }

  return (
    <FormattedInput
      value={value}
      setValue={setValue}
      type="tel"
      placeholder="Phone"
      maxLength={10}
      format={format}
      cursorPosition={cursorPosition}
      validKey={validKey}
    />
  );
}
