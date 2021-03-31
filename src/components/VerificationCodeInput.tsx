import { input } from './VerificationCodeInput.css';

type Props = {
  value: string;
  setValue(value: string): void;
};

export default function VerificationCodeInput({
  value,
  setValue,
}: Props): JSX.Element {
  function handleChange(event: React.FormEvent<HTMLInputElement>): void {
    if (/^[0-9]*$/.test(event.currentTarget.value))
      setValue(event.currentTarget.value);
  }
  return (
    <input
      className={input}
      type="text"
      maxLength={6}
      value={value}
      onChange={handleChange}
    />
  );
}
