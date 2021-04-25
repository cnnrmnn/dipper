import { useContext, useState } from 'react';
import { signUp } from '../../../api/authentication';
import UserContext from '../../../context/user';
import Button from '../../generic/Button';
import ModalForm from '../../modal/ModalForm';
import ModalError from '../../modal/ModalError';
import TextInput from '../../generic/TextInput';
import VerificationCodeInput from '../../generic/VerificationCodeInput';
import styles from './SignupForm.css';

type Props = {
  phone: string;
  setForm(form: string): void;
  close(): void;
};

export default function SignupForm({
  phone,
  setForm,
  close,
}: Props): JSX.Element {
  const [code, setCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(UserContext);
  async function handleSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault();
    try {
      setError('');
      setLoading(true);
      const user = await signUp(firstName, lastName, phone, email, code);
      setUser(user);
      setLoading(false);
      close();
    } catch (error) {
      setLoading(false);
      setError(error.response.errors[0].message);
    }
  }

  function validEmail(email: string): boolean {
    return email.match(/.+@.+\..+/) !== null;
  }

  return (
    <ModalForm onSubmit={handleSubmit}>
      <div className={styles.codeInput}>
        <VerificationCodeInput value={code} setValue={setCode} />
      </div>
      <TextInput
        value={firstName}
        setValue={setFirstName}
        placeholder="First name"
      />
      <TextInput
        value={lastName}
        setValue={setLastName}
        placeholder="Last name"
      />
      <TextInput value={email} setValue={setEmail} placeholder="Email" />
      {error && <ModalError message={error} />}
      <Button
        type="submit"
        fontSize="1rem"
        disabled={
          code.length !== 6 ||
          firstName.length === 0 ||
          lastName.length === 0 ||
          !validEmail(email)
        }
        loading={loading}
        text="Sign up"
      />
    </ModalForm>
  );
}
