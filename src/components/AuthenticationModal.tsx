import { useState } from 'react';
import {
  container,
  modal,
  header,
  heading,
  body,
} from './AuthenticationModal.css';
import TextInput from './TextInput';

type Props = {
  setModalVisible(visible: boolean): void;
};

export default function AuthenticationModal({
  setModalVisible,
}: Props): JSX.Element {
  const [value, setValue] = useState('');
  return (
    <div className={container}>
      <div className={modal}>
        <div className={header}>
          <h2 className={heading}>Enter your phone</h2>
          <button onClick={() => setModalVisible(false)}>hi</button>
        </div>
        <div className={body}>
          <TextInput value={value} setValue={setValue} />
        </div>
      </div>
    </div>
  );
}
