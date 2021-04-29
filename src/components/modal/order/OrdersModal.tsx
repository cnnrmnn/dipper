import { useContext } from 'react';
import ModalContext from '../../../context/modal';
import { Order } from '../../../api/order';
import { TripleDipper } from '../../../api/cart';
import Modal from '../Modal';
import OrdersModalItem from '../../order/OrderItem';
import styles from './OrdersModal.css';
import OrderModal from './OrderModal';

type Props = {
  orders: Order[];
  appendToCart(tripleDippers: TripleDipper[]): void;
};

export default function OrdersModal({
  orders,
  appendToCart,
}: Props): JSX.Element {
  const { setModal } = useContext(ModalContext);
  function showOrderModal(order: Order): () => void {
    return () =>
      setModal(
        <OrderModal order={order} orders={orders} appendToCart={appendToCart} />
      );
  }
  return (
    <Modal title="Orders" width="400px" maxHeight="80%">
      {orders.length > 0 ? (
        <div className={styles.orders}>
          {orders.map((order) => (
            <OrdersModalItem
              order={order}
              onClick={showOrderModal(order)}
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
