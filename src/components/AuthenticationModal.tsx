import { useState } from 'react';
import Modal from './Modal';
import SignupForm from './SignupForm';
import VerificationCodeForm from './VerificationCodeForm';

type Props = {
  setVisible(visible: boolean): void;
};

export default function AuthenticationModal({
  setVisible,
}: Props): JSX.Element {
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
        return <SignupForm setForm={setForm} phone={phone} />;
      case 'login':
        return <p>Login form goes here</p>;
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
    <Modal
      title={currentTitle()}
      height="auto"
      width="300px"
      setVisible={setVisible}
    >
      {currentForm()}
    </Modal>
  );
}
