import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../utils/auth';

export function useAuthRedirect() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const from = (location.state as any)?.from?.pathname || authService.getDashboardRoute();
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  return null;
}