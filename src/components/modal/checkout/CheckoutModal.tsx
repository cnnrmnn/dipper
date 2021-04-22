import { Order } from '../../../api/order';
import Button from '../../generic/Button';
import Modal from '../Modal';
import CheckoutModalItem from './CheckoutModalItem';
import { heading, button } from './CheckoutModal.css';
import CheckoutModalAddress from './CheckoutModalAddress';
import CheckoutModalReceipt from './CheckoutModalReceipt';

type Props = {
  order: Order | null;
  close(): void;
};

export default function CheckoutModal({ order, close }: Props): JSX.Element {
  return (
    <Modal title="Checkout" height="auto" width="350px" close={close}>
      {order ? (
        <>
          <h3 className={heading}>Deliver to</h3>
          <CheckoutModalAddress address={order.address} />
          <h3 className={heading}>Items</h3>
          {order.tripleDippers.map((tripleDipper) => (
            <CheckoutModalItem
              key={tripleDipper.id}
              tripleDipper={tripleDipper}
            />
          ))}
          <CheckoutModalReceipt order={order} />
          <div className={button}>
            <Button text="Place order" fontSize="1rem" />
          </div>
        </>
      ) : (
        <h3 className={heading}>No order found</h3>
      )}
    </Modal>
  );
}
