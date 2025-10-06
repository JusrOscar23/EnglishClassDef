import { useContext } from 'react';
import { AppContext } from '../contexts/AuthContext';

export const useAuth = () => {
  return useContext(AppContext);
};