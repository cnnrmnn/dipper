import AuthenticationModal from './authentication/AuthenticationModal';
import AddressModal from './address/AddressModal';
import CheckoutModal from './checkout/CheckoutModal';
import PaymentModal from './checkout/PaymentModal';
import { Address } from '../../api/address';
import { Order } from '../../api/order';

type Props = {
  setAddress(address: Address | null): void;
  addAddress(address: Address): void;
  order: Order | null;
  modal: string;
  setModal(modal: string): void;
  close(): void;
};

export default function Modals({
  setAddress,
  addAddress,
  order,
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
        return <PaymentModal close={close} />;
      default:
        return <></>;
    }
  }

  return currentModal();
}
