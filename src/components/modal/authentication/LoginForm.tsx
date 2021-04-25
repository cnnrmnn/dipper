import { useContext, useState } from 'react';
import UserContext from '../../../context/user';
import Button from '../../generic/Button';
import ModalForm from '../ModalForm';
import ModalError from '../ModalError';
import VerificationCodeInput from '../../generic/VerificationCodeInput';
import { logIn } from '../../../api/authentication';

type Props = {
  phone: string;
  close(): void;
};

export default function LoginForm({ phone, close }: Props): JSX.Element {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(UserContext);
  async function handleSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault();
    try {
      setError('');
      setLoading(true);
      const user = await logIn(phone, code);
      setUser(user);
      setLoading(false);
      close();
    } catch (error) {
      setLoading(false);
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
        loading={loading}
        text="Log in"
      />
    </ModalForm>
  );
}
