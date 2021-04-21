import { Order } from '../../../api/order';
import CheckoutModalReceiptRow from './CheckoutModalReceiptRow';

type Props = {
  order: Order;
};

export default function CheckoutModalReceipt({ order }: Props): JSX.Element {
  return (
    <div>
      <CheckoutModalReceiptRow title="Subtotal" price={order.subtotal} />
      <CheckoutModalReceiptRow title="Delivery fee" price={order.deliveryFee} />
      <CheckoutModalReceiptRow title="Service fee" price={order.serviceFee} />
      <CheckoutModalReceiptRow title="Estimated tax" price={order.tax} />
      <CheckoutModalReceiptRow
        title="Total"
        price={
          order.subtotal + order.deliveryFee + order.serviceFee + order.tax
        }
        bold
      />
    </div>
  );
}
