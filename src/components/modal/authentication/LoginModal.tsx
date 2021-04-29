import { useContext, useState } from 'react';
import UserContext from '../../../context/user';
import ModalContext from '../../../context/modal';
import Button from '../../generic/Button';
import Modal from '../Modal';
import ModalForm from '../ModalForm';
import ModalError from '../ModalError';
import VerificationCodeInput from '../../generic/VerificationCodeInput';
import { logIn } from '../../../api/authentication';

type Props = {
  phone: string;
};

export default function LoginModal({ phone }: Props): JSX.Element {
  const { setUser } = useContext(UserContext);
  const { closeModal } = useContext(ModalContext);

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault();
    try {
      setError('');
      setLoading(true);
      const user = await logIn(phone, code);
      setUser(user);
      setLoading(false);
      closeModal();
    } catch (error) {
      setLoading(false);
      setError(error.response.errors[0].message);
    }
  }

  return (
    <Modal title="Log in" width="300px">
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
    </Modal>
  );
}
