import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary'

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

// Register service worker for PWA
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', async () => {
    if (isSafari) {
      const resetKey = 'cz-sw-reset';
      if (!sessionStorage.getItem(resetKey)) {
        sessionStorage.setItem(resetKey, '1');
        try {
          const registrations = await navigator.serviceWorker.getRegistrations();
          await Promise.all(registrations.map((registration) => registration.unregister()));
          if ('caches' in window) {
            const cacheNames = await caches.keys();
            await Promise.all(cacheNames.map((name) => caches.delete(name)));
          }
        } finally {
          window.location.reload();
        }
      } else {
        sessionStorage.removeItem(resetKey);
      }
      return;
    }

    navigator.serviceWorker.register('/chinesezodiac/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
