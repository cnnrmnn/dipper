import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/user';
import ItemBoxContainer from './ItemBoxContainer';
import TripleDipperBox from './TripleDipperBox';
import { Item, getItems } from '../api/item';
import { ItemInput } from '../api/cart';
import { main } from './Main.css';

type Props = {
  showAuthentication(): void;
};

export default function Main({ showAuthentication }: Props): JSX.Element {
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
    setItemInputs(itemInputs.filter((itemInput, i) => i !== index));
  }

  const { user } = useContext(UserContext);
  function addToCart(): void {
    if (!user) {
      showAuthentication();
      return;
    }
  }

  return (
    <main className={main}>
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
        addToCart={addToCart}
      />
    </main>
  );
}
