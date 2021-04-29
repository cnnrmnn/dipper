import { useState } from 'react';
import LoginForm from './LoginForm';
import Modal from '../Modal';
import SignupForm from './SignupForm';
import VerificationCodeForm from './VerificationCodeForm';

export default function AuthenticationModal(): JSX.Element {
  const [form, setForm] = useState('code');
  const [phone, setPhone] = useState('');
  function currentForm(): JSX.Element {
    switch (form) {
      case 'code':
        return (
          <VerificationCodeForm
            setForm={setForm}
            phone={phone}
            setPhone={setPhone}
          />
        );
      case 'signup':
        return <SignupForm phone={phone} />;
      case 'login':
        return <LoginForm phone={phone} />;
      // This case should never be reached but ensures the function always
      // returns a JSX.Element.
      default:
        return <></>;
    }
  }

  function currentTitle(): string {
    switch (form) {
      case 'code':
        return 'Enter your phone';
      case 'signup':
        return 'Sign up';
      case 'login':
        return 'Log in';
      default:
        return '';
    }
  }

  return (
    <Modal title={currentTitle()} width="300px">
      {currentForm()}
    </Modal>
  );
}
