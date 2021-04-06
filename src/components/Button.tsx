import { button } from './Button.css';

type Props = {
  text: string;
  disabled: boolean;
  fontSize: string;
  type?: 'button' | 'submit' | 'reset';
  handleClick?(event: React.MouseEvent<HTMLButtonElement>): void;
};
export default function Button({
  type,
  text,
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
      {text}
    </button>
  );
}
