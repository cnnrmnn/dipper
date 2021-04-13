import { useContext } from 'react';
import { logOut } from '../api/authentication';
import UserContext from '../context/user';
import Button from './Button';
import Dropdown from './Dropdown';
import DropdownItem from './DropdownItem';
import { logo, navbar, dropdown } from './Navbar.css';

type Props = {
  showAuthenticationModal(): void;
};

export default function Navbar({
  showAuthenticationModal,
}: Props): JSX.Element {
  const { user, setUser } = useContext(UserContext);

  async function handleLogOut(): Promise<void> {
    setUser(null);
    await logOut();
  }
  return (
    <nav className={navbar}>
      <h1 className={logo}>dipper</h1>
      {user ? (
        <div className={dropdown}>
          <Dropdown title={`${user.firstName} ${user.lastName}`}>
            <DropdownItem text="Log out" onClick={handleLogOut} />
          </Dropdown>
        </div>
      ) : (
        <Button
          text="Sign in"
          fontSize="1rem"
          handleClick={showAuthenticationModal}
        />
      )}
    </nav>
  );
}
