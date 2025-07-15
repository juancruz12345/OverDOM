import browser from "webextension-polyfill";

console.log("Hello from the background!");

browser.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed:", details);
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'inspectDOM') {
    // Mantener el service worker activo
  }
});
