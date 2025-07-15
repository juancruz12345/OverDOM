
import { useEffect, useRef, useState } from 'react';
import { highlightElement, removeHighlight } from '../utils/domUtils';

export default function DOMNode({ node, hoveredIndex, selectedIndex, setSelectedIndex, nodeRefs }) {
  const ref = useRef(null);
  const [editingAttr, setEditingAttr] = useState(null);
  const [editingValue, setEditingValue] = useState('');
  const [editingText, setEditingText] = useState(null);

  useEffect(() => {
    if (node.index !== undefined) {
      nodeRefs[node.index] = ref;
    }
  }, [node, nodeRefs]);

  if (node.type === 'text') {
    return editingText !== null ? (
      <input
        type="text"
        value={editingText}
        onChange={(e) => setEditingText(e.target.value)}
        onBlur={() => {
          node.element.textContent = editingText;
          setEditingText(null);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            node.element.textContent = editingText;
            setEditingText(null);
          }
        }}
        style={{ fontFamily: 'monospace', fontSize: '0.9em' }}
      />
    ) : (
      <span
        style={{ color: '#999', cursor: 'pointer' }}
        onClick={() => setEditingText(node.content)}
      >
        "{node.content}"
      </span>
    );
  }

  const isHovered = node.index === hoveredIndex;
  const isSelected = node.index === selectedIndex;

  const handleAttrEdit = (key) => {
    setEditingAttr(key);
    setEditingValue(node.attributes[key]);
  };

  const confirmAttrEdit = (key) => {
    if (node.element) {
      node.element.setAttribute(key, editingValue);
      node.attributes[key] = editingValue;
    }
    setEditingAttr(null);
  };

  return (
    <div
      ref={ref}
      style={{
        marginLeft: '1em',
        background: isHovered ? '#eef6ff' : isSelected ? '#cde3ff' : 'transparent',
        borderRadius: '4px',
        padding: '2px',
        cursor: 'pointer'
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedIndex(node.index);
        highlightElement(node.element);
        node.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }}
      onMouseLeave={() => removeHighlight()}
    >
      <span style={{ color: '#007bff' }}>{`<${node.tag}`}</span>
      {Object.entries(node.attributes || {}).map(([key, value]) => (
        <span key={key} style={{ marginLeft: '4px' }}>
          {editingAttr === key ? (
            <>
              <span style={{ color: 'orange' }}>{key}=</span>
              <input
                type="text"
                value={editingValue}
                onChange={(e) => setEditingValue(e.target.value)}
                onBlur={() => confirmAttrEdit(key)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') confirmAttrEdit(key);
                }}
                style={{ fontFamily: 'monospace', fontSize: '0.9em' }}
                autoFocus
              />
            </>
          ) : (
            <span
              onClick={(e) => {
                e.stopPropagation();
                handleAttrEdit(key);
              }}
              style={{ color: '#795548' }}
            >
              {' '}{key}="{value}"
            </span>
          )}
        </span>
      ))}
      <span style={{ color: '#007bff' }}>{'>'}</span>

      {node.children?.map((child, idx) => (
        <DOMNode
          key={idx}
          node={child}
          hoveredIndex={hoveredIndex}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          nodeRefs={nodeRefs}
        />
      ))}

      <span style={{ color: '#007bff' }}>{`</${node.tag}>`}</span>
    </div>
  );
}
