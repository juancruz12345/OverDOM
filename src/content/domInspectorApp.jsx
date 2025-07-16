import { createRoot } from 'react-dom/client';
import DOMInspector from '../components/DOMInspector';



export function toggleDOMInspector() {

  


  const externalHTMLBtn = document.getElementById('external-html-btn')
  if(externalHTMLBtn)externalHTMLBtn.remove()
  const externalStylesBtn = document.getElementById('external-styles-btn')
  if(externalStylesBtn)externalStylesBtn.remove()

  const existing = document.getElementById('dom-inspector-container');
  if (existing) {
     window.__DOMINSPECTOR_ROOT__?.unmount();
    existing.remove();
    return;
  }

  const container = document.createElement('div');
  container.id = 'dom-inspector-container';
  container.style.position = 'fixed';
  container.style.zIndex = '3000'; 
  container.style.width = '0';
  container.style.height = '0';
  container.style.overflow = 'visible';

  const shadow = container.attachShadow({ mode: 'open' })
  const mount = document.createElement('div')
  shadow.appendChild(mount)
  document.body.appendChild(container)

  const root = createRoot(mount)
  root.render(<DOMInspector />)

  window.__DOMINSPECTOR_ROOT__ = root
 

}


window.addEventListener('toggle-dom-inspector', toggleDOMInspector);