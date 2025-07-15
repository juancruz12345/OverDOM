export function injectStyles(name) {
  const styleLink = document.createElement('link')
  styleLink.rel = 'stylesheet'
  styleLink.href = chrome.runtime.getURL(`styles/${name}`)
  document.head.appendChild(styleLink)
}