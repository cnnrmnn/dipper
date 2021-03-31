import { useState } from 'react';
import ItemBoxButton from './ItemBoxButton';
import Select from './Select';
import { Item } from '../api/item';
import { ItemInput } from '../api/cart';
import { box, image, text, heading, description } from './ItemBox.css';

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
    <div className={box}>
      <img
        className={image}
        src={process.env.SERVER_URL + item.imagePath}
        alt={item.value}
      />
      <div className={text}>
        <div>
          <h3 className={heading}>{item.value}</h3>
          <p className={description}>{item.description}</p>
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
