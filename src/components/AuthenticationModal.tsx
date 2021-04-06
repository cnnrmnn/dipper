import { useState } from 'react';
import Modal from './Modal';
import PhoneInput from './PhoneInput';
import { body } from './AuthenticationModal.css';
import Button from './Button';

type Props = {
  setVisible(visible: boolean): void;
};

export default function AuthenticationModal({
  setVisible,
}: Props): JSX.Element {
  const [value, setValue] = useState('');
  return (
    <Modal
      title="Enter your phone"
      height="300px"
      width="300px"
      setVisible={setVisible}
    >
      <div className={body}>
        <PhoneInput value={value} setValue={setValue} />
        <Button
          fontSize="1rem"
          text="Send verification code"
          disabled={value.length !== 10}
          handleClick={() => null}
        />
        <p>Message and data rates may apply</p>
      </div>
    </Modal>
  );
}
