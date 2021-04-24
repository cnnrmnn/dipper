import { Order } from '../../../api/order';
import Button from '../../generic/Button';
import Modal from '../Modal';
import CheckoutModalItem from './CheckoutModalItem';
import CheckoutModalAddress from './CheckoutModalAddress';
import CheckoutModalReceipt from './CheckoutModalReceipt';
import styles from './CheckoutModal.css';

type Props = {
  order: Order | null;
  close(): void;
};

export default function CheckoutModal({ order, close }: Props): JSX.Element {
  const header = order && (
    <div className={styles.header}>
      <h3 className={styles.heading}>Deliver to</h3>
      <CheckoutModalAddress address={order.address} />
      <h3 className={styles.heading}>Items</h3>
    </div>
  );
  const footer = order && (
    <div className={styles.footer}>
      <CheckoutModalReceipt order={order} />
      <div className={styles.button}>
        <Button text="Place order" fontSize="1rem" />
      </div>
    </div>
  );
  return (
    <Modal
      title="Checkout"
      maxHeight="80%"
      minHeight="400px"
      width="350px"
      close={close}
      header={header}
      footer={footer}
    >
      {order ? (
        <>
          <div className={styles.items}>
            {order.tripleDippers.map((tripleDipper) => (
              <CheckoutModalItem
                key={tripleDipper.id}
                tripleDipper={tripleDipper}
              />
            ))}
          </div>
        </>
      ) : (
        <h3 className={styles.heading}>No order found</h3>
      )}
    </Modal>
  );
}
