
import "./Popup.css";


export default function Popup() {

  const activatePanel= () => {
  
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'activatePanel' });
    });
  };


  return (
    <div className="popup-container">
      <h2>DOM Inspector</h2>
      <button onClick={activatePanel}>Activar OverDOM</button>
      
    </div>
  );
}