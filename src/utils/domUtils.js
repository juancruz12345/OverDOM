

export function buildDOMTree(element, counter = { value: 0 }) {
  if (
    !element ||
    element.id === 'toolbar-container' ||
    element.id === 'dom-inspector-container' ||
    element.id === 'seo-overlay-panel' ||
    element.id === 'breakpoints-panel' ||
    element.id === 'breakpoints-toolbar-root' ||
    element.id === 'breakpoints-nav-root'
  ) return null;

  const isTextNode = element.nodeType === 3;

  const node = {
    type: isTextNode ? 'text' : 'element',
    tag: isTextNode ? null : element.tagName?.toLowerCase(),
    content: isTextNode ? element.textContent : '',
    attributes: {},
    children: [],
    index: counter.value,
    element
  };

  
  if (!isTextNode && element.setAttribute) {
    element.setAttribute('data-dom-index', counter.value);
  }

  counter.value++;

  if (!isTextNode) {
    for (const attr of element.attributes) {
      node.attributes[attr.name] = attr.value;
    }

    for (const child of element.childNodes) {
      const childNode = buildDOMTree(child, counter);
      if (childNode) {
        node.children.push(childNode);
      }
    }
  }

  return node;
}


export function findNodeByIndex(node, index) {
  if (!node) return null;
  if (node.index === index) return node;
  for (const child of node.children || []) {
    const found = findNodeByIndex(child, index);
    if (found) return found;
  }
  return null;
}
export function findIndexByElement(node, el) {
  if (!node) return null;
  if (node.element === el) return node.index;
  for (const child of node.children || []) {
    const found = findIndexByElement(child, el);
    if (found !== null) return found;
  }
  return null;
}
export function findNodeByElement(node, targetElement) {
  if (!node) return null;
  if (node.element && node.element.isSameNode(targetElement)) return node;
  for (const child of node.children || []) {
    const found = findNodeByElement(child, targetElement);
    if (found) return found;
  }
  return null;
}





export function highlightElement(el) {
  removeHighlight();
  const rect = el.getBoundingClientRect();
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = `${rect.top}px`;
  overlay.style.left = `${rect.left}px`;
  overlay.style.width = `${rect.width}px`;
  overlay.style.height = `${rect.height}px`;
  overlay.style.background = 'rgba(0,123,255,0.2)';
  overlay.style.border = '1px solid #007bff';
  overlay.style.zIndex = '9998';
  overlay.style.pointerEvents = 'none';
  overlay.className = 'dom-highlight-overlay';
  document.body.appendChild(overlay);
}

export function removeHighlight() {
  document.querySelectorAll('.dom-highlight-overlay').forEach(el => el.remove());
}

export function scrollToNodeInPanel(index, nodeRefs) {
  const ref = nodeRefs[index];
  console.log(ref)
  if (ref && ref.current) {
    console.log(ref.current)
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

export function resetDomIndexCounter() {
  indexCounter = 0;
}
