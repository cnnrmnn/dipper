import { useState } from 'react';
import Button from './Button';
import ModalForm from './ModalForm';
import ModalError from './ModalError';
import VerificationCodeInput from './VerificationCodeInput';
import { logIn } from '../api/authentication';

type Props = {
  phone: string;
};

export default function LoginForm({ phone }: Props): JSX.Element {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault();
    try {
      const user = await logIn(phone, code);
      console.log(user);
    } catch (error) {
      setError(error.response.errors[0].message);
    }
  }

  return (
    <ModalForm onSubmit={handleSubmit}>
      <VerificationCodeInput value={code} setValue={setCode} />
      {error && <ModalError message={error} />}
      <Button
        type="submit"
        fontSize="1rem"
        disabled={code.length != 6}
        text="Log in"
      />
    </ModalForm>
  );
}
