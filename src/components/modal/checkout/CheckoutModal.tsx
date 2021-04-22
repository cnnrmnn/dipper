import { Order } from '../../../api/order';
import Button from '../../generic/Button';
import Modal from '../Modal';
import CheckoutModalItem from './CheckoutModalItem';
import CheckoutModalAddress from './CheckoutModalAddress';
import CheckoutModalReceipt from './CheckoutModalReceipt';
import { heading, button, top, bottom, items } from './CheckoutModal.css';

type Props = {
  order: Order | null;
  close(): void;
};

export default function CheckoutModal({ order, close }: Props): JSX.Element {
  return (
    <Modal
      title="Checkout"
      maxHeight="80%"
      minHeight="400px"
      width="350px"
      close={close}
    >
      {order ? (
        <>
          <div className={top}>
            <h3 className={heading}>Deliver to</h3>
            <CheckoutModalAddress address={order.address} />
            <h3 className={heading}>Items</h3>
          </div>
          <div className={items}>
            {order.tripleDippers.map((tripleDipper) => (
              <CheckoutModalItem
                key={tripleDipper.id}
                tripleDipper={tripleDipper}
              />
            ))}
          </div>
          <div className={bottom}>
            <CheckoutModalReceipt order={order} />
            <div className={button}>
              <Button text="Place order" fontSize="1rem" />
            </div>
          </div>
        </>
      ) : (
        <h3 className={heading}>No order found</h3>
      )}
    </Modal>
  );
}
