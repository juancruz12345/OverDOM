import { toggleOverlays, checkOverflows, generateSummary } from "../utils/breakpointsUtils";
import ButtonDOM from "./ButtonDOM";
import { SquareDashed, FileChart, Alert } from "./Icons";

export default function BreakpointsToolbar() {
  

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      background: '#fff',
      border: '1px solid #ccc',
      padding: '0.5rem',
      zIndex: 3000,
      borderRadius: '6px',
      boxShadow: '0 0 6px rgba(0,0,0,0.15)',
      display: 'flex',
      gap: '0.5rem',
      fontFamily: 'sans-serif',
    }}>
      <ButtonDOM icon={<SquareDashed></SquareDashed>} label={'Ver overlays'} fn={toggleOverlays}>Ver overlays</ButtonDOM>
      <ButtonDOM icon={<Alert></Alert>} label={'Detectar overflow'} fn={checkOverflows}>Detectar overflows</ButtonDOM>
      <ButtonDOM icon={<FileChart></FileChart>} label={'Resumen'} fn={generateSummary}>Resumen</ButtonDOM>
    </div>
  );
}
