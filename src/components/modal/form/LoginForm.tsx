import { useContext, useState } from 'react';
import UserContext from '../../../context/user';
import Button from '../../generic/Button';
import ModalForm from '../ModalForm';
import ModalError from '../ModalError';
import VerificationCodeInput from '../../generic/VerificationCodeInput';
import { logIn } from '../../../api/authentication';

type Props = {
  phone: string;
  closeModal(): void;
};

export default function LoginForm({ phone, closeModal }: Props): JSX.Element {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const { setUser } = useContext(UserContext);
  async function handleSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault();
    try {
      const user = await logIn(phone, code);
      setUser(user);
      closeModal();
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
