
export function toggleOverlays() {

    
  const breakpointWrappers = [
    'breakpoint-375',
    'breakpoint-768',
    'breakpoint-1024',
    'breakpoint-1440'
  ];

 
const shadow = window.__BREAKPOINTS_SHADOW__;
if (!shadow) return;

const iframes = breakpointWrappers
  .map(id => {
    const wrapper = shadow.getElementById(id);
   
    if (!wrapper) return null;
    return wrapper.querySelector('iframe');
  })
  .filter(Boolean);


  const toggleClass = '__overlay-active';

  iframes.forEach(iframe => {
    try {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const body = doc.body;

      if (!body.classList.contains(toggleClass)) {
        const elements = doc.querySelectorAll('*');
        elements.forEach(el => {
          const tag = el.tagName.toLowerCase();
          const classInfo = el.className ? `.${el.className}` : '';
          el.setAttribute('data-element-info', `${tag}${classInfo}`);
          el.style.outline = '2px dashed red';
          el.style.outlineOffset = '-2px';
        });
        body.classList.add(toggleClass);
      } else {
        const elements = doc.querySelectorAll('[data-element-info]');
        elements.forEach(el => {
          el.style.outline = '';
          el.removeAttribute('data-element-info');
        });
        body.classList.remove(toggleClass);
      }
    } catch (err) {
      console.warn('⚠️ No se puede acceder al iframe (posible CORS):', err);
    }
  });
}



export function checkOverflows() {
  const breakpointWrappers = ['breakpoint-375', 'breakpoint-768', 'breakpoint-1024', 'breakpoint-1440'];
  const shadow = window.__BREAKPOINTS_SHADOW__;
  if (!shadow) return;

  const warningBannerId = '__overflow-warning';

  breakpointWrappers.forEach(id => {
    const wrapper = shadow.getElementById(id);
    if (!wrapper) return;

    const iframe = wrapper.querySelector('iframe');
    if (!iframe) return;

    // Elimina banners anteriores
    const prev = wrapper.querySelector(`#${warningBannerId}`);
    if (prev) prev.remove();

    try {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const html = doc.documentElement;
      const scrollW = html.scrollWidth;
      const clientW = html.clientWidth;

      if (scrollW > clientW + 1) {
        const banner = document.createElement('div');
        banner.id = warningBannerId;
        banner.textContent = `🚨 Overflow detectado: ${scrollW}px > ${clientW}px`;
        Object.assign(banner.style, {
          backgroundColor: '#d32f2f',
          color: 'white',
          fontSize: '13px',
          padding: '6px 10px',
          borderRadius: '4px',
          marginBottom: '6px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          fontFamily: 'sans-serif',
          maxWidth: `${scrollW}px`,
          whiteSpace: 'nowrap'
        });

        wrapper.insertBefore(banner, iframe);
      }
    } catch (err) {
      console.warn(`⚠️ No se pudo analizar overflow para ${id}:`, err.message);
    }
  });
}

export function generateSummary() {
  const breakpointWrappers = [
    'breakpoint-375',
    'breakpoint-768',
    'breakpoint-1024',
    'breakpoint-1440'
  ];

  const shadow = window.__BREAKPOINTS_SHADOW__;
  if (!shadow) return;

  const resumen = [];

  const iframes = breakpointWrappers
    .map(id => {
      const wrapper = shadow.getElementById(id);
      if (!wrapper) return null;
      return wrapper.querySelector('iframe');
    })
    .filter(Boolean);

  iframes.forEach(iframe => {
    try {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const html = doc.documentElement;

      const width = iframe.width || iframe.style.width;
      const hasViewport = !!doc.querySelector('meta[name="viewport"]');
      const overflow = html.scrollWidth > html.clientWidth + 1;

      resumen.push({
        width: `${width}`,
        viewport: hasViewport ? '✅ Presente' : '❌ Ausente',
        overflow: overflow ? '⚠️ Sí' : '✅ No'
      });
    } catch (err) {
      resumen.push({
        width: iframe.width || 'Desconocido',
        error: '❌ No accesible (CORS)'
      });
    }
  });

  if (resumen.length === 0) {
    window.dispatchEvent(new CustomEvent('toast-message', { detail: 'No hay iframes disponibles' }));
    return;
  }

  showSummaryModal(resumen);
}





function showSummaryModal(data) {
  document.getElementById('__breakpoints-summary')?.remove();

  const modal = document.createElement('div');
  modal.id = '__breakpoints-summary';

  modal.innerHTML = `
    <style>
      #__breakpoints-summary {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2147483650;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: sans-serif;
      }

      .summary-backdrop {
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.4);
        top: 0;
        left: 0;
      }

      .summary-modal {
        position: relative;
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        z-index: 2;
        max-width: 520px;
        width: 90%;
        max-height: 80vh;
        overflow: auto;
        box-shadow: 0 8px 20px rgba(0,0,0,0.25);
        border: 1px solid #ddd;
        animation: fadeIn 0.2s ease-out;
      }

      .summary-modal h2 {
        margin-top: 0;
        font-size: 18px;
        margin-bottom: 1rem;
      }

      .summary-modal table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
      }

      .summary-modal th, .summary-modal td {
        border: 1px solid #ccc;
        padding: 8px 10px;
        text-align: left;
      }

      .summary-modal th {
        background: #f5f5f5;
        font-weight: 600;
      }

      .summary-modal button {
        margin-top: 1rem;
        padding: 6px 12px;
        background: #0d6efd;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
      }

      .summary-modal button:hover {
        background: #0b5ed7;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    </style>

    <div class="summary-backdrop"></div>
    <div class="summary-modal">
      <h2>📊 Resumen de Breakpoints</h2>
      <table>
        <thead>
          <tr>
            <th>Viewport</th>
            <th>Meta viewport</th>
            <th>Overflow</th>
          </tr>
        </thead>
        <tbody>
          ${data.map(r => `
            <tr>
              <td>${r.width}</td>
              <td>${r.viewport || r.error || '—'}</td>
              <td>${r.overflow || '—'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <button id="summary-close">Cerrar</button>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById('summary-close')?.addEventListener('click', () => {
    modal.remove();
  });
}
