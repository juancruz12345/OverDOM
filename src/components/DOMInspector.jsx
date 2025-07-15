// 📁 src/components/DOMInspector.jsx
import { useEffect, useState, useRef } from 'react';
import DOMNode from './DOMnode';
import { buildDOMTree, highlightElement, removeHighlight, findNodeByElement, scrollToNodeInPanel } from '../utils/domUtils';
import { FileCode, Braces, Palette } from './Icons';
import ButtonDOM from './ButtonDOM';

export default function DOMInspector() {
  const [tree, setTree] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showStyles, setShowStyles] = useState(false);
  const [computedStyles, setComputedStyles] = useState('');
  const [filter, setFilter] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const nodeRefs = useRef({});

 useEffect(() => {
  const root = buildDOMTree(document.body)
  setTree(root)
}, [])


  useEffect(() => {
  const handleHover = (e) => {
    const el = e.target;
    const isInsideInspector =
      el.closest('#toolbar-container') ||
      el.closest('#dom-inspector-container') ||
      el.closest('#seo-overlay-panel');
    if (isInsideInspector || el.nodeType !== 1) return;

    const index = el.getAttribute('data-dom-index');
    if (index !== null) {
      highlightElement(el);
      setHoveredIndex(Number(index));
    } else {
      highlightElement(el);
      setHoveredIndex(null);
    }
  };

  const handleClick = (e) => {
    const el = e.target;
    const isInsideInspector =
      el.closest('#toolbar-container') ||
      el.closest('#dom-inspector-container') ||
      el.closest('#seo-overlay-panel');
    if (isInsideInspector) return;

    const node = findNodeByElement(tree, el);
    if (!node) return;

    setSelectedIndex(node.index);
    
    scrollToNodeInPanel(node.index, nodeRefs.current);
    setSelectedNode(node.element);
    
  };

  const clear = () => {
    removeHighlight();
    setHoveredIndex(null);
  };

  window.addEventListener('mouseover', handleHover, true)
  window.addEventListener('mouseout', clear, true)
  window.addEventListener('click', handleClick, true)

  return () => {
    window.removeEventListener('mouseover', handleHover, true);
    window.removeEventListener('mouseout', clear, true);

    window.removeEventListener('click', handleClick, true);
  };
}, [tree]);


  const showToastMsg = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const copyOuterHTML = () => {
    if (selectedNode) {
      navigator.clipboard.writeText(selectedNode.outerHTML);
      showToastMsg('✅ HTML copiado al portapapeles');
    }
  };

  const copyComputedStyles = () => {
    if (computedStyles) {
      navigator.clipboard.writeText(computedStyles);
      showToastMsg('✅ Estilos copiados al portapapeles');
    }
  };

  const viewComputedStyles = () => {
    if (selectedNode) {
      const styles = getComputedStyle(selectedNode);
      const entries = Array.from(styles).map(k => `${k}: ${styles.getPropertyValue(k)}`);
      const result = entries.join('\n');
      setComputedStyles(result);
      setShowStyles(true);
    }
  };

  useEffect(() => {
    window.__DOM_INSPECTOR__ = {
      copyOuterHTML,
      viewComputedStyles
    };
  }, [selectedNode, computedStyles]);

  const filteredStyles = computedStyles
    .split('\n')
    .filter(line => line.toLowerCase().includes(filter.toLowerCase()))
    .join('\n');


  

  return (
    <div
      id="dom-inspector-container"
      style={{
        position: 'fixed',
        right: 0,
        top: 0,
        width: 'min(90vw, 400px)',
        resize:'horizontal',
        height: '100%',
        overflow: 'auto',
        zIndex: 9000,
        fontFamily: 'monospace',
        fontSize: '0.9em',
        background: '#fff',
        borderLeft: '1px solid #ccc',
        boxShadow: '0 0 8px rgba(0,0,0,0.2)',
        padding: '1em'
      }}
    >
      <h3 style={{ fontFamily: 'sans-serif' }}>🧠 DOM Inspector</h3>

      <div style={{ display: 'flex', gap: '0.5em', marginBottom: '1em', justifyContent:'flex-end' }}>
      
          <ButtonDOM icon={<FileCode></FileCode>} label='Copiar HTML' fn={copyOuterHTML}></ButtonDOM>
        <ButtonDOM  icon={<Braces></Braces>} label='Ver estilos' fn={viewComputedStyles}></ButtonDOM>
      
     
      </div>

      {tree ? (
        <DOMNode
          node={tree}
          hoveredIndex={hoveredIndex}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          nodeRefs={nodeRefs.current}
        />
      ) : (
        'Cargando...'
      )}

      {showToast && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#28a745',
          color: 'white',
          padding: '10px 16px',
          borderRadius: '4px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          zIndex: 10001
        }}>
          {toastMessage}
        </div>
      )}

      {showStyles && (
        <div style={{
          position: 'fixed',
          top: '10%',
          left: '10%',
          width: '80%',
          height: '70%',
          background: '#ffffff',
          border: '1px solid #ccc',
          borderRadius: '6px',
          boxShadow: '0 0 10px rgba(0,0,0,0.3)',
          padding: '1em',
          overflow: 'auto',
          zIndex: 10000
        }}>
          <h4 style={{ fontFamily: 'sans-serif', marginTop: 0 }}>🎨 Estilos Computados</h4>
          <input
            type="text"
            placeholder="Buscar propiedad..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              width: '100%',
              padding: '6px',
              marginBottom: '0.5em',
              fontSize: '0.9em',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          <pre style={{ whiteSpace: 'pre-wrap' }}>{filteredStyles}</pre>
          <div style={{ display: 'flex', gap: '0.5em', marginTop: '1em' }}>
            <button onClick={copyComputedStyles}><Palette></Palette> Copiar estilos</button>
            <button onClick={() => setShowStyles(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
