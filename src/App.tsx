import './root.css';
import { useEffect, useState } from 'react';
import UserContext from './context/user';
import ModalContext from './context/modal';
import { me, User } from './api/authentication';
import Navbar from './components/navbar/Navbar';
import Main from './components/Main';
import { Address } from './api/address';
import { getOrders, Order } from './api/order';
import { getCart, TripleDipper } from './api/cart';

export default function App(): JSX.Element {
  const [modal, setModal] = useState(null as null | JSX.Element);
  function closeModal(): void {
    setModal(null);
  }

  const [user, setUser] = useState(null as User | null);
  useEffect(() => {
    async function updateUser(): Promise<void> {
      setUser(await me());
    }
    updateUser();
  }, []);

  const [address, setAddress] = useState(null as null | Address);

  const [cart, setCart] = useState([] as TripleDipper[]);
  useEffect(() => {
    async function updateCart(): Promise<void> {
      try {
        setCart(await getCart());
      } catch (error) {
        setCart([]);
      }
    }
    updateCart();
  }, [user]);
  function appendToCart(tripleDippers: TripleDipper[]): void {
    setCart(cart.concat(tripleDippers));
  }

  const [orders, setOrders] = useState([] as Order[]);
  useEffect(() => {
    async function updateOrders(): Promise<void> {
      const orders = await getOrders();
      setOrders(orders);
    }
    updateOrders();
  }, [user]);
  function addOrder(order: Order): void {
    setOrders(orders.concat(order));
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ModalContext.Provider value={{ modal, setModal, closeModal }}>
        <div id="app">
          <Navbar
            address={address}
            setAddress={setAddress}
            appendToCart={appendToCart}
            orders={orders}
          />
          <Main
            addOrder={addOrder}
            cart={cart}
            appendToCart={appendToCart}
            setCart={setCart}
            orders={orders}
            address={address}
          />
        </div>
        {modal}
      </ModalContext.Provider>
    </UserContext.Provider>
  );
}
