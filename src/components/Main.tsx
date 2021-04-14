import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/user';
import ItemBoxContainer from './ItemBoxContainer';
import TripleDipperBox from './TripleDipperBox';
import { ItemValue, getItemValues } from '../api/value';
import { ItemInput } from '../api/cart';
import { main } from './Main.css';

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
        itemValues={itemValues}
        addItemInput={addItemInput}
        disabled={itemInputs.length === 3}
      />
      <TripleDipperBox
        itemValues={itemValues}
        itemInputs={itemInputs}
        setItemInputs={setItemInputs}
        removeItemInput={removeItemInput}
        addToCart={addToCart}
      />
    </main>
  );
}
