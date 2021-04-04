import { useState } from 'react';
import Modal from './Modal';
import TextInput from './TextInput';
import { body } from './AuthenticationModal.css';

type Props = {
  setVisible(visible: boolean): void;
};

export default function AuthenticationModal({
  setVisible,
}: Props): JSX.Element {
  const [value, setValue] = useState('');
  return (
    <Modal title="Enter your phone" setVisible={setVisible}>
      <div className={body}>
        <TextInput value={value} setValue={setValue} />
      </div>
    </Modal>
  );
}
