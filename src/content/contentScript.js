
import './breakpointApp.jsx'
import './domInspectorApp.jsx'
import './toolbarApp.jsx';
import './SEOOverlayApp.jsx'

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'activatePanel') {
   
 
      window.dispatchEvent(new CustomEvent('toggle-toolbar-panel'))
  }
});



