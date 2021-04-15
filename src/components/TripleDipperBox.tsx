import TripleDipperBoxItem from './TripleDipperBoxItem';
import Button from './Button';
import { ItemValue } from '../api/value';
import { ItemInput } from '../api/cart';
import { header, heading, subheading, buttons } from './TripleDipperBox.css';
import Box from './Box';

type Props = {
  itemValues: ItemValue[];
  itemInputs: ItemInput[];
  setItemInputs(itemsInputs: ItemInput[]): void;
  removeItemInput(index: number): void;
  addToCart(): void;
};
export default function TripleDipperBox({
  itemValues,
  itemInputs,
  setItemInputs,
  removeItemInput,
  addToCart,
}: Props): JSX.Element {
  function getItemValue(valueId: number): ItemValue {
    // Assume that an item will be found. If not, something else is seriously
    // broken. Type would be Item | undefined if not for type assertion.
    return itemValues.find(
      (itemValue) => itemValue.valueId == valueId
    ) as ItemValue;
  }
  return (
    <Box>
      <div className={header}>
        <h2 className={heading}>Triple Dipper</h2>
        <p className={subheading}>Choose any 3 items</p>
      </div>
      <>
        {itemInputs.map((itemInput, i) => (
          <TripleDipperBoxItem
            key={i}
            itemValue={getItemValue(itemInput.valueId)}
            itemInput={itemInput}
            removeItemInput={() => removeItemInput(i)}
          />
        ))}
      </>
      <div className={buttons}>
        <Button
          fontSize="0.8rem"
          text="Clear"
          disabled={itemInputs.length === 0}
          handleClick={() => setItemInputs([])}
        />
        <Button
          fontSize="0.8rem"
          text="Add to cart"
          disabled={itemInputs.length !== 3}
          handleClick={addToCart}
        />
      </div>
    </Box>
  );
}
