import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import NavigationMenu from './NavigationMenu';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate replace to='/login' />;
  }

  return (
    <>
      <NavigationMenu />
      <div className='min-h-screen bg-violet-50 md:ml-60'>{children}</div>
    </>
  );
};

export default ProtectedRoute;
