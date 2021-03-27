import './ItemBox.css';
import { ItemValue } from '../api/value';

type Props = {
  itemValue: ItemValue;
};

export default function ItemBox({ itemValue }: Props): JSX.Element {
  return (
    <div className="item-box">
      <h4>{itemValue.value}</h4>
    </div>
  );
}
