import { useContext, useState } from 'react';
import ModalContext from '../../context/modal';
import { TripleDipper } from '../../api/cart';
import Box from '../Box';
import BoxError from './BoxError';
import Button from '../generic/Button';
import CartBoxItem from './CartBoxItem';
import { checkOut, Order } from '../../api/order';
import { Address } from '../../api/address';
import styles from './CartBox.css';
import CheckoutModal from '../modal/checkout/CheckoutModal';

type Props = {
  address: Address | null;
  cart: TripleDipper[];
  addOrder(order: Order): void;
  removeFromCart(tripleDipperId: number): Promise<void>;
};

export default function CartBox({
  address,
  cart,
  addOrder,
  removeFromCart,
}: Props): JSX.Element {
  const { setModal } = useContext(ModalContext);
  function showCheckoutModal(order: Order) {
    setModal(<CheckoutModal order={order} addOrder={addOrder} />);
  }

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  async function handleClick(): Promise<void> {
    try {
      if (address) {
        setError('');
        setLoading(true);
        const order = await checkOut(address.id);
        setLoading(false);
        showCheckoutModal(order);
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
          onClick={handleClick}
          disabled={cart.length === 0}
          loading={loading}
          fontSize="0.85rem"
        >
          Check out
        </Button>
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
