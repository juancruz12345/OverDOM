
import Button from './Button';
import { LayoutDashboard, SquareMousePointer, SearchCheck } from './Icons';

export default function Toolbar() {



  
  const toolbarStyle = {
    position: 'fixed',
    top: '50%',
    right: '0',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end', 
    gap: '0.5em',
    zIndex: 3000,
    padding: '0.5em',
    overflow:'visible',
      pointerEvents: 'auto',
      background: '#fff',
  borderRadius: '12px 0 0 12px',
  border:'1px solid #ccc',
  boxShadow: '0 0 6px rgba(0,0,0,0.15)',
  }

 
  return (
   
    <div style={toolbarStyle}>
      <Button  icon={<LayoutDashboard/>} label="Breakpoints" event="toggle-breakpoints-panel" />
      <Button   icon={<SquareMousePointer/>} label="Inspector" event="toggle-dom-inspector" />
      <Button   icon={<SearchCheck/>} label="SEO" event='toggle-seo-overlay' />
    </div>
   
  )
}
