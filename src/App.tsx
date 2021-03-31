import { useEffect, useState } from 'react';
import ItemBoxContainer from './components/ItemBoxContainer';
import TripleDipperBox from './components/TripleDipperBox';
import { Item, getItems } from './api/item';
import { ItemInput } from './api/cart';
import './App.css';

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
  return (
    <>
      <h1>dipper</h1>
      <div className="app">
        <ItemBoxContainer items={items} addItemInput={addItemInput} />
        <TripleDipperBox
          items={items}
          itemInputs={itemInputs}
          setItemInputs={setItemInputs}
        />
      </div>
    </>
  );
}
