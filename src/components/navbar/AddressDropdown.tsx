import Dropdown from '../generic/Dropdown';
import AddressDropdownItem from './AddressDropdownItem';
import Button from '../generic/Button';
import { dropdown, button } from './AddressDropdown.css';

export default function AddressDropdown(): JSX.Element {
  return (
    <div className={dropdown}>
      <Dropdown
        title="13432 Andova Drive, Largo, FL 33774"
        outline={true}
        centerHeading={true}
      >
        <AddressDropdownItem
          text="13432 Andova Drive, Largo, FL 33774"
          selected={true}
          onClick={() => alert('Hi')}
        />
        <AddressDropdownItem
          text="150 Huntington Avenue ND7, Boston, MA, 02115"
          selected={false}
          onClick={() => alert('Hi')}
        />
        <div className={button}>
          <Button text="Add an address" fontSize="1rem" />
        </div>
      </Dropdown>
    </div>
  );
}
