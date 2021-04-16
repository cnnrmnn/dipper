import './root.css';
import { useEffect, useState } from 'react';
import UserContext from './context/user';
import AuthenticationModal from './components/modal/AuthenticationModal';
import { me, User } from './api/authentication';
import Navbar from './components/navbar/Navbar';
import Main from './components/Main';
import AddressModal from './components/navbar/AddressModal';

export default function App(): JSX.Element {
  const [user, setUser] = useState(null as User | null);
  useEffect(() => {
    async function updateUser(): Promise<void> {
      setUser(await me());
    }
    updateUser();
  }, []);
  const [authentication, setAuthentication] = useState(false);
  function showAuthentication(): void {
    setAuthentication(true);
  }
  const [address, setAddress] = useState(false);
  function showAddress(): void {
    setAddress(true);
  }
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Navbar
        showAuthentication={showAuthentication}
        showAddress={showAddress}
      />
      <Main showAuthentication={showAuthentication} />
      {authentication && <AuthenticationModal setVisible={setAuthentication} />}
      {address && <AddressModal setVisible={setAddress} />}
    </UserContext.Provider>
  );
}
