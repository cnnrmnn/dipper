import { useState } from 'react';
import { Order, orderAgain } from '../../../api/order';
import { TripleDipper } from '../../../api/cart';
import Modal from '../Modal';
import ModalAddress from '../ModalAddress';
import ModalItem from '../ModalItem';
import ModalError from '../ModalError';
import ModalReceipt from '../ModalReceipt';
import Button from '../../generic/Button';
import styles from './OrderModal.css';

type Props = {
  setModal(modal: string): void;
  addToCart(tripleDippers: TripleDipper[]): void;
  order: Order | null;
  close(): void;
};

export default function OrderModal({
  setModal,
  addToCart,
  order,
  close,
}: Props): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  async function handleClick(): Promise<void> {
    if (order) {
      try {
        setError('');
        setLoading(true);
        const tripleDippers = await orderAgain(order);
        addToCart(tripleDippers);
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
      title="Order"
      close={close}
      width="400px"
      maxHeight="80%"
      footer={
        <div className={styles.buttons}>
          {error && <ModalError message={error} />}
          <Button
            text="Back to orders"
            fontSize="1rem"
            onClick={() => setModal('orders')}
          />
          <Button
            text="Order again"
            fontSize="1rem"
            onClick={handleClick}
            loading={loading}
          />
        </div>
      }
    >
      {order ? (
        <div className={styles.order}>
          <h3 className={styles.heading}>Delivery</h3>
          <h4 className={styles.subheading}>{`Chili's ${order.location}`}</h4>
          <ModalAddress
            address={order.address}
            deliveryTime={order.deliveryTime}
          />
          <h3 className={styles.heading}>Items</h3>
          {order.tripleDippers.map((tripleDipper) => (
            <ModalItem key={tripleDipper.id} tripleDipper={tripleDipper} />
          ))}
          <ModalReceipt order={order} />
        </div>
      ) : (
        <h3 className={styles.heading}>No order set</h3>
      )}
    </Modal>
  );
}
