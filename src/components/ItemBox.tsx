import { useState } from 'react';
import { Item } from '../api/item';
import { ItemBoxButton } from './ItemBoxButton';
import { Select } from './Select';
import { ItemInput } from '../api/cart';
import './ItemBox.css';

type Props = {
  item: Item;
  addItemInput(itemInput: ItemInput): void;
  disabled: boolean;
};

export default function ItemBox({
  item,
  addItemInput,
  disabled,
}: Props): JSX.Element {
  const [extra, setExtra] = useState(item.extras[0].valueId.toString());
  return (
    <div className="item-box">
      <img
        className="item-box-image"
        src={process.env.SERVER_URL + item.imagePath}
        alt={item.value}
      />
      <div className="item-box-text">
        <div>
          <h3 className="item-box-heading">{item.value}</h3>
          <p className="item-box-description">{item.description}</p>
        </div>
        <Select setValue={setExtra} disabled={disabled}>
          {item.extras.map((extraValue) => (
            <option key={extraValue.valueId} value={extraValue.valueId}>
              {extraValue.value}
            </option>
          ))}
        </Select>
      </div>
      <ItemBoxButton
        disabled={disabled}
        addItem={() =>
          addItemInput({ valueId: item.valueId, extras: [parseInt(extra, 10)] })
        }
      />
    </div>
  );
}
