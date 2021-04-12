import { useState } from 'react';
import { sendCode } from '../api/authentication';
import Button from './Button';
import ModalForm from './ModalForm';
import ModalError from './ModalError';
import PhoneInput from './PhoneInput';
import { notice } from './VerificationCodeForm.css';

type Props = {
  setForm(form: string): void;
};
export default function VerificationCodeForm({ setForm }: Props): JSX.Element {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault();
    setError('');
    try {
      const exists = await sendCode(value);
      if (exists) setForm('login');
      else setForm('signup');
    } catch (error) {
      console.log(error.response.errors[0].message);
      setError('Unable to send verification code.');
    }
  }
  return (
    <ModalForm onSubmit={handleSubmit}>
      <PhoneInput value={value} setValue={setValue} />
      <Button
        type="submit"
        fontSize="1rem"
        text="Send verification code"
        disabled={value.length !== 10}
      />
      {error && <ModalError message={error} />}
      <p className={notice}>Message and data rates may apply.</p>
    </ModalForm>
  );
}
