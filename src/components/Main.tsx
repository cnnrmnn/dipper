import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/user';
import ModalContext from '../context/modal';
import ItemBoxContainer from './item/ItemBoxContainer';
import TripleDipperBox from './cart/TripleDipperBox';
import CartBox from './cart/CartBox';
import OrdersBox from './order/OrdersBox';
import { ItemValue, getItemValues } from '../api/value';
import { Order } from '../api/order';
import {
  ItemInput,
  TripleDipper,
  addToCart,
  removeFromCart,
} from '../api/cart';
import { Address } from '../api/address';
import styles from './Main.css';
import VerificationCodeModal from './modal/authentication/VerificationCodeModal';

type Props = {
  cart: TripleDipper[];
  setCart(cart: TripleDipper[]): void;
  appendToCart(tripleDippers: TripleDipper[]): void;
  addOrder(order: Order): void;
  orders: Order[];
  address: Address | null;
};

export default function Main({
  cart,
  setCart,
  appendToCart,
  addOrder,
  orders,
  address,
}: Props): JSX.Element {
  const { user } = useContext(UserContext);
  const { setModal } = useContext(ModalContext);

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
      setModal(<VerificationCodeModal />);
      return;
    }
    // Remove id field
    const tripleDipper = await addToCart(
      itemInputs.map(({ id, ...rest }) => rest)
    );
    appendToCart([tripleDipper]);
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
      {user && (
        <div className={`${styles.sidebar} ${styles.left}`}>
          <OrdersBox orders={orders} appendToCart={appendToCart} />
        </div>
      )}
      <div className={styles.center}>
        <ItemBoxContainer
          itemValues={itemValues}
          addItemInput={addItemInput}
          disabled={itemInputs.length === 3}
        />
      </div>
      <div className={styles.sidebar}>
        <TripleDipperBox
          itemValues={itemValues}
          itemInputs={itemInputs}
          setItemInputs={setItemInputs}
          removeItemInput={removeItemInput}
          addToCart={createTripleDipper}
        />
        <CartBox
          addOrder={addOrder}
          address={address}
          cart={cart}
          removeFromCart={destroyTripleDipper}
        />
      </div>
    </main>
  );
}
