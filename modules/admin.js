// PANEL DE CONTROL MAESTRO - PROPIEDAD DE WILFREDO DONQUIZ
let ganancias = 1500.50; 
let tasaNormal = 1.5;
let tasaNegocio = 5.0;

// Aquí guardaremos los tickets del "Libro de Vida"
let historialMovimientos = [];

const mostrarPanelAdmin = () => {
    const content = document.getElementById('content-box');
    content.style.maxWidth = "500px";
    content.style.background = "#080808"; // Reset de fondo por si venimos del ticket
    
    content.innerHTML = `
        <h2 style="color: var(--gold); font-size: 1.2rem;">🏛️ PANEL MAESTRO WILFREDO</h2>
        
        <div class="admin-section" style="border-left: 4px solid #00ff00; background: #0a0a0a; padding: 15px; border-radius: 10px; margin-bottom: 10px; text-align: left;">
            <span style="font-size: 0.6rem; color: #888; display: block;">MIS GANANCIAS POR COMISIÓN</span>
            <h2 style="margin: 5px 0; color: #00ff00;">${ganancias} Bs</h2>
        </div>

        <div class="admin-section" style="background: #111; padding: 15px; border-radius: 10px; margin-bottom: 10px; text-align: left; border: 1px solid #333;">
            <span style="font-size: 0.7rem; color: #00ff00; font-weight: bold;">💸 RECARGA DIRECTA</span>
            <input type="tel" id="r-telf" placeholder="Teléfono Socio" style="margin-top:10px; text-align: left;">
            <input type="number" id="r-monto" placeholder="Monto Bs" style="text-align: left;">
            <button class="btn-gold" onclick="recargar()" style="margin-top: 5px;">EJECUTAR CARGA</button>
        </div>

        <button onclick="verLibroDeVida()" style="width:100%; background:#1a1a1a; color:var(--gold); border:1px solid var(--gold); padding:15px; border-radius:12px; font-weight:bold; cursor:pointer; margin-bottom:10px;">
            📖 VER LIBRO DE VIDA (HISTORIAL)
        </button>

        <div class="admin-section" style="display: flex; justify-content: space-between; align-items: center; background: #1a1500; padding: 15px; border-radius: 10px; border: 1px solid var(--gold);">
            <div>
                <span style="display:block; font-size: 0.8rem; font-weight: bold; color: #fff;">SWITCH AUTOMÁTICO</span>
                <span style="font-size: 0.5rem; color: var(--gold);">Activa para aprobación masiva</span>
            </div>
            <label class="switch">
                <input type="checkbox" id="auto-sw" onchange="toggleAuto()">
                <span class="slider"></span>
            </label>
        </div>

        <button onclick="location.reload()" style="background:none; border:none; color:#444; margin-top: 20px; cursor:pointer; font-size: 0.7rem;">CERRAR SESIÓN MAESTRA</button>
    `;
};

window.recargar = () => {
    const t = document.getElementById('r-telf').value;
    const m = document.getElementById('r-monto').value;
    if(!t || !m) return alert("❌ Faltan datos.");

    const correlativo = "WP-REC-" + Math.floor(Math.random() * 1000000);
    const fecha = new Date().toLocaleString();

    // GUARDAMOS EN EL LIBRO DE VIDA
    historialMovimientos.unshift({ t, m, correlativo, fecha });

    generarTicket(t, m, correlativo, fecha);
};

// Función para mostrar el ticket dorado
const generarTicket = (t, m, correlativo, fecha) => {
    const content = document.getElementById('content-box');
    content.style.background = "none";
    content.style.border = "none";
    
    content.innerHTML = `
        <div id="ticket-confianza" style="background: #fff; color: #000; padding: 30px; border-radius: 20px; font-family: 'Courier New', monospace; text-align: center; border: 5px solid #ffcf40; box-shadow: 0 10px 30px rgba(255, 207, 64, 0.4); max-width: 350px; margin: 0 auto;">
            <img src="logonuevo.png" alt="Will-Pay" style="width: 90px; margin-bottom: 10px; filter: grayscale(100%) brightness(0);">
            <h3 style="margin: 0; font-size: 1.3rem;">WILL-PAY</h3>
            <p style="font-size: 0.75rem; border-bottom: 2px dashed #ffcf40; padding-bottom: 15px;">COMPROBANTE DE RECARGA</p>
            <div style="text-align: left; font-size: 0.85rem; line-height: 1.8; margin-top: 15px;">
                <p><b>FECHA:</b> ${fecha}</p>
                <p><b>CORRELATIVO:</b> ${correlativo}</p>
                <p><b>TELÉFONO:</b> ${t}</p>
                <p><b>ESTADO:</b> <span style="background: #000; color: #fff; padding: 3px 8px; border-radius: 5px;">APROBADO</span></p>
                <p style="font-size: 1.2rem; text-align: center; background: #eee; padding: 10px; border-radius: 10px; margin-top:10px;"><b>MONTO Bs: ${m}</b></p>
            </div>
            <p style="font-size: 0.75rem; color: #333; margin-top: 20px; font-weight: bold; font-family: 'Lexend';">"Tu billetera de confianza"</p>
            <button onclick="mostrarPanelAdmin()" style="background: #000; color: #fff; border: none; padding: 12px 25px; border-radius: 8px; margin-top: 20px; cursor: pointer; font-family: 'Lexend'; width: 100%;">VOLVER AL PANEL</button>
        </div>
    `;
};

// FUNCIÓN DEL LIBRO DE VIDA
window.verLibroDeVida = () => {
    const content = document.getElementById('content-box');
    let listaHTML = historialMovimientos.map((mov, index) => `
        <div onclick="reabrirTicket(${index})" style="background:#111; padding:15px; border-radius:10px; margin-bottom:10px; border-left:4px solid var(--gold); cursor:pointer; text-align:left;">
            <p style="margin:0; font-size:0.8rem; color:#fff;"><b>Monto: ${mov.m} Bs</b></p>
            <p style="margin:0; font-size:0.6rem; color:#888;">${mov.
