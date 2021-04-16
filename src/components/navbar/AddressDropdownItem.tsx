import DropdownItem from '../generic/DropdownItem';
import { item, itemSelected } from './AddressDropdownItem.css';

type Props = {
  text: string;
  selected: boolean;
  onClick(event: React.MouseEvent<HTMLLIElement>): void;
};

export default function AddressDropdownItem({
  text,
  selected,
  onClick,
}: Props): JSX.Element {
  const itemClass = item + (selected ? ` ${itemSelected}` : '');
  return (
    <div className={itemClass}>
      <DropdownItem text={text} onClick={onClick} />
    </div>
  );
}
