import { useState } from 'react';
import { sendCode } from '../../../api/authentication';
import Button from '../../generic/Button';
import ModalForm from '../ModalForm';
import ModalError from '../ModalError';
import PhoneInput from '../../generic/PhoneInput';
import { notice } from './VerificationCodeForm.css';

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

  async function handleSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault();
    setError('');
    try {
      const exists = await sendCode(phone);
      if (exists) setForm('login');
      else setForm('signup');
    } catch (error) {
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
      />
      {error && <ModalError message={error} />}
      <p className={notice}>Message and data rates may apply.</p>
    </ModalForm>
  );
}
