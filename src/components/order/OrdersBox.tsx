import { Order } from '../../api/order';
import Box from '../Box';
import OrderItem from './OrderItem';
import styles from './OrdersBox.css';

type Props = {
  orders: Order[];
  setModal(modal: string): void;
  setModalOrder(order: Order | null): void;
};

export default function OrdersBox({
  orders,
  setModal,
  setModalOrder,
}: Props): JSX.Element {
  return (
    <Box>
      <h2 className={styles.heading}>Orders</h2>
      {orders.map((order) => (
        <OrderItem
          order={order}
          key={order.id}
          onClick={() => {
            setModalOrder(order);
            setModal('order');
          }}
        />
      ))}
    </Box>
  );
}
