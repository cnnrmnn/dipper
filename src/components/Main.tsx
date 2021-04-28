import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/user';
import ItemBoxContainer from './item/ItemBoxContainer';
import TripleDipperBox from './cart/TripleDipperBox';
import CartBox from './cart/CartBox';
import { ItemValue, getItemValues } from '../api/value';
import { Order } from '../api/order';
import {
  ItemInput,
  TripleDipper,
  addToCart,
  removeFromCart,
} from '../api/cart';
import styles from './Main.css';
import { Address } from '../api/address';

type Props = {
  setModal(modal: string): void;
  cart: TripleDipper[];
  setCart(cart: TripleDipper[]): void;
  setOrder(order: Order | null): void;
  address: Address | null;
};

export default function Main({
  setModal,
  cart,
  setCart,
  setOrder,
  address,
}: Props): JSX.Element {
  const { user } = useContext(UserContext);

  const [itemValues, setItemValues] = useState([] as ItemValue[]);
  useEffect(() => {
    async function updateItemValues(): Promise<void> {
      setItemValues(await getItemValues());
    }
    updateItemValues();
  }, []);

  const [itemInputs, setItemInputs] = useState([] as ItemInput[]);
  function addItemInput(itemInput: ItemInput): void {
    if (itemInputs.length < 3) {
      itemInput.id = new Date().getTime();
      setItemInputs(itemInputs.concat(itemInput));
    }
  }
  function removeItemInput(id: number): void {
    setItemInputs(itemInputs.filter((itemInput) => itemInput.id !== id));
  }

  async function createTripleDipper(): Promise<void> {
    if (!user) {
      setModal('authentication');
      return;
    }
    // Remove id field
    const tripleDipper = await addToCart(
      itemInputs.map(({ id, ...rest }) => rest)
    );
    setCart(cart.concat(tripleDipper));
    setItemInputs([]);
  }
  async function destroyTripleDipper(tripleDipperId: number): Promise<void> {
    try {
      setCart(
        cart.filter((tripleDipper) => tripleDipper.id !== tripleDipperId)
      );
      await removeFromCart(tripleDipperId);
    } catch (error) {
      // This should never happen.
      console.error(error);
    }
  }

  return (
    <main className={styles.main}>
      <ItemBoxContainer
        itemValues={itemValues}
        addItemInput={addItemInput}
        disabled={itemInputs.length === 3}
      />
      <div className={styles.right}>
        <TripleDipperBox
          itemValues={itemValues}
          itemInputs={itemInputs}
          setItemInputs={setItemInputs}
          removeItemInput={removeItemInput}
          addToCart={createTripleDipper}
        />
        <CartBox
          setModal={setModal}
          setOrder={setOrder}
          address={address}
          cart={cart}
          removeFromCart={destroyTripleDipper}
        />
      </div>
    </main>
  );
}
