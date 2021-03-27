import { useState, useEffect } from 'react';
import { ItemValue, getItemValues } from '../api/value';
import ItemBox from './ItemBox';
import './ItemBoxContainer.css';

export default function ItemBoxContainer(): JSX.Element {
  const [itemValues, setItemValues] = useState([] as ItemValue[]);
  useEffect(() => {
    async function updateItemValues(): Promise<void> {
      setItemValues(await getItemValues());
    }
    updateItemValues();
  }, []);

  return (
    <div className="item-box-container">
      {itemValues.map((itemValue) => (
        <ItemBox key={itemValue.valueId} itemValue={itemValue} />
      ))}
    </div>
  );
}
