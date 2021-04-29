import AuthenticationModal from './authentication/AuthenticationModal';
import AddressModal from './address/AddressModal';
import CheckoutModal from './checkout/CheckoutModal';
import PaymentModal from './checkout/PaymentModal';
import { Address } from '../../api/address';
import { Order } from '../../api/order';
import OrdersModal from './order/OrdersModal';
import { TripleDipper } from '../../api/cart';
import OrderModal from './order/OrderModal';

type Props = {
  setAddress(address: Address | null): void;
  addAddress(address: Address): void;
  addToCart(tripleDippers: TripleDipper[]): void;
  setModalOrder(order: Order | null): void;
  modalOrder: Order | null;
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
  addToCart,
  order,
  modalOrder,
  setModalOrder,
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
      case 'order':
        return (
          <OrderModal
            setModal={setModal}
            addToCart={addToCart}
            order={modalOrder}
            close={() => {
              close();
              setModalOrder(null);
            }}
          />
        );
      case 'orders':
        return (
          <OrdersModal
            setModal={setModal}
            setModalOrder={setModalOrder}
            orders={orders}
            close={close}
          />
        );
      default:
        return <></>;
    }
  }

  return currentModal();
}
