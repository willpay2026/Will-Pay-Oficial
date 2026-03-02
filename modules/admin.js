// PANEL MAESTRO - PROPIEDAD EXCLUSIVA DE WILFREDO DONQUIZ
let saldoBs = 25450.00;
let saldoWPC = 1200.00;
let saldoUSD = 550.00;
let misGananciasBs = 125.50;

// Variables de Control de Porcentajes
let porcPago = 1.5;
let porcRetiro = 2.0;
let porcMotoTaxi = 1.0;
let porcComercio = 3.0;

window.mostrarPanelAdmin = () => {
    const content = document.getElementById('content-box');
    content.style.maxWidth = "600px"; // Un poco más ancho para el tablero
    
    content.innerHTML = `
        <div style="text-align:center; margin-bottom:15px;">
            <h1 style="color:var(--gold); margin:0; font-size:1.8rem; letter-spacing:2px;">Will-Pay</h1>
            <p style="font-size:0.6rem; color:#555; margin:0;">ID DNA: CEO-001 | VENEZUELA</p>
            <h3 style="color:#fff; font-size:0.9rem; margin-top:5px; text-transform:uppercase;">Panel Maestro: Wilfredo Donquiz</h3>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 20px;">
            <div style="background:#000; border:1px solid #222; border-radius:15px; padding:12px; text-align:center;">
                <span style="font-size:0.5rem; color:#888;">SALDO BS</span>
                <h3 style="margin:5px 0; color:var(--gold); font-size:1rem;">${saldoBs.toFixed(2)}</h3>
            </div>
            <div style="background:#000; border:1px solid #222; border-radius:15px; padding:12px; text-align:center;">
                <span style="font-size:0.5rem; color:#888;">SALDO WPC</span>
                <h3 style="margin:5px 0; color:#fff; font-size:1rem;">${saldoWPC.toFixed(2)}</h3>
            </div>
            <div style="background:#000; border:1px solid #222; border-radius:15px; padding:12px; text-align:center;">
                <span style="font-size:0.5rem; color:#888;">SALDO USD ($)</span>
                <h3 style="margin:5px 0; color:#00ff00; font-size:1rem;">${saldoUSD.toFixed(2)}</h3>
            </div>
        </div>

        <div style="background:#080808; border:1px solid #1a1500; border-radius:20px; padding:15px; margin-bottom:15px; text-align:left;">
            <p style="font-size:0.7rem; color:var(--gold); font-weight:bold; margin-bottom:12px; border-bottom:1px solid #222; padding-bottom:5px;">⚙️ CONTROL DE PORCENTAJES</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <div>
                    <label style="font-size:0.6rem; color:#666;">% PAGOS GENERAL</label>
                    <input type="number" id="val-pago" value="${porcPago}" style="width:100%; background:#000; border:1px solid #333; color:var(--gold); padding:8px; border-radius:8px; margin-top:4px;">
                </div>
                <div>
                    <label style="font-size:0.6rem; color:#666;">% RETIROS GENERAL</label>
                    <input type="number" id="val-retiro" value="${porcRetiro}" style="width:100%; background:#000; border:1px solid #333; color:var(--gold); padding:8px; border-radius:8px; margin-top:4px;">
                </div>
            </div>

            <p style="font-size:0.6rem; color:#666; margin:15px 0 5px 0;">POR ACTIVIDAD ECONÓMICA</p>
            <div style="display: flex; gap: 10px; align-items: center;">
                <select id="actividad-sel" style="flex:2; background:#000; border:1px solid #333; color:#fff; padding:8px; border-radius:8px; font-size:0.7rem;">
                    <option value="Moto-Taxi">Moto-Taxi</option>
                    <option value="Comercio">Comercio / Tienda</option>
                    <option value="Vendedor">Vendedor Ambulante</option>
                </select>
                <input type="number" id="val-especial" placeholder="%" style="flex:1; background:#000; border:1px solid #333; color:var(--gold); padding:8px; border-radius:8px; text-align:center;">
                <button onclick="asignarComision()" style="flex:1; background:var(--gold); border:none; padding:8px; border-radius:8px; font-weight:bold; font-size:0.6rem; cursor:pointer;">APLICAR</button>
            </div>
        </div>

        <div style="background:linear-gradient(145deg, #050505, #111); border:1px solid #00ff0033; border-radius:20px; padding:15px; margin-bottom:15px; text-align:left;">
            <p style="font-size:0.6rem; color:#888; margin:0;">GANANCIAS ACUMULADAS (COMISIONES)</p>
            <h2 style="color:#00ff00; margin:5px 0; font-size:1.8rem;">Bs. ${misGananciasBs.toFixed(2)}</h2>
        </div>

        <div style="background:#111; border-radius:20px; padding:15px; margin-bottom:15px; text-align:left; border:1px solid #333;">
            <p style="font-size:0.7rem; color:var(--gold); font-weight:bold; margin-bottom:10px;">⚡ RECARGA SALDO A SOCIO</p>
            <input type="tel" id="rec-telf" placeholder="Número de Teléfono" style="margin-bottom:8px;">
            <input type="number" id="rec-monto" placeholder="Monto Bs." style="margin-bottom:10px;">
            <button onclick="ejecutarRecargaDirecta()" style="width:100%; background:#fff; color:#000; border:none; padding:12px; border-radius:12px; font-weight:bold; cursor:pointer; font-size:0.8rem;">ENVIAR RECARGA</button>
        </div>

        <button onclick="location.reload()" style="background:none; border:none; color:#333; margin-top:10px; cursor:pointer; font-size:0.7rem;">CERRAR SESIÓN MAESTRA</button>
    `;
};

window.asignarComision = () => {
    const act = document.getElementById('actividad-sel').value;
    const porc = document.getElementById('val-especial').value;
    alert(`✅ Comisión de ${porc}% asignada a: ${act}`);
};

window.ejecutarRecargaDirecta = () => {
    const telf = document.getElementById('rec-telf').value;
    const monto = document.getElementById('rec-monto').value;
    if(!telf || !monto) return alert("❌ Completa los datos de recarga");
    alert(`🚀 Recarga de ${monto} Bs enviada exitosamente al número ${telf}`);
    mostrarPanelAdmin();
};
