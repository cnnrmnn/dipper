import { Order } from '../../../api/order';
import ModalAddress from '../ModalAddress';
import ModalItem from '../ModalItem';
import ModalReceipt from '../ModalReceipt';
import styles from './OrdersModalOrder.css';

type Props = {
  order: Order;
};

export default function OrdersModalOrder({ order }: Props): JSX.Element {
  return (
    <>
      <h3 className={styles.heading}>Delivery</h3>
      <h4 className={styles.subheading}>{`Chili's ${order.location}`}</h4>
      <ModalAddress address={order.address} deliveryTime={order.deliveryTime} />
      <h3 className={styles.heading}>Items</h3>
      {order.tripleDippers.map((tripleDipper) => (
        <ModalItem key={tripleDipper.id} tripleDipper={tripleDipper} />
      ))}
      <ModalReceipt order={order} />
    </>
  );
}
