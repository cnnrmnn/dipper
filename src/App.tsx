import './App.css';
import { useState } from 'react';
import VerificationCodeInput from './components/VerificationCodeInput';

export default function App(): JSX.Element {
  const [value, setValue] = useState('');
  return (
    <>
      <h1>dipper</h1>
      <VerificationCodeInput value={value} setValue={setValue} />
    </>
  );
}
