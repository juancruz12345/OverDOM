import { SmartPhone, Tablet, Laptop, Monitor } from "./Icons";


export default function BreakpointsHeader() {
  const breakpoints = [375, 768, 1024, 1440];
  const labels = [{comp:<SmartPhone/>,label:'Mobile'}, {comp:<Tablet/>,label:'Tablet'}, 
  {comp:<Laptop/>,label:'Laptop'}, {comp:<Monitor/>,label:'Desktop'}];

  const shadow = window.__BREAKPOINTS_SHADOW__;

  return (
    <nav style={{
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  padding: '10px 1rem',
  background: '#fff',
  borderBottom: '1px solid #ccc',
  zIndex: 3000,
  display: 'flex',
  gap: '1.5rem',
  justifyContent: 'center',
  fontFamily: 'sans-serif',
  boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
}}
>
      {breakpoints.map((bp, i) => (
        <a
          key={bp}
          
         onClick={(e) => {
          e.preventDefault()

          const shadow = window.__BREAKPOINTS_SHADOW__
          const target = shadow?.getElementById(`breakpoint-${bp}`)
          if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
          }}

         style={{
  textDecoration: 'none',
  fontSize: '13px',
  color: '#222',
  fontWeight: 500,
  padding: '6px 12px',
  borderRadius: '6px',
  transition: 'background 0.2s, color 0.2s',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.25em',
  minWidth: '60px',
  background: 'transparent',
}}
onMouseEnter={(e) => e.currentTarget.style.background = '#f1f1f1'}
onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}

        >
          {labels[i].comp}{labels[i].label}
        </a>
      ))}
    </nav>
  );
}
