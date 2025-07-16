import { useEffect } from 'react';
import BreakpointFrame from './BreakpointFrame';
import BreakpointsHeader from './BreakpointsHeader';
import BreakpointsToolbar from './BreakpointsToolbar';

const breakpoints = [
  { width: 375, height: 812, label: 'Mobile' },
  { width: 768, height: 1024, label: 'Tablet' },
  { width: 1024, height: 768, label: 'Laptop' },
  { width: 1440, height: 900, label: 'Desktop' }
];

export default function BreakpointsPanel() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      id="breakpoints-panel"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#fff',
        zIndex: 2000,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '5rem 1rem 3rem',
        gap: '4rem',
        boxSizing: 'border-box',
        fontFamily: 'sans-serif',
      }}
    >
      <BreakpointsHeader />
      {breakpoints.map(bp => (
        <BreakpointFrame key={bp.width} {...bp} />
     
      ))}
      <BreakpointsToolbar />
    </div>
  );
}
