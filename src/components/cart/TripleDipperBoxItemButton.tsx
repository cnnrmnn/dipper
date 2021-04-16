import { button } from './TripleDipperBoxItemButton.css';

type Props = {
  removeItemInput(): void;
};

export default function TripleDipperBoxItemButton({
  removeItemInput,
}: Props): JSX.Element {
  return <button className={button} onClick={removeItemInput} />;
}
