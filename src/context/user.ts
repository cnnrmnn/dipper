import React from 'react';
import { User } from '../api/authentication';

export interface UserContextInterface {
  user: User | null;
  setUser(user: User | null): void;
}

export default React.createContext<UserContextInterface>({
  user: null,
  setUser: () => null,
});
