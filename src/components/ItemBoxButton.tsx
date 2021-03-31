import './ItemBoxButton.css';

type Props = {
  addItem(): void;
  disabled: boolean;
};

export function ItemBoxButton({ addItem, disabled }: Props): JSX.Element {
  return (
    <button
      className="item-box-button"
      onClick={addItem}
      disabled={disabled}
    ></button>
  );
}
