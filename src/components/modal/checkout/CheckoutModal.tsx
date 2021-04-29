import { useContext } from 'react';
import ModalContext from '../../../context/modal';
import { Order } from '../../../api/order';
import Button from '../../generic/Button';
import Modal from '../Modal';
import ModalItem from '../ModalItem';
import ModalAddress from '../ModalAddress';
import ModalReceipt from '../ModalReceipt';
import styles from './CheckoutModal.css';
import PaymentModal from './PaymentModal';

type Props = {
  order: Order | null;
  addOrder(order: Order): void;
};

export default function CheckoutModal({ order, addOrder }: Props): JSX.Element {
  const { setModal } = useContext(ModalContext);
  function showPaymentModal(): void {
    setModal(<PaymentModal addOrder={addOrder} />);
  }

  const header = order && (
    <div className={styles.header}>
      <h3 className={styles.heading}>Delivery</h3>
      <ModalAddress address={order.address} deliveryTime={order.deliveryTime} />
      <h3 className={styles.heading}>Items</h3>
    </div>
  );
  const footer = order && (
    <div className={styles.footer}>
      <ModalReceipt order={order} />
      <div className={styles.button}>
        <Button fontSize="1rem" onClick={showPaymentModal}>
          Continue
        </Button>
      </div>
    </div>
  );
  return (
    <Modal
      title="Checkout"
      maxHeight="80%"
      minHeight="400px"
      width="350px"
      header={header}
      footer={footer}
    >
      {order ? (
        <>
          <div className={styles.items}>
            {order.tripleDippers.map((tripleDipper) => (
              <ModalItem key={tripleDipper.id} tripleDipper={tripleDipper} />
            ))}
          </div>
        </>
      ) : (
        <h3 className={styles.heading}>No order found</h3>
      )}
    </Modal>
  );
}
