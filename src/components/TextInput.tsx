import { input } from './TextInput.css';

type Props = {
  value: string;
  setValue(value: string): void;
};

export default function TextInput({ value, setValue }: Props): JSX.Element {
  function handleChange(event: React.FormEvent<HTMLInputElement>): void {
    setValue(event.currentTarget.value);
  }
  return (
    <input
      className={input}
      type="text"
      value={value}
      onChange={handleChange}
    />
  );
}
