import { Order } from '../../api/order';
import ModalReceiptRow from './ModalReceiptRow';

type Props = {
  order: Order;
};

export default function ModalReceipt({ order }: Props): JSX.Element {
  return (
    <div>
      <ModalReceiptRow title="Subtotal" price={order.subtotal} />
      <ModalReceiptRow title="Delivery fee" price={order.deliveryFee} />
      <ModalReceiptRow title="Service fee" price={order.serviceFee} />
      <ModalReceiptRow title="Estimated tax" price={order.tax} />
      <ModalReceiptRow
        title="Total"
        price={
          order.subtotal + order.deliveryFee + order.serviceFee + order.tax
        }
        bold
      />
    </div>
  );
}
