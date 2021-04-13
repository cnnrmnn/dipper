import './root.css';
import { useEffect, useState } from 'react';
import UserContext from './context/user';
import ItemBoxContainer from './components/ItemBoxContainer';
import TripleDipperBox from './components/TripleDipperBox';
import AuthenticationModal from './components/AuthenticationModal';
import { Item, getItems } from './api/item';
import { ItemInput } from './api/cart';
import { me, User } from './api/authentication';
import { app } from './App.css';
import Navbar from './components/Navbar';

export default function App(): JSX.Element {
  const [items, setItems] = useState([] as Item[]);
  useEffect(() => {
    async function updateItemValues(): Promise<void> {
      setItems(await getItems());
    }
    updateItemValues();
  }, []);

  const [itemInputs, setItemInputs] = useState([] as ItemInput[]);
  function addItemInput(itemInput: ItemInput): void {
    if (itemInputs.length < 3) {
      setItemInputs(itemInputs.concat(itemInput));
    }
  }
  function removeItemInput(index: number): void {
    console.log(index);
    setItemInputs(itemInputs.filter((itemInput, i) => i !== index));
  }

  const [user, setUser] = useState(null as User | null);
  useEffect(() => {
    async function updateUser(): Promise<void> {
      setUser(await me());
    }
    updateUser();
  }, []);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Navbar showAuthenticationModal={() => setModalVisible(true)} />
      <main className={app}>
        <ItemBoxContainer
          items={items}
          addItemInput={addItemInput}
          disabled={itemInputs.length === 3}
        />
        <TripleDipperBox
          items={items}
          itemInputs={itemInputs}
          setItemInputs={setItemInputs}
          removeItemInput={removeItemInput}
        />
      </main>
      {modalVisible && <AuthenticationModal setVisible={setModalVisible} />}
    </UserContext.Provider>
  );
}
