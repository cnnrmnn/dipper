import './root.css';
import { useEffect, useState } from 'react';
import UserContext from './context/user';
import AuthenticationModal from './components/AuthenticationModal';
import { me, User } from './api/authentication';
import Navbar from './components/Navbar';
import Main from './components/Main';

export default function App(): JSX.Element {
  const [user, setUser] = useState(null as User | null);
  useEffect(() => {
    async function updateUser(): Promise<void> {
      setUser(await me());
    }
    updateUser();
  }, []);
  const [authentication, setAuthentication] = useState(false);
  function showAuthentication(): void {
    setAuthentication(true);
  }
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Navbar showAuthentication={showAuthentication} />
      <Main showAuthentication={showAuthentication} />
      {authentication && <AuthenticationModal setVisible={setAuthentication} />}
    </UserContext.Provider>
  );
}
