// PANEL DE CONTROL MAESTRO - PROPIEDAD DE WILFREDO DONQUIZ
let ganancias = 1500.50; 
let tasaNormal = 1.5;
let tasaNegocio = 5.0;
let historialMovimientos = [];

// Función Principal que llama el index.html
window.mostrarPanelAdmin = () => {
    const content = document.getElementById('content-box');
    content.style.maxWidth = "500px";
    content.style.background = "#080808"; 
    
    content.innerHTML = `
        <h2 style="color: #ffcf40; font-size: 1.2rem;">🏛️ PANEL MAESTRO WILFREDO</h2>
        
        <div class="admin-section" style="border-left: 4px solid #00ff00; background: #0a0a0a; padding: 15px; border-radius: 10px; margin-bottom: 10px; text-align: left;">
            <span style="font-size: 0.6rem; color: #888; display: block;">MIS GANANCIAS POR COMISIÓN</span>
            <h2 style="margin: 5px 0; color: #00ff00;">${ganancias} Bs</h2>
        </div>

        <div class="admin-section" style="background: #111; padding: 15px; border-radius: 10px; margin-bottom: 10px; text-align: left; border: 1px solid #333;">
            <span style="font-size: 0.7rem; color: #00ff00; font-weight: bold;">💸 RECARGA DIRECTA</span>
            <input type="tel" id="r-telf" placeholder="Teléfono Socio" style="margin-top:10px; text-align: left; width: 100%; padding: 10px; background: #000; border: 1px solid #333; color: #fff; border-radius: 8px;">
            <input type="number" id="r-monto" placeholder="Monto Bs" style="margin-top:10px; text-align: left; width: 100%; padding: 10px; background: #000; border: 1px solid #333; color: #fff; border-radius: 8px;">
            <button onclick="recargar()" style="width: 100%; background: #ffcf40; color: #000; border: none; padding: 15px; border-radius: 12px; font-weight: bold; margin-top: 10px; cursor: pointer;">EJECUTAR CARGA</button>
        </div>

        <button onclick="verLibroDeVida()" style="width:100%; background:#1a1a1a; color:#ffcf40; border:1px solid #ffcf40; padding:15px; border-radius:12px; font-weight:bold; cursor:pointer; margin-bottom:10px;">
            📖 VER LIBRO DE VIDA
        </button>

        <div style="display: flex; justify-content: space-between; align-items: center; background: #1a1500; padding: 15px; border-radius: 10px; border: 1px solid #ffcf40;">
            <div>
                <span style="display:block; font-size: 0.8rem; font-weight: bold; color: #fff;">MODO AUTOMÁTICO</span>
                <span style="font-size: 0.5rem; color: #ffcf40;">Aprobación masiva</span>
            </div>
            <label class="switch">
                <input type="checkbox" id="auto-sw" onchange="toggleAuto()">
                <span class="slider"></span>
            </label>
        </div>

        <button onclick="location.reload()" style="background:none; border:none; color:#444; margin-top: 20px; cursor:pointer; font-size: 0.7rem;">CERRAR SESIÓN</button>
    `;
};

window.recargar = () => {
    const t = document.getElementById('r-telf').value;
    const m = document.getElementById('r-monto').value;
    if(!t || !m) return alert("❌ Faltan datos.");

    const correlativo = "WP-REC-" + Math.floor(Math.random() * 1000000);
    const fecha = new Date().toLocaleString();
    historialMovimientos.unshift({ t, m, correlativo, fecha });

    // Generar el Ticket de Confianza
    const content = document.getElementById('content-box');
    content.innerHTML = `
        <div style="background: #fff; color: #000; padding: 30px; border-radius: 20px; font-family: 'Courier New', monospace; text-align: center; border: 5px solid #ffcf40;">
            <img src="logonuevo.png" style="width: 80px; filter: grayscale(1) brightness(0);">
            <h3 style="margin: 10px 0;">WILL-PAY</h3>
            <div style="text-align: left; font-size: 0.8rem; border-top: 1px solid #eee; padding-top: 10px;">
                <p><b>FECHA:</b> ${fecha}</p>
                <p><b>TELÉFONO:</b> ${t}</p>
                <p><b>REF:</b> ${correlativo}</p>
                <h2 style="text-align: center; background: #eee; padding: 10px;">${m} Bs</h2>
            </div>
            <p style="font-size: 0.7rem; font-weight: bold; margin-top: 20px;">"Tu billetera de confianza"</p>
            <button onclick="mostrarPanelAdmin()" style="width: 100%; background: #000; color: #fff; border: none; padding: 10px; border-radius: 8px; cursor: pointer;">VOLVER</button>
        </div>
    `;
};

window.verLibroDeVida = () => {
    const content = document.getElementById('content-box');
    let listaHTML = historialMovimientos.map(mov => `
        <div style="background:#111; padding:10px; border-radius:8px; margin-bottom:5px; border-left:3px solid #ffcf40; text-align:left;">
            <p style="margin:0; font-size:0.8rem;"><b>${mov.m} Bs</b> - ${mov.t}</p>
            <p style="margin:0; font-size:0.5rem; color:#888;">${mov.fecha}</p>
        </div>
    `).join('');

    content.innerHTML = `
        <h2 style="color: #ffcf40;">📖 LIBRO DE VIDA</h2>
        <div style="max-height: 300px; overflow-y: auto;">${listaHTML || 'Sin movimientos'}</div>
        <button onclick="mostrarPanelAdmin()" style="width:100%; background:#ffcf40; padding:15px; border-radius:12px; font-weight:bold; margin-top:10px; border:none; cursor:pointer;">VOLVER</button>
    `;
};

window.toggleAuto = () => { alert("Modo cambiado"); };
