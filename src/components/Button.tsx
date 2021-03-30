import './Button.css';

type Props = {
  text: string;
  handleClick(event: React.MouseEvent<HTMLButtonElement>): void;
};
export default function Button({ text, handleClick }: Props): JSX.Element {
  return (
    <button className="button" onClick={handleClick}>
      {text}
    </button>
  );
}
