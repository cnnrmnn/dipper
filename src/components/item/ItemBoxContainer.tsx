import ItemBox from './ItemBox';
import { ItemInput } from '../../api/cart';
import { ItemValue } from '../../api/value';
import styles from './ItemBoxContainer.css';

type Props = {
  itemValues: ItemValue[];
  addItemInput(itemInput: ItemInput): void;
  disabled: boolean;
};

export default function ItemBoxContainer({
  itemValues,
  addItemInput,
  disabled,
}: Props): JSX.Element {
  return (
    <div className={styles.container}>
      {itemValues.map((itemValue) => (
        <ItemBox
          key={itemValue.valueId}
          itemValue={itemValue}
          addItemInput={addItemInput}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
