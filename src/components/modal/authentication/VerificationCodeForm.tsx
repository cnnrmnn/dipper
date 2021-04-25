import { useState } from 'react';
import { sendCode } from '../../../api/authentication';
import Button from '../../generic/Button';
import ModalForm from '../ModalForm';
import ModalError from '../ModalError';
import PhoneInput from '../../generic/PhoneInput';
import styles from './VerificationCodeForm.css';

type Props = {
  phone: string;
  setPhone(phone: string): void;
  setForm(form: string): void;
};
export default function VerificationCodeForm({
  phone,
  setPhone,
  setForm,
}: Props): JSX.Element {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault();
    try {
      setError('');
      setLoading(true);
      const exists = await sendCode(phone);
      setLoading(false);
      if (exists) setForm('login');
      else setForm('signup');
    } catch (error) {
      setLoading(false);
      setError(error.response.errors[0].message);
    }
  }
  return (
    <ModalForm onSubmit={handleSubmit}>
      <PhoneInput value={phone} setValue={setPhone} />
      <Button
        type="submit"
        fontSize="1rem"
        text="Send verification code"
        disabled={phone.length !== 10}
        loading={loading}
      />
      {error && <ModalError message={error} />}
      <p className={styles.notice}>Message and data rates may apply.</p>
    </ModalForm>
  );
}
