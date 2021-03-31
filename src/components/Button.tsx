import './Button.css';

type Props = {
  text: string;
  disabled: boolean;
  handleClick(event: React.MouseEvent<HTMLButtonElement>): void;
};
export default function Button({
  text,
  disabled,
  handleClick,
}: Props): JSX.Element {
  return (
    <button className="button" disabled={disabled} onClick={handleClick}>
      {text}
    </button>
  );
}
