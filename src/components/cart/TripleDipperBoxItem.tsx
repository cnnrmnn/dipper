import { useState } from 'react';
import BoxItem from './BoxItem';
import TripleDipperBoxItemButton from './TripleDipperBoxItemButton';
import { ItemValue, ExtraValue } from '../../api/value';
import { ItemInput } from '../../api/cart';
import * as styles from './TripleDipperBoxItem.css';

type Props = {
  itemValue: ItemValue;
  itemInput: ItemInput;
  removeItemInput(): void;
};

export default function TripleDipperBoxItem({
  itemValue,
  itemInput,
  removeItemInput,
}: Props): JSX.Element {
  const [inProp, setInProp] = useState(true);
  function getExtraValue(valueId: number): ExtraValue {
    return itemValue.extras.find(
      (extraValue) => extraValue.valueId === valueId
    ) as ExtraValue;
  }
  return (
    <BoxItem inProp={inProp} onExited={removeItemInput}>
      <div className={styles.content}>
        <img
          className={styles.image}
          src={process.env.SERVER_URL + itemValue.imagePath}
        />
        <div className={styles.text}>
          <h3 className={styles.heading}>{itemValue.value}</h3>
          <p className={styles.description}>
            {getExtraValue(itemInput.extras[0]).value}
          </p>
        </div>
      </div>
      <TripleDipperBoxItemButton removeItemInput={() => setInProp(false)} />
    </BoxItem>
  );
}
