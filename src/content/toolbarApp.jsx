import React from 'react';
import { createRoot } from 'react-dom/client';
import Toolbar from '../components/Toolbar';
import { removeBreakpointsPanel } from './breakpointApp';




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

let root;
  
const existing = document.getElementById('dom-inspector-container');
  if (existing) {
    root?.unmount();
    existing.remove();
    return;
  }
  removeBreakpointsPanel()

  /*const panel = document.getElementById('toolbar-container')
  if (panel) panel.remove()*/
  setActive(false)
}



window.addEventListener('toggle-toolbar-panel', () => {
  const panel = document.getElementById('toolbar-container')
  if (panel) {
    removePanel()
  } else {
    createToolbar()
  }
})


