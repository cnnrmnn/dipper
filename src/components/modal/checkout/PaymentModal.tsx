import { useContext, useState } from 'react';
import ModalContext from '../../../context/modal';
import { Order, placeOrder } from '../../../api/order';
import Button from '../../generic/Button';
import CreditCardInput from '../../generic/CreditCardInput';
import ExpirationDateInput from '../../generic/ExpirationDateInput';
import TextInput from '../../generic/TextInput';
import Modal from '../Modal';
import ModalError from '../ModalError';
import ModalForm from '../ModalForm';
import ModalAddress from '../ModalAddress';
import styles from './PaymentModal.css';

type Props = {
  addOrder(order: Order): void;
};

export default function PaymentModal({ addOrder }: Props): JSX.Element {
  const { closeModal } = useContext(ModalContext);

  const [name, setName] = useState('');
  const [card, setCard] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('');
  const [zip, setZip] = useState('');

  const [order, setOrder] = useState(null as null | Order);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault();
    try {
      setError('');
      setLoading(true);
      const ord = await placeOrder(
        name,
        card,
        expiration.substring(0, 2),
        expiration.substring(2, 6),
        cvv,
        zip
      );
      addOrder(ord);
      setOrder(ord);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.errors[0].message);
    }
  }

  return (
    <Modal
      title={order ? 'Order placed' : 'Payment'}
      height="auto"
      width="350px"
    >
      {order ? (
        <div className={styles.body}>
          <h3
            className={styles.heading}
          >{`Your order is on the way from Chili's ${order.location}!`}</h3>
          <ModalAddress
            address={order.address}
            deliveryTime={order.deliveryTime}
          />
          <div className={styles.button}>
            <Button text="Close" fontSize="1rem" onClick={closeModal} />
          </div>
        </div>
      ) : (
        <ModalForm onSubmit={handleSubmit}>
          <TextInput value={name} setValue={setName} placeholder="Name" />
          <div className={styles.cardRow}>
            <CreditCardInput value={card} setValue={setCard} />
            <ExpirationDateInput value={expiration} setValue={setExpiration} />
            <TextInput
              pattern={/^[0-9]{0,3}$/}
              placeholder="CVV"
              value={cvv}
              setValue={setCvv}
            />
          </div>
          <TextInput
            pattern={/^[0-9]{0,5}$/}
            value={zip}
            setValue={setZip}
            placeholder="Zip"
          />
          {error && <ModalError message={error} />}
          <Button
            text="Place order"
            fontSize="1rem"
            type="submit"
            disabled={
              !name ||
              card.length !== 16 ||
              expiration.length !== 6 ||
              zip.length !== 5
            }
            loading={loading}
          />
        </ModalForm>
      )}
    </Modal>
  );
}
