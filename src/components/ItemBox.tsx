import { useState } from 'react';
import { ItemValue } from '../api/value';
import { Select } from './Select';
import './ItemBox.css';

type Props = {
  itemValue: ItemValue;
};

export default function ItemBox({ itemValue }: Props): JSX.Element {
  const [extra, setExtra] = useState(itemValue.extras[0].valueId.toString());
  return (
    <div className="item-box">
      <img
        className="item-box-image"
        src={process.env.SERVER_URL + itemValue.imagePath}
        alt={itemValue.value}
      />
      <div className="item-box-text">
        <div>
          <h3 className="item-box-heading">{itemValue.value}</h3>
          <p className="item-box-description">{itemValue.description}</p>
        </div>
        <Select setValue={setExtra}>
          {itemValue.extras.map((extraValue) => (
            <option key={extraValue.valueId} value={extraValue.valueId}>
              {extraValue.value}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}
