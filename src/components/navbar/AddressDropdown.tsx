import Dropdown from '../generic/Dropdown';
import AddressDropdownItem from './AddressDropdownItem';
import Button from '../generic/Button';
import { addressString, Address } from '../../api/address';
import styles from './AddressDropdown.css';

type Props = {
  setModal(modal: string): void;
  address: Address | null;
  setAddress(address: Address | null): void;
  addresses: Address[];
};
export default function AddressDropdown({
  setModal,
  address,
  setAddress,
  addresses,
}: Props): JSX.Element {
  const noAddresses = addresses.length === 0;
  function handleClick() {
    if (noAddresses) setModal('address');
  }
  return (
    <div className={styles.dropdown}>
      <Dropdown
        title={address ? addressString(address) : 'Add an address'}
        outline={true}
        centerHeading={true}
        onClick={handleClick}
        canOpen={!noAddresses}
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
        <div className={styles.button}>
          <Button
            text="Add an address"
            fontSize="1rem"
            onClick={() => setModal('address')}
          />
        </div>
      </Dropdown>
    </div>
  );
}
