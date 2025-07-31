import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
<<<<<<< HEAD
import App from './App';
import { AuthProvider } from './context/AuthProvider';
=======
import App from './App.tsx';
>>>>>>> 34a2d352adaefa9df4bc1ecb6a50c8f0fdd37605
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
<<<<<<< HEAD
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
=======
    <App />
  </StrictMode>
);
>>>>>>> 34a2d352adaefa9df4bc1ecb6a50c8f0fdd37605
