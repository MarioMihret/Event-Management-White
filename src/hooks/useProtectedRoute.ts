import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function useProtectedRoute(allowedRoles?: string[]) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login', { state: { from: location }, replace: true });
      } else if (allowedRoles && !allowedRoles.includes(user.role)) {
        navigate('/', { replace: true });
      }
    }
  }, [user, loading, allowedRoles, navigate, location]);

  return { isAuthorized: !loading && user && (!allowedRoles || allowedRoles.includes(user.role)) };
}