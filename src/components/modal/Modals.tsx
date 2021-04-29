import AuthenticationModal from './authentication/AuthenticationModal';
import AddressModal from './address/AddressModal';
import CheckoutModal from './checkout/CheckoutModal';
import PaymentModal from './checkout/PaymentModal';
import { Address } from '../../api/address';
import { Order } from '../../api/order';
import OrdersModal from './order/OrdersModal';
import { TripleDipper } from '../../api/cart';

type Props = {
  setAddress(address: Address | null): void;
  addAddress(address: Address): void;
  cart: TripleDipper[];
  setCart(cart: TripleDipper[]): void;
  order: Order | null;
  addOrder(order: Order): void;
  orders: Order[];
  modal: string;
  setModal(modal: string): void;
  close(): void;
};

export default function Modals({
  setAddress,
  addAddress,
  cart,
  setCart,
  order,
  addOrder,
  orders,
  modal,
  setModal,
  close,
}: Props): JSX.Element {
  function currentModal(): JSX.Element {
    switch (modal) {
      case 'authentication':
        return <AuthenticationModal close={close} />;
      case 'address':
        return (
          <AddressModal
            addAddress={addAddress}
            setAddress={setAddress}
            close={close}
          />
        );
      case 'checkout':
        return (
          <CheckoutModal order={order} close={close} setModal={setModal} />
        );
      case 'payment':
        return <PaymentModal addOrder={addOrder} close={close} />;
      case 'orders':
        return (
          <OrdersModal
            orders={orders}
            cart={cart}
            setCart={setCart}
            close={close}
          />
        );
      default:
        return <></>;
    }
  }

  return currentModal();
}
