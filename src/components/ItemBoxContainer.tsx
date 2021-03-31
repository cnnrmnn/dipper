import { ItemInput } from '../api/cart';
import { Item } from '../api/item';
import ItemBox from './ItemBox';
import './ItemBoxContainer.css';

type Props = {
  items: Item[];
  addItemInput(itemInput: ItemInput): void;
  disabled: boolean;
};
export default function ItemBoxContainer({
  items,
  addItemInput,
  disabled,
}: Props): JSX.Element {
  return (
    <div className="item-box-container">
      {items.map((item) => (
        <ItemBox
          key={item.valueId}
          item={item}
          addItemInput={addItemInput}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
