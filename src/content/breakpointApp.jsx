





function createBreakpointsPanel() {
  if (document.getElementById('breakpoints-panel')) return

  const breakpoints = [
    { width: 375, height: 812, label: 'Mobile' },
    { width: 768, height: 1024, label: 'Tablet' },
    { width: 1024, height: 768, label: 'Laptop' },
    { width: 1440, height: 900, label: 'Desktop' }
  ]

  const panel = document.createElement('div')
  panel.id = 'breakpoints-panel'
  panel.style = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #fff;
    z-index: 2000;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5rem 1rem 3rem;
    gap: 4rem;
    box-sizing: border-box;
    font-family: sans-serif;
  `

  if (!document.getElementById('breakpoints-toolbar-root')) {
  createToolbar()
}

if (!document.getElementById('breakpoints-nav-root')) {
  createHeader()
}


  breakpoints.forEach(({ width, label }) => {
    const wrapper = document.createElement('div')
    wrapper.id = `breakpoint-${width}`
    const shadow = wrapper.attachShadow({ mode: 'open' })

    shadow.innerHTML = `
      <style>
        :host {
    all: initial;
    display: block;
    width: fit-content;
    margin: 0 auto;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .label {
    margin-bottom: 0.5rem;
    font-size: 14px;
    font-weight: bold;
    color: #444;
  }

  iframe {
    border: 1px solid #ccc;
    background: white;
    width: ${width}px;
    height:400px;
    scroll-margin-top: 60px; 
    resize:both;
    overflow:scroll;
  }


  iframe[data-width="375"] {
  width: 375px;
  }

  iframe[data-width="768"] {
  width: 768px;
  }

  iframe[data-width="1024"] {
  width: 1024px;
  }

  iframe[data-width="1440"] {
  width: 1440px;
  }
  </style>
     <div class="container">
      <div class="label">${label} (${width}px)</div>
      <iframe src="${window.location.href}" title="${label} (${width}px)"></iframe>
     </div>
    `

    const iframe = shadow.querySelector('iframe')
    iframe.width = width
    
    iframe.onload = () => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow.document
        const meta = doc.querySelector('meta[name="viewport"]')

        if (!meta) {
          const injected = doc.createElement('meta')
          injected.name = 'viewport'
          injected.content = `width=${width}, initial-scale=1`
          doc.head.appendChild(injected)
        }

        
        const elements = doc.querySelectorAll('*')
        elements.forEach(el => {
          const tag = el.tagName.toLowerCase()
          const classInfo = el.className ? `.${el.className}` : ''
          el.setAttribute('data-element-info', `${tag}${classInfo}`)
        })
      } catch (err) {
        console.warn('No se pudo modificar el iframe:', err.message)
      }
    }

    panel.appendChild(wrapper)
  })

  document.body.appendChild(panel)

}




export function removeBreakpointsPanel() {
  const panel = document.getElementById('breakpoints-panel')
  const tooltip = document.getElementById('hover-explanation')
  const nav = document.getElementById('breakpoints-nav-root')
  const toolbar = document.getElementById('breakpoints-toolbar-root')
  
  if (panel) panel.remove()
  if (tooltip) tooltip.remove()
  if(nav)nav.remove()
  if(toolbar)toolbar.remove()
}





//////PANEL///////////////////////////////
function createHeader() {
  if (document.getElementById('breakpoints-nav-root')) return

  const navContainer = document.createElement('div')
  navContainer.id = 'breakpoints-nav-root'
  const shadow = navContainer.attachShadow({ mode: 'open' })

  shadow.innerHTML = `
    <style>
      :host {
        all: initial;
        display: block;
      }
      nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        padding: 10px 1rem;
        background: #fff;
        border-bottom: 1px solid #ccc;
        z-index: 3000;
        display: flex;
        gap: 1rem;
        justify-content: center;
        font-family: sans-serif;
      }
      nav a {
        text-decoration: none;
        font-size: 14px;
        color: #007bff;
        font-weight: bold;
        padding: 4px 8px;
        border-radius: 4px;
        transition: background 0.2s;
      }
      nav a:hover {
        background: rgba(0, 123, 255, 0.1);
      }
    </style>
    <nav>
      <a href="#breakpoint-375">📱 Mobile</a>
      <a href="#breakpoint-768">📟 Tablet</a>
      <a href="#breakpoint-1024">💻 Laptop</a>
      <a href="#breakpoint-1440">🖥️ Desktop</a>
    </nav>
  `

  document.body.appendChild(navContainer)


  requestAnimationFrame(() => {
    const links = shadow.querySelectorAll('a')
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const hash = link.getAttribute('href')?.slice(1)
        const target = document.getElementById(hash)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
          console.warn('No se encontró el ID destino:', hash)
        }
      })
    })
  })
}

function createToolbar() {
  if (document.getElementById('breakpoints-toolbar-root')) return

  const toolbarContainer = document.createElement('div')
  toolbarContainer.id = 'breakpoints-toolbar-root'
  const shadow = toolbarContainer.attachShadow({ mode: 'open' })

  shadow.innerHTML = `
    <style>
      :host {
        all: initial;
        display: block;
      }
      #toolbar {
        position: fixed;
        bottom: 10px;
        right: 10px;
        background: #fff;
        border: 1px solid #ccc;
        padding: 0.5rem;
        z-index: 3000;
        border-radius: 6px;
        box-shadow: 0 0 6px rgba(0,0,0,0.15);
        display: flex;
        gap: 0.5rem;
        font-family: sans-serif;
      }

      #toolbar button {
        font-size: 1em;
        padding: 4px 8px;
        cursor: pointer;
        background: #fff;
        color: #222;
        border: 1px solid #ccc;
        border-radius: 0.5em;
      #toolbar button:hover{
        background:grey;
      }

     
    </style>

    <div id="toolbar">
      <button id="overlayBtn">Ver overlays</button>
      <button id="overflowBtn">Detectar overflows</button>
      <button id="summaryBtn">Resumen</button>
    </div>
  `

  document.body.appendChild(toolbarContainer)

  // Eventos
  const overlayBtn = shadow.getElementById('overlayBtn')
  const overflowBtn = shadow.getElementById('overflowBtn')
  const summaryBtn = shadow.getElementById('summaryBtn')

  overlayBtn?.addEventListener('click', toggleOverlays)
  overflowBtn?.addEventListener('click', checkOverflows)
  summaryBtn?.addEventListener('click', generateSummary)
}


function toggleOverlays() {
  
const breakpointWrappers = [
  'breakpoint-375',
  'breakpoint-768',
  'breakpoint-1024',
  'breakpoint-1440'
]

const iframes = breakpointWrappers.map(id => {
  const wrapper = document.getElementById(id)
  if (!wrapper || !wrapper.shadowRoot) return null
  return wrapper.shadowRoot.querySelector('iframe')
}).filter(Boolean) 

  const toggleClass = '__overlay-active'

  iframes.forEach(iframe => {
    try {
      const doc = iframe.contentDocument || iframe.contentWindow.document
      const body = doc.body

      if (!body.classList.contains(toggleClass)) {
        const elements = doc.querySelectorAll('*')
        elements.forEach(el => {
          const tag = el.tagName.toLowerCase()
          const classInfo = el.className ? `.${el.className}` : ''
          el.setAttribute('data-element-info', `${tag}${classInfo}`)
          el.style.outline = '2px dashed red'
          el.style.outlineOffset = '-2px'
        })
        body.classList.add(toggleClass)
      } else {
        const elements = doc.querySelectorAll('[data-element-info]')
        elements.forEach(el => {
          el.style.outline = ''
          el.removeAttribute('data-element-info')
        })
        body.classList.remove(toggleClass)
      }
    } catch (err) {
      console.warn('No se puede acceder al iframe (posiblemente por CORS):', err)
    }
  })
}


function checkOverflows() {
  const breakpointWrappers = [
  'breakpoint-375',
  'breakpoint-768',
  'breakpoint-1024',
  'breakpoint-1440'
]

const iframes = breakpointWrappers.map(id => {
  const wrapper = document.getElementById(id)
  if (!wrapper || !wrapper.shadowRoot) return null
  return wrapper.shadowRoot.querySelector('iframe')
}).filter(Boolean) 

  iframes.forEach(iframe => {
    try {
      const doc = iframe.contentDocument || iframe.contentWindow.document
      const html = doc.documentElement

      const scrollW = html.scrollWidth
      const clientW = html.clientWidth

      const warningBannerId = '__overflow-warning'
      let warning = iframe.previousElementSibling
      if (warning?.id === warningBannerId) warning.remove()

      if (scrollW > clientW) {
        const banner = document.createElement('div')
        banner.id = warningBannerId
        banner.textContent = `⚠️ Overflow detectado: ${scrollW}px vs viewport ${clientW}px`
        banner.style.color = 'white'
        banner.style.background = 'red'
        banner.style.padding = '4px 8px'
        banner.style.fontSize = '12px'
        banner.style.marginBottom = '4px'
        banner.style.fontFamily = 'sans-serif'
        banner.style.borderRadius = '4px'
        iframe.before(banner)
      }
    } catch (err) {
      console.warn('No se pudo analizar overflow:', err)
    }
  })
}

function generateSummary() {
  const breakpointWrappers = [
  'breakpoint-375',
  'breakpoint-768',
  'breakpoint-1024',
  'breakpoint-1440'
]

const iframes = breakpointWrappers.map(id => {
  const wrapper = document.getElementById(id)
  if (!wrapper || !wrapper.shadowRoot) return null
  return wrapper.shadowRoot.querySelector('iframe')
}).filter(Boolean) 

  const resumen = []

  iframes.forEach(iframe => {
    try {
      const doc = iframe.contentDocument || iframe.contentWindow.document
      const html = doc.documentElement

      const width = iframe.width
      const hasViewport = !!doc.querySelector('meta[name="viewport"]')
      const overflow = html.scrollWidth > html.clientWidth

      resumen.push({
        width: `${width}px`,
        viewport: hasViewport ? '✅ presente' : '❌ ausente',
        overflow: overflow ? '⚠️ sí' : '✅ no'
      })
    } catch (err) {
      resumen.push({
        width: `${iframe.width}px`,
        error: '❌ No accesible (CORS)'
      })
    }
  })

  showSummaryModal(resumen)
}

function showSummaryModal(data) {
  // Eliminar anterior si existe
  document.getElementById('__breakpoints-summary')?.remove()

  const modal = document.createElement('div')
  modal.id = '__breakpoints-summary'
  modal.innerHTML = `
    <div class="summary-backdrop"></div>
    <style>
    #__breakpoints-summary {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2147483650;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
}

