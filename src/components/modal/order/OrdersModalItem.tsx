import { Order, parseDeliveryTime } from '../../../api/order';
import styles from './OrdersModalItem.css';

type Props = {
  order: Order;
  onClick(event: React.MouseEvent): void;
};

export default function OrdersModalItem({
  order,
  onClick,
}: Props): JSX.Element {
  return (
    <div className={styles.item} onClick={onClick}>
      <h3 className={styles.heading}>{`Chili's ${order.location}`}</h3>
      <h4 className={styles.subheading}>
        {parseDeliveryTime(order.deliveryTime)}
      </h4>
    </div>
  );
}
