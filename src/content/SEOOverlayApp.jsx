import { createRoot } from 'react-dom/client';
import SEOOverlay from '../components/SEOOverlay';

export function toggleSEOOverlay() {
  const existing = document.getElementById('seo-overlay-container');
  if (existing) {
     window.__SEOOVERLAY_ROOT__?.unmount();
    existing.remove();
    return;
  }

  const container = document.createElement('div');
  container.id = 'seo-overlay-container';
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.zIndex = '3000';

  const shadow = container.attachShadow({ mode: 'open' });
  const mount = document.createElement('div');
  shadow.appendChild(mount);
  document.body.appendChild(container);

  const root = createRoot(mount);
  root.render(<SEOOverlay />);

  window.__SEOOVERLAY_ROOT__ = root
  

}


window.addEventListener('toggle-seo-overlay', toggleSEOOverlay);
