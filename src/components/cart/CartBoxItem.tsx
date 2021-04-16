import { useState } from 'react';
import { TripleDipper } from '../../api/cart';
import CartBoxItemButton from './CartBoxItemButton';
import BoxItem from './BoxItem';
import { item, heading, subheading, description } from './CartBoxItem.css';

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
      <div className={item}>
        <div>
          <h2 className={heading}>Triple Dipper</h2>
          {tripleDipper.items.map((item) => (
            <div key={item.id}>
              <h3 className={subheading}>{item.value}</h3>
              {item.extras.map((extra) => (
                <h4 key={extra.id} className={description}>
                  {extra.value}
                </h4>
              ))}
            </div>
          ))}
        </div>
      </div>
      <CartBoxItemButton removeFromCart={() => setInProp(false)} />
    </BoxItem>
  );
}
