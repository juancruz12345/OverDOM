
import { useEffect, useState } from 'react';



function runChecks() {
  let score = 0;
  const details = [];

  const addResult = (label, passed, weight) => {
    if (passed) score += weight;
    details.push({ label, passed, weight });
  };

  // HEAD
  addResult('<title> presente', !!document.querySelector('title'), 10);
  addResult('<meta description>', !!document.querySelector('meta[name="description"]'), 10);
  const canonical = document.querySelector('link[rel="canonical"]');
  addResult('Canonical válido', !!canonical && canonical.href.startsWith('http'), 10);

  // H1
  const h1s = document.querySelectorAll('h1');
  addResult('Solo un <h1>', h1s.length === 1, 10);

  // IMG alt
  const imgs = document.querySelectorAll('img');
  const imgsWithoutAlt = Array.from(imgs).filter(img => !img.alt?.trim());
  addResult('Todas las imágenes con alt', imgsWithoutAlt.length === 0, 10);

  // ENLACES
  const links = document.querySelectorAll('a');
  const nonDescriptiveLinks = Array.from(links).filter(a => {
    const text = a.textContent.toLowerCase().trim();
    return text === 'click here' || text === 'aquí' || text.length < 4;
  });
  addResult('Enlaces con texto descriptivo', nonDescriptiveLinks.length === 0, 5);

  const dummyLinks = Array.from(links).filter(a => a.getAttribute('href') === '#');
  addResult('Sin enlaces dummy (#)', dummyLinks.length === 0, 5);

  // ACCESIBILIDAD
  const htmlLang = document.documentElement.getAttribute('lang');
  addResult('<html lang> presente', !!htmlLang, 5);

  const total = details.reduce((acc, r) => acc + r.weight, 0);
  const percentage = Math.round((score / total) * 100);
  const level = percentage >= 80 ? '✅ Bueno' : percentage >= 60 ? '⚠️ Mejorable' : '❌ Bajo';

  return { score: percentage, level, details };
}

export default function SEOOverlay() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const results = runChecks();
    setData(results);

    // enviar datos a background
    chrome.runtime?.sendMessage?.({
      action: 'pageData',
      payload: {
        title: document.title,
        url: window.location.href,
        headings: [...document.querySelectorAll('h1')].map(h => h.textContent)
      }
    });
  }, []);

  if (!data) return null;

  const { score, level, details } = data;
  const passed = details.filter(d => d.passed);
  const failed = details.filter(d => !d.passed);

  const Section = ({ title, icon, items, color }) => (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ fontWeight: 'bold', borderBottom: '1px solid #ddd', paddingBottom: 4, marginBottom: 6 }}>
        {title}
      </div>
      <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
        {items.length > 0 ? items.map((item, i) => (
          <li key={i} style={{ color, marginBottom: 4, fontSize: '0.85rem' }}>
            {icon} {item.label}
          </li>
        )) : <li style={{ fontSize: '0.85rem' }}>—</li>}
      </ul>
    </div>
  );

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      left: '10px',
      width: '40vw',
      maxHeight: '80vh',
      background: '#fff',
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '1rem',
      fontFamily: 'monospace',
      fontSize: '0.85rem',
      boxShadow: '0 0 8px rgba(0,0,0,0.2)',
      overflowY: 'auto',
      zIndex: 2147483647
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontFamily: 'sans-serif' }}>🔍 SEO Audit</h3>
      </div>

      <div style={{ marginTop: '0.5rem', fontSize: '1rem', fontWeight: 'bold' }}>
        {score}/100 – <span>{level}</span>
      </div>

      <Section title="✅ Correcto" icon="✅" items={passed} color="green" />
      <Section title="❌ Problemas" icon="❌" items={failed} color="red" />
    </div>
  );
}
