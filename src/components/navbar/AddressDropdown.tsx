import Dropdown from '../generic/Dropdown';
import AddressDropdownItem from './AddressDropdownItem';
import Button from '../generic/Button';
import { dropdown, button } from './AddressDropdown.css';
import { addressString, Address } from '../../api/address';

type Props = {
  showAddress(): void;
  address: Address | null;
  setAddress(address: Address | null): void;
  addresses: Address[];
};
export default function AddressDropdown({
  showAddress,
  address,
  setAddress,
  addresses,
}: Props): JSX.Element {
  return (
    <div className={dropdown}>
      <Dropdown
        title={address ? addressString(address) : 'Add an address'}
        outline={true}
        centerHeading={true}
      >
        <>
          {addresses.map((a) => (
            <AddressDropdownItem
              address={a}
              selected={a.id === address?.id}
              key={a.id}
              onClick={() => {
                setAddress(a);
              }}
            />
          ))}
        </>
        <div className={button}>
          <Button
            text="Add an address"
            fontSize="1rem"
            handleClick={showAddress}
          />
        </div>
      </Dropdown>
    </div>
  );
}
