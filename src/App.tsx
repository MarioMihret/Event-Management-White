import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AuthLayout from './components/auth/AuthLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import AdminDashboard from './components/admin/AdminDashboard';
import OrganizerDashboard from './components/organizer/OrganizerDashboard';
import AttendeeDashboard from './components/attendee/AttendeeDashboard';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import BrowseEvents from './pages/BrowseEvents';
import EventDetails from './pages/EventDetails';
import PaymentCallback from './pages/PaymentCallback';
import VideoMeeting from './pages/VideoMeeting';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import { EventProvider } from './context/EventContext';

export default function App() {
  return (
    <EventProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Toaster position="top-right" />
          <Routes>
            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>

            {/* Protected Routes */}
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organizer-dashboard"
              element={
                <ProtectedRoute allowedRoles={['organizer']}>
                  <OrganizerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/attendee-dashboard"
              element={
                <ProtectedRoute allowedRoles={['attendee']}>
                  <AttendeeDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-event"
              element={
                <ProtectedRoute allowedRoles={['admin', 'organizer']}>
                  <CreateEvent />
                </ProtectedRoute>
              }
            />

            {/* Public Routes */}
            <Route
              path="/"
              element={<Home />}
            />
            <Route path="/events" element={<BrowseEvents />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/payment/callback" element={<PaymentCallback />} />
            <Route path="/meeting/:roomId" element={<VideoMeeting />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </EventProvider>
  );
}
