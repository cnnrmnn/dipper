import { useState } from 'react';
import LoginForm from './form/LoginForm';
import Modal from './Modal';
import SignupForm from './form/SignupForm';
import VerificationCodeForm from './form/VerificationCodeForm';

type Props = {
  setVisible(visible: boolean): void;
};

export default function AuthenticationModal({
  setVisible,
}: Props): JSX.Element {
  const [form, setForm] = useState('code');
  const [phone, setPhone] = useState('');
  function currentForm(closeModal: () => void): JSX.Element {
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
        return (
          <SignupForm setForm={setForm} phone={phone} closeModal={closeModal} />
        );
      case 'login':
        return <LoginForm phone={phone} closeModal={closeModal} />;
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
      {currentForm}
    </Modal>
  );
}
