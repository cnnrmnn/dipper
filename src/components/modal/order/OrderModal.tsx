import { useContext, useState } from 'react';
import ModalContext from '../../../context/modal';
import { Order, orderAgain } from '../../../api/order';
import { TripleDipper } from '../../../api/cart';
import Modal from '../Modal';
import ModalAddress from '../ModalAddress';
import ModalItem from '../ModalItem';
import ModalError from '../ModalError';
import ModalReceipt from '../ModalReceipt';
import Button from '../../generic/Button';
import OrdersModal from './OrdersModal';
import styles from './OrderModal.css';

type Props = {
  appendToCart(tripleDippers: TripleDipper[]): void;
  order: Order | null;
  orders: Order[];
};

export default function OrderModal({
  appendToCart,
  order,
  orders,
}: Props): JSX.Element {
  const { setModal, closeModal } = useContext(ModalContext);

  function showOrdersModal(): void {
    setModal(<OrdersModal orders={orders} appendToCart={appendToCart} />);
  }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  async function handleClick(): Promise<void> {
    if (order) {
      try {
        setError('');
        setLoading(true);
        const tripleDippers = await orderAgain(order);
        appendToCart(tripleDippers);
        setLoading(false);
        closeModal();
      } catch (error) {
        setLoading(false);
        setError(error.response.errors[0].message);
      }
    }
  }
  return (
    <Modal
      title="Order"
      width="400px"
      maxHeight="80%"
      footer={
        <div className={styles.buttons}>
          {error && <ModalError message={error} />}
          <Button fontSize="1rem" onClick={showOrdersModal}>
            Back to orders
          </Button>
          <Button fontSize="1rem" onClick={handleClick} loading={loading}>
            Order again
          </Button>
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
