import { createRoot } from 'react-dom/client';
import BreakpointsPanel from '../components/BreakpointsPanel';

export function createBreakpointsReactPanel() {

  
  const existing = document.getElementById('breakpoints-panel-wrapper');
  if (existing) {
     window.__BREAKPOINTS_ROOT__?.unmount();
    existing.remove();
    return;
  }

  const container = document.createElement('div');
  container.id = 'breakpoints-panel-wrapper';
  container.style.position = 'fixed';
  container.style.zIndex = '3000';
  container.style.width = '0';
  container.style.height = '0';
  container.style.overflow = 'visible';

  const shadow = container.attachShadow({ mode: 'open' });
  const mount = document.createElement('div');
  shadow.appendChild(mount);
  document.body.appendChild(container);

  const root = createRoot(mount);
  root.render(<BreakpointsPanel />);

  window.__BREAKPOINTS_SHADOW__ = shadow;
  window.__BREAKPOINTS_ROOT__ = root
 
}




window.addEventListener('toggle-breakpoints-panel', createBreakpointsReactPanel)