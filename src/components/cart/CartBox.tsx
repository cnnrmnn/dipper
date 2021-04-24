import { TripleDipper } from '../../api/cart';
import Box from './Box';
import BoxError from './BoxError';
import Button from '../generic/Button';
import CartBoxItem from './CartBoxItem';
import { checkOut, Order } from '../../api/order';
import { useState } from 'react';
import { Address } from '../../api/address';
import styles from './CartBox.css';

type Props = {
  setModal(modal: string): void;
  address: Address | null;
  cart: TripleDipper[];
  setOrder(order: Order): void;
  removeFromCart(tripleDipperId: number): Promise<void>;
};

export default function CartBox({
  setModal,
  address,
  cart,
  setOrder,
  removeFromCart,
}: Props): JSX.Element {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  async function handleClick(): Promise<void> {
    try {
      if (address) {
        setLoading(true);
        const order = await checkOut(address.id);
        setError('');
        setOrder(order);
        setLoading(false);
        setModal('checkout');
      } else {
        setError('No address set');
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.errors[0].message);
    }
  }

  return (
    <Box>
      <div className={styles.header}>
        <h2 className={styles.heading}>Cart</h2>
        <Button
          handleClick={handleClick}
          text="Check out"
          disabled={cart.length === 0}
          loading={loading}
          fontSize="0.85rem"
        />
      </div>
      {error && <BoxError message={error} />}
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
