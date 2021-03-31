import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import TripleDipperBoxItemButton from './TripleDipperBoxItemButton';
import { Extra, Item } from '../api/item';
import { ItemInput } from '../api/cart';
import * as styles from './TripleDipperBoxItem.css';

type Props = {
  item: Item;
  itemInput: ItemInput;
  removeItemInput(): void;
};

export default function TripleDipperBoxItem({
  item,
  itemInput,
  removeItemInput,
}: Props): JSX.Element {
  const [inProp, setInProp] = useState(true);
  function getExtra(valueId: number): Extra {
    return item.extras.find((extra) => extra.valueId === valueId) as Extra;
  }
  return (
    <CSSTransition
      in={inProp}
      appear={true}
      timeout={500}
      classNames={{
        appear: styles.itemAppear,
        appearActive: styles.itemAppearActive,
        exitActive: styles.itemExitActive,
      }}
      onExited={removeItemInput}
    >
      <div className={styles.item}>
        <div className={styles.content}>
          <img
            className={styles.image}
            src={process.env.SERVER_URL + item.imagePath}
          />
          <div className={styles.text}>
            <h3 className={styles.heading}>{item.value}</h3>
            <p className={styles.description}>
              {getExtra(itemInput.extras[0]).value}
            </p>
          </div>
        </div>
        <TripleDipperBoxItemButton removeItemInput={() => setInProp(false)} />
      </div>
    </CSSTransition>
  );
}
