import { TripleDipper } from '../api/cart';
import { item, heading, subheading, description } from './CartBoxItem.css';
import CartBoxItemButton from './CartBoxItemButton';

type Props = {
  tripleDipper: TripleDipper;
  removeFromCart(): void;
};

export default function CartBoxItem({
  tripleDipper,
  removeFromCart,
}: Props): JSX.Element {
  return (
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
      <CartBoxItemButton removeFromCart={removeFromCart} />
    </div>
  );
}
