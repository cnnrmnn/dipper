import { useState } from 'react';
import { sendCode } from '../api/authentication';
import Button from './Button';
import PhoneInput from './PhoneInput';
import styles from './VerificationCodeForm.css';

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
    <form className={styles.body} onSubmit={handleSubmit}>
      <PhoneInput value={value} setValue={setValue} />
      <Button
        type="submit"
        fontSize="1rem"
        text="Send verification code"
        disabled={value.length !== 10}
      />
      {error && <p className={styles.error}>{error}</p>}
      <p className={styles.notice}>Message and data rates may apply.</p>
    </form>
  );
}
