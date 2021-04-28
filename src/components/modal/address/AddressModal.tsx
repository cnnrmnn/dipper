import { Address, createAddress } from '../../../api/address';
import { useState } from 'react';
import ModalForm from '../ModalForm';
import Button from '../../generic/Button';
import TextInput from '../../generic/TextInput';
import ModalError from '../ModalError';
import Modal from '../../modal/Modal';
import styles from './AddressModal.css';

type Props = {
  addAddress(address: Address): void;
  setAddress(address: null | Address): void;
  close(): void;
};

export default function AddressModal({
  addAddress,
  setAddress,
  close,
}: Props): JSX.Element {
  const [street, setStreet] = useState('');
  const [unit, setUnit] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [notes, setNotes] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  async function handleSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault();
    try {
      setError('');
      setLoading(true);
      const address = await createAddress(
        street,
        unit,
        city,
        state,
        zip,
        notes
      );
      setAddress(address);
      addAddress(address);
      setLoading(false);
      close();
    } catch (error) {
      setLoading(false);
      setError(error.response.errors[0].message);
    }
  }

  return (
    <Modal title="Add an address" height="auto" width="350px" close={close}>
      <ModalForm onSubmit={handleSubmit}>
        <div className={styles.streetRow}>
          <TextInput value={street} setValue={setStreet} placeholder="Street" />
          <TextInput value={unit} setValue={setUnit} placeholder="Unit" />
        </div>
        <div className={styles.cityRow}>
          <TextInput value={city} setValue={setCity} placeholder="City" />
          <TextInput value={state} setValue={setState} placeholder="State" />
          <TextInput value={zip} setValue={setZip} placeholder="Zip" />
        </div>
        <TextInput value={notes} setValue={setNotes} placeholder="Notes" />
        {error && <ModalError message={error} />}
        <Button
          type="submit"
          fontSize="1rem"
          disabled={false}
          loading={loading}
          text="Add"
        />
      </ModalForm>
    </Modal>
  );
}
