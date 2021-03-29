import './ItemBoxButton.css';

type Props = {
  addItem(): void;
};

export function ItemBoxButton({ addItem }: Props): JSX.Element {
  return (
    <button className="item-box-button" onClick={addItem}>
      +
    </button>
  );
}
