import ModalContext from '../../context/modal';
import Dropdown from '../generic/Dropdown';
import AddressDropdownItem from './AddressDropdownItem';
import Button from '../generic/Button';
import { addressString, Address } from '../../api/address';
import styles from './AddressDropdown.css';
import { useContext } from 'react';
import AddressModal from '../modal/address/AddressModal';

type Props = {
  address: Address | null;
  setAddress(address: Address | null): void;
  addAddress(address: Address): void;
  addresses: Address[];
};
export default function AddressDropdown({
  address,
  setAddress,
  addAddress,
  addresses,
}: Props): JSX.Element {
  const { setModal } = useContext(ModalContext);
  function showAddressModal(): void {
    setModal(<AddressModal setAddress={setAddress} addAddress={addAddress} />);
  }

  function handleClick() {
    if (addresses.length === 0) showAddressModal();
  }

  return (
    <div className={styles.dropdown}>
      <Dropdown
        title={address ? addressString(address) : 'Add an address'}
        outline={true}
        centerHeading={true}
        onClick={handleClick}
        canOpen={addresses.length > 0}
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
            onClick={showAddressModal}
          />
        </div>
      </Dropdown>
    </div>
  );
}
