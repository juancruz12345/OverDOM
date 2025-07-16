import { useEffect, useRef } from 'react';

export default function BreakpointFrame({ width, label }) {
  const iframeRef = useRef(null);
  
  useEffect(() => {
    const iframe = iframeRef.current;
    iframe.onload = () => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow.document;

        if (!doc.querySelector('meta[name="viewport"]')) {
          const meta = doc.createElement('meta');
          meta.name = 'viewport';
          meta.content = `width=${width}, initial-scale=1`;
          doc.head.appendChild(meta);
        }

        doc.querySelectorAll('*').forEach(el => {
          const tag = el.tagName.toLowerCase();
          const classInfo = el.className ? `.${el.className}` : '';
          el.setAttribute('data-element-info', `${tag}${classInfo}`);
        });
      } catch (err) {
        console.warn('Error al modificar iframe:', err.message);
      }
    };
  }, [width]);

  return (
    <div id={`breakpoint-${width}`} style={{ width: 'fit-content', margin: '0 auto' }}>
      <div style={{ marginBottom: '0.5rem', fontSize: '14px', fontWeight: 'bold', color: '#444', textAlign: 'center' }}>
        {label} ({width}px)
      </div>
      <iframe
        ref={iframeRef}
        src={window.location.href}
        title={`${label} (${width}px)`}
        style={{
          border: '1px solid #ccc',
          background: 'white',
          width: `${width}px`,
          height: '400px',
          resize: 'both',
          overflow: 'scroll'
        }}
      />
    </div>
  );
}
