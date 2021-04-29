import { useContext, useState } from 'react';
import ModalContext from '../../../context/modal';
import { sendCode } from '../../../api/authentication';
import Button from '../../generic/Button';
import ModalForm from '../ModalForm';
import ModalError from '../ModalError';
import PhoneInput from '../../generic/PhoneInput';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import styles from './VerificationCodeModal.css';
import Modal from '../Modal';

export default function VerificationCodeModal(): JSX.Element {
  const { setModal } = useContext(ModalContext);

  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault();
    try {
      setError('');
      setLoading(true);
      const exists = await sendCode(phone);
      setLoading(false);
      if (exists) setModal(<LoginModal phone={phone} />);
      else setModal(<SignupModal phone={phone} />);
    } catch (error) {
      setLoading(false);
      setError(error.response.errors[0].message);
    }
  }
  return (
    <Modal title="Enter your phone" width="300px">
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
    </Modal>
  );
}
