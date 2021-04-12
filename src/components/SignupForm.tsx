import { useContext, useState } from 'react';
import { signUp } from '../api/authentication';
import UserContext from '../context/user';
import Button from './Button';
import ModalForm from './ModalForm';
import ModalError from './ModalError';
import TextInput from './TextInput';
import VerificationCodeInput from './VerificationCodeInput';
import { codeInput } from './SignupForm.css';

type Props = {
  phone: string;
  setForm(form: string): void;
};

export default function SignupForm({ phone, setForm }: Props): JSX.Element {
  const [code, setCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [error, setError] = useState('');

  const { setUser } = useContext(UserContext);
  async function handleSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault();

    try {
      const user = await signUp(firstName, lastName, phone, email, code);
      setUser(user);
    } catch (error) {
      setError(error.response.errors[0].message);
    }
  }

  function validEmail(email: string): boolean {
    return email.match(/.+@.+\..+/) !== null;
  }
  return (
    <ModalForm onSubmit={handleSubmit}>
      <div className={codeInput}>
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
        text="Sign up"
      />
    </ModalForm>
  );
}
