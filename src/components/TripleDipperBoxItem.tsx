import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import TripleDipperBoxItemButton from './TripleDipperBoxItemButton';
import { Extra, Item } from '../api/item';
import { ItemInput } from '../api/cart';
import './TripleDipperBoxItem.css';

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
  const [inProp, setInProp] = useState(true);
  function getExtra(valueId: number): Extra {
    return item.extras.find((extra) => extra.valueId === valueId) as Extra;
  }
  return (
    <CSSTransition
      in={inProp}
      appear={true}
      timeout={500}
      classNames="triple-dipper-box-item"
      onExited={removeItemInput}
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
        <TripleDipperBoxItemButton removeItemInput={() => setInProp(false)} />
      </div>
    </CSSTransition>
  );
}
