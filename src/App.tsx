import './root.css';
import { useEffect, useState } from 'react';
import UserContext from './context/user';
import { me, User } from './api/authentication';
import Navbar from './components/navbar/Navbar';
import Main from './components/Main';
import Modals from './components/modal/Modals';
import { Address, getAddresses } from './api/address';
import { getOrders, Order } from './api/order';

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

  const [order, setOrder] = useState(null as null | Order);
  const [orders, setOrders] = useState([] as Order[]);
  useEffect(() => {
    async function updateOrders(): Promise<void> {
      const orders = await getOrders();
      setOrders(orders);
    }
    updateOrders();
  }, [user]);

  const [modal, setModal] = useState('');
  function close(): void {
    setModal('');
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div id="app">
        <Navbar
          setModal={setModal}
          address={address}
          setAddress={setAddress}
          addresses={addresses}
        />
        <Main setModal={setModal} setOrder={setOrder} address={address} />
      </div>
      {modal && (
        <Modals
          setAddress={setAddress}
          addAddress={addAddress}
          order={order}
          orders={orders}
          modal={modal}
          setModal={setModal}
          close={close}
        />
      )}
    </UserContext.Provider>
  );
}
