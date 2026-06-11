import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/google-sans';
import '@fontsource/google-sans/500.css';
import '@fontsource/google-sans/700.css';
import './index.css';
import './App.css';
import App from './App.jsx';

// If the app was redirected here by the GitHub Pages 404 redirect helper
// (which appends `?redirect=/original/path`), restore the original path
// so BrowserRouter renders the correct route.
(function restorePathFromRedirect() {
  try {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get('redirect');
    if (redirect && redirect.startsWith('/') && !redirect.startsWith('//') && !redirect.startsWith('\\')) {
      window.history.replaceState({}, '', redirect);
    }
  } catch {
    // ignore
  }
})();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
