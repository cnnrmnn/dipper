import styles from './Select.css';

type Props = {
  children: JSX.Element[];
  setValue(value: string): void;
  disabled: boolean;
};

export default function Select({
  children,
  setValue,
  disabled,
}: Props): JSX.Element {
  function handleChange(event: React.FormEvent<HTMLSelectElement>): void {
    setValue(event.currentTarget.value);
  }
  return (
    <select
      className={styles.select}
      onChange={handleChange}
      disabled={disabled}
    >
      {children}
    </select>
  );
}
