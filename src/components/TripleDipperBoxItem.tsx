import { Extra, Item } from '../api/item';
import { ItemInput } from '../api/cart';
import './TripleDipperBoxItem.css';
import { CSSTransition } from 'react-transition-group';
import { useState, useEffect } from 'react';
import TripleDipperBoxItemButton from './TripleDipperBoxItemButton';

type Props = {
  item: Item;
  itemInput: ItemInput;
  removeItemInput(): void;
};

export default function TripleDipperBoxItem({
  item,
  itemInput,
  removeItemInput,
}: Props): JSX.Element {
  const [inProp, setInProp] = useState(false);
  function getExtra(valueId: number): Extra {
    return item.extras.find((extra) => extra.valueId === valueId) as Extra;
  }
  useEffect(() => setInProp(true), []);
  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={500}
      classNames="triple-dipper-box-item"
    >
      <div className="triple-dipper-box-item">
        <div className="triple-dipper-box-item-content">
          <img
            className="triple-dipper-box-item-image"
            src={process.env.SERVER_URL + item.imagePath}
          />
          <div className="triple-dipper-box-item-text">
            <h3 className="triple-dipper-box-item-heading">{item.value}</h3>
            <p className="triple-dipper-box-item-description">
              {getExtra(itemInput.extras[0]).value}
            </p>
          </div>
        </div>
        <TripleDipperBoxItemButton removeItemInput={removeItemInput} />
      </div>
    </CSSTransition>
  );
}
