import { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/user';
import ModalContext from '../../context/modal';
import { logOut } from '../../api/authentication';
import OrdersModal from '../modal/order/OrdersModal';
import AddressDropdown from './AddressDropdown';
import Button from '../generic/Button';
import Dropdown from '../generic/Dropdown';
import DropdownItem from '../generic/DropdownItem';
import styles from './Navbar.css';
import { Address, getAddresses } from '../../api/address';
import { Order } from '../../api/order';
import { TripleDipper } from '../../api/cart';
import VerificationCodeModal from '../modal/authentication/VerificationCodeModal';

type Props = {
  appendToCart(tripleDippers: TripleDipper[]): void;
  orders: Order[];
  address: Address | null;
  setAddress(address: Address | null): void;
};

export default function Navbar({
  appendToCart,
  orders,
  address,
  setAddress,
}: Props): JSX.Element {
  const { user, setUser } = useContext(UserContext);
  const { setModal } = useContext(ModalContext);

  async function handleLogOut(): Promise<void> {
    setUser(null);
    await logOut();
  }

  function showOrdersModal(): void {
    setModal(<OrdersModal orders={orders} appendToCart={appendToCart} />);
  }

  function showVerificationCodeModal(): void {
    setModal(<VerificationCodeModal />);
  }

  const [addresses, setAddresses] = useState([] as Address[]);
  function addAddress(address: Address): void {
    setAddresses(addresses.concat(address));
  }

  useEffect(() => {
    async function updateAddresses(): Promise<void> {
      const addresses = await getAddresses();
      setAddresses(addresses);
      setAddress(addresses[0]);
    }
    updateAddresses();
  }, [user, setAddress]);

  return (
    <nav className={styles.navbar}>
      <h1 className={styles.logo}>dipper</h1>
      {user && (
        <div className={styles.dropdown}>
          <AddressDropdown
            address={address}
            setAddress={setAddress}
            addAddress={addAddress}
            addresses={addresses}
          />
        </div>
      )}
      {user ? (
        <Dropdown title={`${user.firstName} ${user.lastName}`}>
          <div className={styles.orders}>
            <DropdownItem text="Orders" onClick={showOrdersModal} />
          </div>
          <DropdownItem text="Log out" onClick={handleLogOut} />
        </Dropdown>
      ) : (
        <Button fontSize="1rem" onClick={showVerificationCodeModal}>
          Sign in
        </Button>
      )}
    </nav>
  );
}
