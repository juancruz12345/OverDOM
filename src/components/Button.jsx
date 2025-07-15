import { useState } from 'react';

export default function Button({ icon, label, event }) {
  const [active, setActive] = useState(false);
 

  const wrapperStyle = {
    position: 'relative',
    width: '2.5em',
    height: '2.5em',
  };
const styleBtn = {
  width: '100%',
  height: '100%',
  cursor: 'pointer',
  background: active ? '#222' : '#fff',          // Negro si activo, blanco si no
  color: active ? '#fff' : '#222',               // Contraste invertido
  border: '1px solid #ccc',
  boxShadow: active
    ? 'inset 0 0 0 2px #222, 0 0 4px rgba(0,0,0,0.2)'
    : 'none',
  borderRadius: '0.5em',
  fontSize: '1.2em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
};

const tooltipStyle = {
  position: 'absolute',
  top: '50%',
  right: '110%',
  transform: 'translateY(-50%)',
  background: '#000',
  color: '#fff',
  padding: '0.3em 0.6em',
  borderRadius: '0.3em',
  whiteSpace: 'nowrap',
  fontSize: '0.75em',
  opacity: 0,
  pointerEvents: 'none',
  transition: 'opacity 0.2s ease',
  zIndex:9999
};

  const handleClick = () => {
    if (event) {
      window.dispatchEvent(new CustomEvent(event));
      setActive(prev => !prev);
    }
  };

  return (
    <div
      style={wrapperStyle}
      onMouseEnter={(e) => {
        const tooltip = e.currentTarget.querySelector('.tooltip');
        if (tooltip) tooltip.style.opacity = '1';
       
      }}
      onMouseLeave={(e) => {
        const tooltip = e.currentTarget.querySelector('.tooltip');
        if (tooltip) tooltip.style.opacity = '0';
       
      }}
    >
      <button style={styleBtn} onClick={handleClick}>
        {icon}
      </button>
      <div className="tooltip" style={tooltipStyle}>{label}</div>
    </div>
  );
}
