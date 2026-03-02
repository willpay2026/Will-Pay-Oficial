// PANEL DE CONTROL MAESTRO - PROPIEDAD DE WILFREDO DONQUIZ
let ganancias = 1500.50; // Este es un ejemplo, luego lo conectaremos a la base real
let tasaNormal = 1.5;
let tasaNegocio = 5.0;

const mostrarPanelAdmin = () => {
    const content = document.getElementById('content-box');
    content.style.maxWidth = "500px";
    
    content.innerHTML = `
        <h2 style="color: var(--gold); font-size: 1.2rem;">🏛️ PANEL MAESTRO WILFREDO</h2>
        
        <div class="admin-section" style="border-left: 4px solid #00ff00; background: #0a0a0a; padding: 15px; border-radius: 10px; margin-bottom: 10px; text-align: left;">
            <span style="font-size: 0.6rem; color: #888; display: block;">MIS GANANCIAS POR COMISIÓN</span>
            <h2 style="margin: 5px 0; color: #00ff00;">${ganancias} Bs</h2>
        </div>

        <div class="admin-section" style="background: #111; padding: 15px; border-radius: 10px; margin-bottom: 10px; text-align: left;">
            <span style="font-size: 0.7rem; color: var(--gold); font-weight: bold;">🔧 AJUSTE DE TASAS (%)</span>
            <div style="display: flex; gap: 10px; margin-top: 10px;">
                <div style="flex:1">
                    <small style="font-size: 0.5rem; color: #555;">NORMAL</small>
                    <input type="number" id="t-normal" value="${tasaNormal}" style="margin:0; padding: 10px; font-size: 0.8rem;">
                </div>
                <div style="flex:1">
                    <small style="font-size: 0.5rem; color: #555;">NEGOCIO</small>
                    <input type="number" id="t-negocio" value="${tasaNegocio}" style="margin:0; padding: 10px; font-size: 0.8rem;">
                </div>
                <button onclick="guardarTasas()" style="background: var(--gold); border:none; border-radius: 8px; padding: 0 15px; font-weight: bold; cursor: pointer;">OK</button>
            </div>
        </div>

        <div class="admin-section" style="background: #111; padding: 15px; border-radius: 10px; margin-bottom: 10px; text-align: left; border: 1px solid #333;">
            <span style="font-size: 0.7rem; color: #00ff00; font-weight: bold;">💸 RECARGA DIRECTA</span>
            <input type="tel" id="r-telf" placeholder="Teléfono Socio" style="margin-top:10px; text-align: left;">
            <input type="number" id="r-monto" placeholder="Monto Bs" style="text-align: left;">
            <button class="btn-gold" onclick="recargar()" style="margin-top: 5px;">EJECUTAR CARGA</button>
        </div>

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
    
    if(!t || !m) return alert("❌ Jefe, falta el teléfono o el monto.");

    // Simulamos la generación de un correlativo único
    const correlativo = "WP-REC-" + Math.floor(Math.random() * 1000000);
    const fecha = new Date().toLocaleString();

    // Reemplazamos el panel por el Ticket Dorado
    const content = document.getElementById('content-box');
    content.innerHTML = `
        <div id="ticket-recarga" style="background: #fff; color: #000; padding: 25px; border-radius: 15px; font-family: 'Courier New', monospace; text-align: center; border: 4px double #ffcf40; box-shadow: 0 0 20px rgba(255, 207, 64, 0.5);">
            <img src="logonuevo.png" style="width: 80px; filter: grayscale(1) invert(1);">
            <h3 style="margin: 10px 0; font-size: 1.2rem;">WILL-PAY</h3>
            <p style="font-size: 0.7rem; border-bottom: 1px dashed #000; padding-bottom: 10px;">RECIBO DE CARGA DE SALDO</p>
            
            <div style="text-align: left; font-size: 0.8rem; line-height: 1.6;">
                <p><b>FECHA:</b> ${fecha}</p>
                <p><b>CORRELATIVO:</b> ${correlativo}</p>
                <p><b>TELÉFONO:</b> ${t}</p>
                <p><b>ESTADO:</b> <span style="background: #000; color: #fff; padding: 2px 5px;">APROBADO</span></p>
                <hr style="border: 1px dashed #ccc;">
                <p style="font-size: 1.1rem; text-align: center;"><b>MONTO: ${m} Bs</b></p>
            </div>
            
            <p style="font-size: 0.6rem; color: #666; margin-top: 15px;">"Construyendo el legado para Wilyanny Donquiz"</p>
            <button onclick="mostrarPanelAdmin()" style="background: #000; color: #fff; border: none; padding: 10px 20px; border-radius: 5px; margin-top: 15px; cursor: pointer; font-family: 'Lexend';">VOLVER AL PANEL</button>
        </div>
    `;
};
