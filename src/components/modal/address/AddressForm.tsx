import { useState } from 'react';
import { Address, createAddress } from '../../../api/address';
import ModalForm from '../ModalForm';
import Button from '../../generic/Button';
import TextInput from '../../generic/TextInput';
import ModalError from '../ModalError';
import styles from './AddressForm.css';

type Props = {
  setAddress(address: Address | null): void;
  addAddress(address: Address): void;
  close(): void;
};

export default function AddressForm({
  setAddress,
  addAddress,
  close,
}: Props): JSX.Element {
  const [street, setStreet] = useState('');
  const [unit, setUnit] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [notes, setNotes] = useState('');

  const [error, setError] = useState('');
  async function handleSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault();
    try {
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
      close();
    } catch (error) {
      setError(error.response.errors[0].message);
    }
  }

  return (
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
      <Button type="submit" fontSize="1rem" disabled={false} text="Add" />
    </ModalForm>
  );
}
