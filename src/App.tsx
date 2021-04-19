import './root.css';
import { useEffect, useState } from 'react';
import UserContext from './context/user';
import { me, User } from './api/authentication';
import Navbar from './components/navbar/Navbar';
import Main from './components/Main';
import Modals from './components/modal/Modals';

export default function App(): JSX.Element {
  const [user, setUser] = useState(null as User | null);
  useEffect(() => {
    async function updateUser(): Promise<void> {
      setUser(await me());
    }
    updateUser();
  }, []);
  const [modal, setModal] = useState('');

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div id="app">
        <Navbar
          showAuthentication={() => setModal('authentication')}
          showAddress={() => setModal('address')}
        />
        <Main showAuthentication={() => setModal('authentication')} />
      </div>
      {modal && <Modals modal={modal} setModal={setModal} />}
    </UserContext.Provider>
  );
}
