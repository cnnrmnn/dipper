import { button } from './Button.css';

type Props = {
  text: string;
  disabled: boolean;
  fontSize: string;
  handleClick(event: React.MouseEvent<HTMLButtonElement>): void;
};
export default function Button({
  text,
  disabled,
  fontSize,
  handleClick,
}: Props): JSX.Element {
  return (
    <button
      className={button}
      style={{ fontSize }}
      disabled={disabled}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}
