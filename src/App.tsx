import './root.css';
import { useEffect, useState } from 'react';
import UserContext from './context/user';
import { me, User } from './api/authentication';
import Navbar from './components/navbar/Navbar';
import Main from './components/Main';
import Modals from './components/modal/Modals';
import AddressModal from './components/modal/address/AddressModal';
import AuthenticationModal from './components/modal/authentication/AuthenticationModal';
import { Address, getAddresses } from './api/address';

export default function App(): JSX.Element {
  const [user, setUser] = useState(null as User | null);
  useEffect(() => {
    async function updateUser(): Promise<void> {
      setUser(await me());
    }
    updateUser();
  }, []);

  const [address, setAddress] = useState(null as null | Address);
  const [addresses, setAddresses] = useState([] as Address[]);
  function addAddress(address: Address): void {
    setAddresses(addresses.concat(address));
  }
  useEffect(() => {
    async function updateAddresses(): Promise<void> {
      const addresses = await getAddresses();
      setAddresses(addresses);
      setAddress(addresses[0]);
    }
    updateAddresses();
  }, [user]);

  const [modal, setModal] = useState('');
  function close(): void {
    setModal('');
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div id="app">
        <Navbar
          showAuthentication={() => setModal('authentication')}
          showAddress={() => setModal('address')}
          address={address}
          setAddress={setAddress}
          addresses={addresses}
        />
        <Main showAuthentication={() => setModal('authentication')} />
      </div>
      {modal && (
        <Modals
          modal={modal}
          addressModal={
            <AddressModal
              addAddress={addAddress}
              setAddress={setAddress}
              close={close}
            />
          }
          authenticationModal={<AuthenticationModal close={close} />}
        />
      )}
    </UserContext.Provider>
  );
}