.summary-backdrop {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  top: 0;
  left: 0;
}

.summary-modal {
  position: relative;
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  z-index: 2;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 0 10px rgba(0,0,0,0.4);
}

.summary-modal h2 {
  margin-top: 0;
  font-size: 18px;
}

.summary-modal table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.summary-modal th, .summary-modal td {
  padding: 6px 10px;
  border: 1px solid #ccc;
  font-size: 14px;
  text-align: left;
}

.summary-modal button {
  margin-top: 1rem;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
}
</style>
    <div class="summary-modal">
      <h2>📊 Resumen de breakpoints</h2>
      <table>
        <thead>
          <tr><th>Viewport</th><th>Viewport tag</th><th>Overflow</th></tr>
        </thead>
        <tbody>
          ${data.map(r => `
            <tr>
              <td>${r.width}</td>
              <td>${r.viewport || r.error || '—'}</td>
              <td>${r.overflow || '—'}</td>
            </tr>`).join('')}
        </tbody>
      </table>
      <button id="summary-close">Cerrar</button>
    </div>
  `
  document.body.appendChild(modal)

  document.getElementById('summary-close').onclick = () => modal.remove()
}






window.addEventListener('toggle-breakpoints-panel', () => {
  const panel = document.getElementById('breakpoints-panel')
  if (panel) {
    removeBreakpointsPanel()
  } else {
    createBreakpointsPanel()
    
  }
})