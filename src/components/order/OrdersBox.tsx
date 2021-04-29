import ModalContext from '../../context/modal';
import { Order } from '../../api/order';
import Box from '../Box';
import OrderItem from './OrderItem';
import styles from './OrdersBox.css';
import { useContext } from 'react';
import OrderModal from '../modal/order/OrderModal';
import { TripleDipper } from '../../api/cart';

type Props = {
  appendToCart(tripleDippers: TripleDipper[]): void;
  orders: Order[];
};

export default function OrdersBox({
  appendToCart,
  orders,
}: Props): JSX.Element {
  const { setModal } = useContext(ModalContext);

  function showOrderModal(order: Order): () => void {
    return () =>
      setModal(
        <OrderModal appendToCart={appendToCart} order={order} orders={orders} />
      );
  }
  return (
    <Box>
      <h2 className={styles.heading}>Orders</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <OrderItem
            order={order}
            key={order.id}
            onClick={showOrderModal(order)}
          />
        ))
      ) : (
        <h3 className={styles.subheading}>No orders yet</h3>
      )}
    </Box>
  );
}
