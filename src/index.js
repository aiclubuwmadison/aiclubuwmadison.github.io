import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// If the app was redirected here by the GitHub Pages 404 redirect helper
// (which appends `?redirect=/original/path`), restore the original path
// so BrowserRouter will render the correct route.
(function restorePathFromRedirect() {
  try {
    var params = new URLSearchParams(window.location.search);
    var redirect = params.get('redirect');
    if (redirect) {
      // Replace the current history entry with the original path
      window.history.replaceState({}, '', decodeURIComponent(redirect));
    }
  } catch (e) {
    // ignore if URLSearchParams isn't available or any other error
  }
})();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
