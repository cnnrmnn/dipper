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
        src={process.env.SERVER_URL + itemValue.imagePath}
        alt={itemValue.value}
      />
      <div className="item-box-text">
        <h3 className="item-box-heading">{itemValue.value}</h3>
        <p className="item-box-description">{itemValue.description}</p>
      </div>
    </div>
  );
}
