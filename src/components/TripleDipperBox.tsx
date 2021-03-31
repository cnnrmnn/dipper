import TripleDipperBoxItem from './TripleDipperBoxItem';
import Button from './Button';
import { Item } from '../api/item';
import { ItemInput } from '../api/cart';
import {
  box,
  header,
  heading,
  subheading,
  buttons,
} from './TripleDipperBox.css';

type Props = {
  items: Item[];
  itemInputs: ItemInput[];
  setItemInputs(itemsInputs: ItemInput[]): void;
  removeItemInput(index: number): void;
};
export default function TripleDipperBox({
  items,
  itemInputs,
  setItemInputs,
  removeItemInput,
}: Props): JSX.Element {
  function getItem(valueId: number): Item {
    // Assume that an item will be found. If not, something else is seriously
    // broken. Type would be Item | undefined if not for type assertion.
    return items.find((item) => item.valueId == valueId) as Item;
  }
  return (
    <div className={box}>
      <div className={header}>
        <h2 className={heading}>Triple Dipper</h2>
        <p className={subheading}>Choose any 3 items</p>
      </div>
      {itemInputs.map((itemInput, i) => (
        <TripleDipperBoxItem
          key={i}
          item={getItem(itemInput.valueId)}
          itemInput={itemInput}
          removeItemInput={() => removeItemInput(i)}
        />
      ))}
      <div className={buttons}>
        <Button
          text="Clear"
          disabled={itemInputs.length === 0}
          handleClick={() => setItemInputs([])}
        />
        <Button
          text="Add to cart"
          disabled={itemInputs.length !== 3}
          handleClick={() => null}
        />
      </div>
    </div>
  );
}
