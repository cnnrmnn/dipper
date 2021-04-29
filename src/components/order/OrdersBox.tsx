import { Order } from '../../api/order';
import Box from '../Box';
import OrderItem from './OrderItem';
import styles from './OrdersBox.css';

type Props = {
  orders: Order[];
};

export default function OrdersBox({ orders }: Props): JSX.Element {
  return (
    <Box>
      <h2 className={styles.heading}>Orders</h2>
      {orders.map((order) => (
        <OrderItem order={order} key={order.id} onClick={() => null} />
      ))}
    </Box>
  );
}
