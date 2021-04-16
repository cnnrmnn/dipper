import { useState } from 'react';
import ItemBoxButton from './ItemBoxButton';
import Select from '../generic/Select';
import { ItemValue } from '../../api/value';
import { ItemInput } from '../../api/cart';
import { box, image, text, heading, description } from './ItemBox.css';

type Props = {
  itemValue: ItemValue;
  addItemInput(itemInput: ItemInput): void;
  disabled: boolean;
};

export default function ItemBox({
  itemValue,
  addItemInput,
  disabled,
}: Props): JSX.Element {
  const [extra, setExtra] = useState(itemValue.extras[0].valueId.toString());
  return (
    <div className={box}>
      <img
        className={image}
        src={process.env.SERVER_URL + itemValue.imagePath}
        alt={itemValue.value}
      />
      <div className={text}>
        <div>
          <h3 className={heading}>{itemValue.value}</h3>
          <p className={description}>{itemValue.description}</p>
        </div>
        <Select setValue={setExtra} disabled={disabled}>
          {itemValue.extras.map((extraValue) => (
            <option key={extraValue.valueId} value={extraValue.valueId}>
              {extraValue.value}
            </option>
          ))}
        </Select>
      </div>
      <ItemBoxButton
        disabled={disabled}
        addItem={() =>
          addItemInput({
            valueId: itemValue.valueId,
            extras: [parseInt(extra, 10)],
          })
        }
      />
    </div>
  );
}
