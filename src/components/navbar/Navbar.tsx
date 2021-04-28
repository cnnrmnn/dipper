import { useContext } from 'react';
import { logOut } from '../../api/authentication';
import UserContext from '../../context/user';
import AddressDropdown from './AddressDropdown';
import Button from '../generic/Button';
import Dropdown from '../generic/Dropdown';
import DropdownItem from '../generic/DropdownItem';
import { Address } from '../../api/address';
import styles from './Navbar.css';

type Props = {
  setModal(modal: string): void;
  address: Address | null;
  setAddress(address: Address | null): void;
  addresses: Address[];
};

export default function Navbar({
  setModal,
  address,
  setAddress,
  addresses,
}: Props): JSX.Element {
  const { user, setUser } = useContext(UserContext);

  async function handleLogOut(): Promise<void> {
    setUser(null);
    await logOut();
  }
  return (
    <nav className={styles.navbar}>
      <h1 className={styles.logo}>dipper</h1>
      {user && (
        <AddressDropdown
          setModal={setModal}
          address={address}
          setAddress={setAddress}
          addresses={addresses}
        />
      )}
      {user ? (
        <Dropdown title={`${user.firstName} ${user.lastName}`}>
          <DropdownItem text="Orders" onClick={() => setModal('orders')} />
          <DropdownItem text="Log out" onClick={handleLogOut} />
        </Dropdown>
      ) : (
        <Button
          text="Sign in"
          fontSize="1rem"
          handleClick={() => setModal('authentication')}
        />
      )}
    </nav>
  );
}
