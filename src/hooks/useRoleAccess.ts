import { useAuth } from './useAuth';

export function useRoleAccess() {
  const { user } = useAuth();

  const canCreateEvent = () => {
    return user?.role === 'admin' || user?.role === 'organizer';
  };

  const canEditEvent = (eventOrganizerId: string) => {
    return user?.role === 'admin' || (user?.role === 'organizer' && eventOrganizerId === user.id);
  };

  const canDeleteEvent = (eventOrganizerId: string) => {
    return user?.role === 'admin' || (user?.role === 'organizer' && eventOrganizerId === user.id);
  };

  const canViewEventDashboard = (eventOrganizerId: string) => {
    return user?.role === 'admin' || (user?.role === 'organizer' && eventOrganizerId === user.id);
  };

  const canRegisterForEvent = () => {
    return user?.role === 'attendee' || user?.role === 'organizer';
  };

  return {
    canCreateEvent,
    canEditEvent,
    canDeleteEvent,
    canViewEventDashboard,
    canRegisterForEvent,
  };
}