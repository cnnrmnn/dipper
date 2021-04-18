import { Address, addressString } from '../../api/address';
import DropdownItem from '../generic/DropdownItem';
import { item, itemSelected } from './AddressDropdownItem.css';

type Props = {
  address: Address;
  selected: boolean;
  onClick(event: React.MouseEvent): void;
};

export default function AddressDropdownItem({
  address,
  selected,
  onClick,
}: Props): JSX.Element {
  const itemClass = item + (selected ? ` ${itemSelected}` : '');
  return (
    <div className={itemClass} onClick={onClick}>
      <DropdownItem text={addressString(address)} />
    </div>
  );
}
