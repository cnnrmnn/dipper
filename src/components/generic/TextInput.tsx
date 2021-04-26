import styles from './Input.css';

type Props = {
  value: string;
  setValue(value: string): void;
  placeholder?: string;
  maxLength?: number;
  pattern?: RegExp;
};

export default function TextInput({
  value,
  setValue,
  placeholder,
  maxLength,
  pattern,
}: Props): JSX.Element {
  function handleChange(event: React.FormEvent<HTMLInputElement>): void {
    if (!pattern || pattern.test(event.currentTarget.value))
      setValue(event.currentTarget.value);
  }
  return (
    <input
      className={styles.input}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      maxLength={maxLength}
    />
  );
}
