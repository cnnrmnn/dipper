import TripleDipperBoxItem from './TripleDipperBoxItem';
import { ItemValue } from '../../api/value';
import { ItemInput } from '../../api/cart';
import Box from './Box';
import Button from '../generic/Button';
import styles from './TripleDipperBox.css';

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
      <div className={styles.header}>
        <h2 className={styles.heading}>Triple Dipper</h2>
        <p className={styles.subheading}>Choose any 3 items</p>
      </div>
      <>
        {itemInputs.map((itemInput) => (
          <TripleDipperBoxItem
            key={itemInput.id}
            itemValue={getItemValue(itemInput.valueId)}
            itemInput={itemInput}
            removeItemInput={() => removeItemInput(itemInput.id as number)}
          />
        ))}
      </>
      <div className={styles.buttons}>
        <Button
          fontSize="0.8rem"
          text="Clear"
          disabled={itemInputs.length === 0}
          onClick={() => setItemInputs([])}
        />
        <Button
          fontSize="0.8rem"
          text="Add to cart"
          disabled={itemInputs.length !== 3}
          onClick={addToCart}
        />
      </div>
    </Box>
  );
}
