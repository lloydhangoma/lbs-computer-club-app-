// src/hooks/useAuth.jsx
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Path to your main AuthContext file

export function useAuth() {
  return useContext(AuthContext);
}