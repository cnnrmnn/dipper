import './Select.css';

type Props = {
  children: JSX.Element[];
  setValue(value: string): void;
};

export function Select({ children, setValue }: Props): JSX.Element {
  function handleChange(event: React.FormEvent<HTMLSelectElement>): void {
    setValue(event.currentTarget.value);
  }
  return (
    <select className="select" onChange={handleChange}>
      {children}
    </select>
  );
}
