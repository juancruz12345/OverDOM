
import { createRoot } from 'react-dom/client';
import Toolbar from '../components/Toolbar';



export function createToolbar() {
  if (document.getElementById('toolbar-container')) return;

  const container = document.createElement('div');
  container.id = 'toolbar-container';
  container.style.position = 'fixed';
  container.style.zIndex = '2147483647';
  container.style.width = '0';
  container.style.height = '0';
  container.style.overflow = 'visible';
  


  const shadow = container.attachShadow({ mode: 'open' });
  const mount = document.createElement('div');
  shadow.appendChild(mount);
  document.body.appendChild(container);

  const root = createRoot(mount);
  root.render(<Toolbar/>);
}


function removePanel() {
  const domContainer = document.getElementById('dom-inspector-container');
  if (domContainer) {
    window.__DOMINSPECTOR_ROOT__?.unmount();
    domContainer.remove();
  }

  const breakpointsContainer = document.getElementById('breakpoints-panel-wrapper');
  if (breakpointsContainer) {
    window.__BREAKPOINTS_ROOT__?.unmount();
    breakpointsContainer.remove();
  }

  const toolbar = document.getElementById('toolbar-container');
  if (toolbar) {
    toolbar.remove();
  }
}



window.addEventListener('toggle-toolbar-panel', () => {
  const panel = document.getElementById('toolbar-container')
  if (panel) {
    removePanel()
  } else {
    createToolbar()
  }
})


