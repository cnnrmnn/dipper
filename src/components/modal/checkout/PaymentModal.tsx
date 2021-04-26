import { useState } from 'react';
import { placeOrder } from '../../../api/order';
import Button from '../../generic/Button';
import CreditCardInput from '../../generic/CreditCardInput';
import ExpirationDateInput from '../../generic/ExpirationDateInput';
import TextInput from '../../generic/TextInput';
import Modal from '../Modal';
import ModalError from '../ModalError';
import ModalForm from '../ModalForm';
import styles from './PaymentModal.css';

type Props = {
  close(): void;
};
export default function PaymentModal({ close }: Props): JSX.Element {
  const [name, setName] = useState('');
  const [card, setCard] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('');
  const [zip, setZip] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault();
    try {
      setError('');
      setLoading(true);
      const order = await placeOrder(
        name,
        card,
        expiration.substring(0, 2),
        expiration.substring(2, 6),
        cvv,
        zip
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.errors[0].message);
    }
  }

  return (
    <Modal title="Payment" height="auto" width="350px" close={close}>
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
    </Modal>
  );
}
