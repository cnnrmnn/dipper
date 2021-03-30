import { useState, useEffect } from 'react';
import { Item, getItems } from '../api/item';
import ItemBox from './ItemBox';
import './ItemBoxContainer.css';

export default function ItemBoxContainer(): JSX.Element {
  const [itemValues, setItemValues] = useState([] as Item[]);
  useEffect(() => {
    async function updateItemValues(): Promise<void> {
      setItemValues(await getItems());
    }
    updateItemValues();
  }, []);

  return (
    <div className="item-box-container">
      {itemValues.map((itemValue) => (
        <ItemBox key={itemValue.valueId} item={itemValue} />
      ))}
    </div>
  );
}
