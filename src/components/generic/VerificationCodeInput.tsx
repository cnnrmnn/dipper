import styles from './VerificationCodeInput.css';

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
      className={styles.input}
      type="text"
      placeholder="Verification code"
      maxLength={6}
      value={value}
      onChange={handleChange}
    />
  );
}
