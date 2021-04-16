import { TripleDipper } from '../../api/cart';
import Box from './Box';
import Button from '../generic/Button';
import { header, heading } from './CartBox.css';
import CartBoxItem from './CartBoxItem';

type Props = {
  cart: TripleDipper[];
  removeFromCart(tripleDipperId: number): Promise<void>;
};

export default function CartBox({ cart, removeFromCart }: Props): JSX.Element {
  return (
    <Box>
      <div className={header}>
        <h2 className={heading}>Cart</h2>
        <Button
          text="Check out"
          disabled={cart.length === 0}
          fontSize="0.85rem"
        />
      </div>
      <>
        {cart.map((tripleDipper) => (
          <CartBoxItem
            tripleDipper={tripleDipper}
            key={tripleDipper.id}
            removeFromCart={() => removeFromCart(tripleDipper.id)}
          />
        ))}
      </>
    </Box>
  );
}
