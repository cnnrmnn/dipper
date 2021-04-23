import { button } from './Button.css';

type Props = {
  text: string;
  fontSize: string;
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  handleClick?(event: React.MouseEvent<HTMLButtonElement>): void;
};
export default function Button({
  type,
  text,
  loading,
  disabled,
  fontSize,
  handleClick,
}: Props): JSX.Element {
  return (
    <button
      type={type}
      className={button}
      style={{ fontSize }}
      disabled={disabled}
      onClick={handleClick}
    >
      {loading ? 'Loading...' : text}
    </button>
  );
}
