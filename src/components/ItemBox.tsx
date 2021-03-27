import { ItemValue } from '../api/value';
import './ItemBox.css';

type Props = {
  itemValue: ItemValue;
};

export default function ItemBox({ itemValue }: Props): JSX.Element {
  return (
    <div className="item-box">
      <img
        className="item-box-image"
        src="https://i.ibb.co/7WrZ8n5/97fd828addb04f04e8e6b374214f4d8b.png"
        alt={itemValue.value}
      />
      <div className="item-box-text">
        <h5 className="item-box-heading">{itemValue.value}</h5>
        <p className="item-box-description">
          Fried onion petals with a crispy, flaky breading.
        </p>
      </div>
    </div>
  );
}
