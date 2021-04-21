import { TripleDipper } from '../../api/cart';
import Box from './Box';
import BoxError from './BoxError';
import Button from '../generic/Button';
import { header, heading } from './CartBox.css';
import CartBoxItem from './CartBoxItem';
import { checkOut, Order } from '../../api/order';
import { useState } from 'react';
import { Address } from '../../api/address';

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
  async function handleClick(): Promise<void> {
    try {
      if (address) {
        const order = await checkOut(address.id);
        setError('');
        setOrder(order);
        setModal('checkout');
      } else {
        setError('No address set');
      }
    } catch (error) {
      setError(error.response.errors[0].message);
    }
  }

  return (
    <Box>
      <div className={header}>
        <h2 className={heading}>Cart</h2>
        <Button
          handleClick={handleClick}
          text="Check out"
          disabled={cart.length === 0}
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
