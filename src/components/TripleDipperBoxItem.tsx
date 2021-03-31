import { Extra, Item } from '../api/item';
import { ItemInput } from '../api/cart';
import './TripleDipperBoxItem.css';

type Props = {
  item: Item;
  itemInput: ItemInput;
};

export default function TripleDipperBoxItem({
  item,
  itemInput,
}: Props): JSX.Element {
  function getExtra(valueId: number): Extra {
    return item.extras.find((extra) => extra.valueId === valueId) as Extra;
  }
  return (
    <div className="triple-dipper-box-item">
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
  );
}
