import { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/user';
import Dropdown from '../generic/Dropdown';
import AddressDropdownItem from './AddressDropdownItem';
import Button from '../generic/Button';
import { dropdown, button } from './AddressDropdown.css';
import { addressString, getAddresses, Address } from '../../api/address';

type Props = {
  showAddress(): void;
};
export default function AddressDropdown({ showAddress }: Props): JSX.Element {
  const [address, setAddress] = useState(null as Address | null);
  const [addresses, setAddresses] = useState([] as Address[]);

  const { user } = useContext(UserContext);
  useEffect(() => {
    async function updateAddresses(): Promise<void> {
      const addresses = await getAddresses();
      setAddresses(addresses);
      setAddress(addresses[0]);
    }
    updateAddresses();
  }, [user]);
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
