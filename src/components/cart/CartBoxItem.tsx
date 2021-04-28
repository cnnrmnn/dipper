import { useState } from 'react';
import { TripleDipper } from '../../api/cart';
import BoxItem from './BoxItem';
import SVGButton from '../generic/SVGButton';
import trash from '../../../assets/icons/trash.svg';
import styles from './CartBoxItem.css';

type Props = {
  tripleDipper: TripleDipper;
  removeFromCart(): void;
};

export default function CartBoxItem({
  tripleDipper,
  removeFromCart,
}: Props): JSX.Element {
  const [inProp, setInProp] = useState(true);
  return (
    <BoxItem inProp={inProp} onExited={removeFromCart}>
      <div className={styles.item}>
        <div>
          <h2 className={styles.heading}>Triple Dipper</h2>
          {tripleDipper.items.map((item) => (
            <div key={item.id}>
              <h3 className={styles.subheading}>{item.value}</h3>
              {item.extras.map((extra) => (
                <h4 key={extra.id} className={styles.description}>
                  {extra.value}
                </h4>
              ))}
            </div>
          ))}
        </div>
      </div>
      <SVGButton svg={trash} onClick={() => setInProp(false)} />
    </BoxItem>
  );
}
