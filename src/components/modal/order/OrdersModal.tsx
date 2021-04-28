import { Order } from '../../../api/order';
import Modal from '../Modal';
import OrdersModalItem from './OrdersModalItem';
import styles from './OrdersModal.css';
import { useState } from 'react';
import OrdersModalOrder from './OrdersModalOrder';
import Button from '../../generic/Button';

type Props = {
  close(): void;
  orders: Order[];
};

export default function OrdersModal({ orders, close }: Props): JSX.Element {
  const [order, setOrder] = useState(null as null | Order);
  return (
    <Modal
      title={order ? 'Order' : 'Orders'}
      width="400px"
      maxHeight="80%"
      close={close}
      footer={
        order && (
          <div className={styles.buttons}>
            <Button
              text="Back"
              fontSize="1rem"
              handleClick={() => setOrder(null)}
            />
            <Button
              text="Order again"
              fontSize="1rem"
              handleClick={() => setOrder(null)}
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
