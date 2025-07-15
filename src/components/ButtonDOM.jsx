

export default function ButtonDOM({ icon, label, fn }) {
  
 
  const wrapperStyle = {
    position: 'relative',
  display: 'inline-block',
  zIndex:9999
  }
const styleBtn = {
  minWidth: '2.5rem',
minHeight: '2.5rem',

  cursor: 'pointer',
  background: '#fff',          
  color: '#222',               
  border: '1px solid #ccc',
  borderRadius: '0.5em',
  fontSize: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
}

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
  fontSize: '0.9em',
  opacity: 0,
  pointerEvents: 'none',
  transition: 'opacity 0.2s ease',
  zIndex:9999
}

 
  return (
    <div
      style={wrapperStyle}
      onMouseEnter={(e) => {
        const tooltip = e.currentTarget.querySelector('.tooltip')
        if (tooltip) tooltip.style.opacity = '1'
       
      }}
      onMouseLeave={(e) => {
        const tooltip = e.currentTarget.querySelector('.tooltip')
        if (tooltip) tooltip.style.opacity = '0'
       
      }}
    >
      <button style={styleBtn} onClick={fn}>
        {icon}
      </button>
      <div className="tooltip" style={tooltipStyle}>{label}</div>
    </div>
  );
}