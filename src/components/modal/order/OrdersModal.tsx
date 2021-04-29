import { Order } from '../../../api/order';
import Modal from '../Modal';
import OrdersModalItem from '../../order/OrderItem';
import styles from './OrdersModal.css';

type Props = {
  setModalOrder(order: null | Order): void;
  setModal(modal: string): void;
  orders: Order[];
  close(): void;
};

export default function OrdersModal({
  setModalOrder,
  setModal,
  orders,
  close,
}: Props): JSX.Element {
  return (
    <Modal title="Orders" width="400px" maxHeight="80%" close={close}>
      {orders.length > 0 ? (
        <div className={styles.orders}>
          {orders.map((order) => (
            <OrdersModalItem
              order={order}
              onClick={() => {
                setModalOrder(order);
                setModal('order');
              }}
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
