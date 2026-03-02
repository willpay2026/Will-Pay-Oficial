// PANEL DE CONTROL MAESTRO - PROPIEDAD DE WILFREDO DONQUIZ
let ganancias = 1500.50; 
window.modoAutomatico = window.modoAutomatico || false; 
window.solicitudesPendientes = window.solicitudesPendientes || [
    { nombre: "Ejemplo: Pedro Pérez", telf: "0412-1112233", fecha: "Hoy" }
]; 

window.mostrarPanelAdmin = () => {
    const content = document.getElementById('content-box');
    content.style.maxWidth = "500px";
    
    let listaSolicitudes = window.solicitudesPendientes.map((s, index) => `
        <div style="background: #111; padding: 12px; border-radius: 12px; margin-bottom: 8px; border-left: 4px solid var(--gold); display: flex; justify-content: space-between; align-items: center;">
            <div style="text-align: left;">
                <p style="margin: 0; font-size: 0.8rem; font-weight: bold; color: #fff;">${s.nombre}</p>
                <p style="margin: 0; font-size: 0.6rem; color: #666;">${s.telf}</p>
            </div>
            <button onclick="aprobarSocio(${index})" style="background: #00ff00; color: #000; border: none; padding: 8px 12px; border-radius: 8px; font-weight: bold; font-size: 0.6rem; cursor: pointer;">APROBAR</button>
        </div>
    `).join('');

    content.innerHTML = `
        <h2 style="color: var(--gold); font-size: 1.2rem; margin-bottom: 15px;">🏛️ PANEL MAESTRO</h2>
        
        <div style="background: linear-gradient(145deg, #0a0a0a, #111); padding: 20px; border-radius: 20px; border: 1px solid #222; margin-bottom: 20px; text-align: left;">
            <span style="font-size: 0.6rem; color: #888; letter-spacing: 1px;">MIS COMISIONES</span>
            <h2 style="margin: 5px 0; color: #00ff00; font-size: 2rem;">${ganancias.toFixed(2)} Bs</h2>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; background: #1a1500; padding: 15px; border-radius: 15px; border: 1px solid var(--gold); margin-bottom: 20px;">
            <div style="text-align: left;">
                <span style="display:block; font-size: 0.8rem; font-weight: bold; color: #fff;">MODO AUTOMÁTICO</span>
                <span style="font-size: 0.5rem; color: var(--gold);">${window.modoAutomatico ? 'ON - PUERTA ABIERTA' : 'OFF - CONTROL MANUAL'}</span>
            </div>
            <label class="switch">
                <input type="checkbox" id="sw-auto" ${window.modoAutomatico ? 'checked' : ''} onchange="toggleModoAuto()">
                <span class="slider"></span>
            </label>
        </div>

        <div style="text-align: left; margin-bottom: 20px;">
            <p style="color: var(--gold); font-size: 0.7rem; font-weight: bold; margin-bottom: 10px; border-bottom: 1px solid #222; padding-bottom: 5px;">🧬 SOLICITUDES EN ESPERA (${window.solicitudesPendientes.length})</p>
            <div style="max-height: 250px; overflow-y: auto;">
                ${listaSolicitudes || '<p style="color:#333; font-size:0.7rem; text-align:center;">No hay socios esperando.</p>'}
            </div>
        </div>

        <div style="display: flex; gap: 10px;">
            <button onclick="verLibroDeVida()" style="flex:1; background:#111; color:var(--gold); border:1px solid #333; padding:12px; border-radius:12px; font-weight:bold; cursor:pointer; font-size:0.7rem;">📖 RECARGAS</button>
            <button onclick="location.reload()" style="flex:1; background:#111; color:#ff4444; border:1px solid #333; padding:12px; border-radius:12px; font-weight:bold; cursor:pointer; font-size:0.7rem;">CERRAR SESIÓN</button>
        </div>
    `;
};

window.toggleModoAuto = () => {
    window.modoAutomatico = document.getElementById('sw-auto').checked;
    mostrarPanelAdmin();
};

window.aprobarSocio = (index) => {
    const socio = window.solicitudesPendientes[index];
    alert(`✅ Socio ${socio.nombre} aprobado.`);
    window.solicitudesPendientes.splice(index, 1);
    mostrarPanelAdmin();
};
