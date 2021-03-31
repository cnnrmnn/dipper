import { button } from './ItemBoxButton.css';

type Props = {
  addItem(): void;
  disabled: boolean;
};

export default function ItemBoxButton({
  addItem,
  disabled,
}: Props): JSX.Element {
  return (
    <button className={button} onClick={addItem} disabled={disabled}></button>
  );
}
