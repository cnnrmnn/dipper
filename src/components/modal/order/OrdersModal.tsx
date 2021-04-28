import { Order, orderAgain } from '../../../api/order';
import Modal from '../Modal';
import OrdersModalItem from './OrdersModalItem';
import styles from './OrdersModal.css';
import { useState } from 'react';
import OrdersModalOrder from './OrdersModalOrder';
import Button from '../../generic/Button';
import { TripleDipper } from '../../../api/cart';
import ModalError from '../ModalError';

type Props = {
  cart: TripleDipper[];
  setCart(cart: TripleDipper[]): void;
  close(): void;
  orders: Order[];
};

export default function OrdersModal({
  cart,
  setCart,
  orders,
  close,
}: Props): JSX.Element {
  const [order, setOrder] = useState(null as null | Order);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  async function handleClick(): Promise<void> {
    if (order) {
      try {
        setError('');
        setLoading(true);
        const tripleDippers = await orderAgain(order);
        setCart(cart.concat(tripleDippers));
        setLoading(false);
        close();
      } catch (error) {
        setLoading(false);
        setError(error.response.errors[0].message);
      }
    }
  }
  return (
    <Modal
      title={order ? 'Order' : 'Orders'}
      width="400px"
      maxHeight="80%"
      close={close}
      footer={
        order && (
          <div className={styles.buttons}>
            {error && <ModalError message={error} />}
            <Button
              text="Back"
              fontSize="1rem"
              handleClick={() => setOrder(null)}
            />
            <Button
              text="Order again"
              fontSize="1rem"
              handleClick={handleClick}
              loading={loading}
            />
          </div>
        )
      }
    >
      {order ? (
        <OrdersModalOrder order={order} />
      ) : orders.length > 0 ? (
        <div className={styles.orders}>
          {orders.map((order) => (
            <OrdersModalItem
              order={order}
              onClick={() => setOrder(order)}
              key={order.id}
            />
          ))}
        </div>
      ) : (
        <h3 className={styles.heading}>No orders yet</h3>
      )}
    </Modal>
  );
}
