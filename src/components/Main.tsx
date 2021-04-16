import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/user';
import ItemBoxContainer from './item/ItemBoxContainer';
import TripleDipperBox from './cart/TripleDipperBox';
import CartBox from './cart/CartBox';
import { ItemValue, getItemValues } from '../api/value';
import {
  ItemInput,
  TripleDipper,
  addToCart,
  getCart,
  removeFromCart,
} from '../api/cart';
import { main, right } from './Main.css';

type Props = {
  showAuthentication(): void;
};

export default function Main({ showAuthentication }: Props): JSX.Element {
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
      setItemInputs(itemInputs.concat(itemInput));
    }
  }
  function removeItemInput(index: number): void {
    setItemInputs(itemInputs.filter((itemInput, i) => i !== index));
  }

  const [cart, setCart] = useState([] as TripleDipper[]);
  const { user } = useContext(UserContext);

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

  async function createTripleDipper(): Promise<void> {
    if (!user) {
      showAuthentication();
      return;
    }
    const tripleDipper = await addToCart(itemInputs);
    setCart(cart.concat(tripleDipper));
    setItemInputs([]);
  }
  async function destroyTripleDipper(tripleDipperId: number): Promise<void> {
    try {
      await removeFromCart(tripleDipperId);
      setCart(
        cart.filter((tripleDipper) => tripleDipper.id !== tripleDipperId)
      );
    } catch (error) {
      // This should never happen.
      console.error(error);
    }
  }

  return (
    <main className={main}>
      <ItemBoxContainer
        itemValues={itemValues}
        addItemInput={addItemInput}
        disabled={itemInputs.length === 3}
      />
      <div className={right}>
        <TripleDipperBox
          itemValues={itemValues}
          itemInputs={itemInputs}
          setItemInputs={setItemInputs}
          removeItemInput={removeItemInput}
          addToCart={createTripleDipper}
        />
        <CartBox cart={cart} removeFromCart={destroyTripleDipper} />
      </div>
    </main>
  );
}
