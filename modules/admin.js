// PANEL DE CONTROL CENTRAL - WILL-PAY (PROPIEDAD DE WILFREDO DONQUIZ)

let comisionNormal = 1.5;
let comisionNegocio = 5.0;
let modoAutomatico = false;

const mostrarPanelAdmin = () => {
    const main = document.getElementById('login-panel'); // O el contenedor que prefieras
    
    main.innerHTML = `
        <div style="padding: 20px; background: #000; color: #fff; font-family: 'Lexend';">
            <h2 style="color: var(--gold); border-bottom: 2px solid var(--gold);">🏛️ PANEL DE CONTROL MAESTRO</h2>
            
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <div style="flex: 1; background: #111; padding: 15px; border-radius: 10px; border-left: 5px solid #00ff00;">
                    <p style="font-size: 0.7rem; color: #888;">MIS GANANCIAS TOTALES</p>
                    <h3 id="total-ganancias">0.00 Bs</h3>
                </div>
                <div style="flex: 1; background: #111; padding: 15px; border-radius: 10px; border-left: 5px solid var(--gold);">
                    <p style="font-size: 0.7rem; color: #888;">TRANSACCIONES HOY</p>
                    <h3>0</h3>
                </div>
            </div>

            <div style="background: #111; padding: 20px; border-radius: 15px; margin-bottom: 20px;">
                <h4 style="margin-top:0;">🔧 AJUSTE DE COMISIONES (%)</h4>
                <div style="display: flex; gap: 20px; align-items: center;">
                    <div>
                        <label style="font-size: 0.7rem;">Normal:</label>
                        <input type="number" id="tasa-normal" value="${comisionNormal}" style="width: 60px; padding: 5px; margin-left: 5px;">
                    </div>
                    <div>
                        <label style="font-size: 0.7rem;">Negocio:</label>
                        <input type="number" id="tasa-negocio" value="${comisionNegocio}" style="width: 60px; padding: 5px; margin-left: 5px;">
                    </div>
                    <button onclick="actualizarTasas()" style="background: var(--gold); border:none; padding: 10px; border-radius: 5px; cursor:pointer; font-weight:bold;">GUARDAR</button>
                </div>
            </div>

            <div style="background: #111; padding: 20px; border-radius: 15px; margin-bottom: 20px; border: 1px solid #222;">
                <h4 style="margin-top:0; color: #00ff00;">💸 RECARGA DIRECTA DE SALDO</h4>
                <input type="tel" id="recarga-telf" placeholder="Número de Teléfono (0412...)" style="margin-bottom: 10px;">
                <input type="number" id="recarga-monto" placeholder="Monto en Bs">
                <button onclick="ejecutarRecargaDirecta()" style="width: 100%; background: #00ff00; border:none; padding: 15px; border-radius: 10px; font-weight:bold; cursor:pointer;">CARGAR SALDO INMEDIATO</button>
            </div>

            <div style="background: #1a1500; padding: 20px; border-radius: 15px; border: 1px solid var(--gold); display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h4 style="margin:0;">MODO AUTO-APROBACIÓN</h4>
                    <p style="font-size: 0.6rem; color: var(--gold);">Si se activa, el sistema aprueba todo solo.</p>
                </div>
                <label class="switch">
                    <input type="checkbox" id="auto-switch" onchange="toggleAutoModo()">
                    <span class="slider"></span>
                </label>
            </div>
        </div>
    `;
};

// --- LÓGICA ---

window.actualizarTasas = () => {
    comisionNormal = document.getElementById('tasa-normal').value;
    comisionNegocio = document.getElementById('tasa-negocio').value;
    alert(`Tasas actualizadas: Normal ${comisionNormal}% | Negocio ${comisionNegocio}%`);
};

window.ejecutarRecargaDirecta = () => {
    const telf = document.getElementById('recarga-telf').value;
    const monto = document.getElementById('recarga-monto').value;
    if(!telf || !monto) return alert("Faltan datos");
    alert(`✅ RECARGA EXITOSA: Se han enviado ${monto} Bs al número ${telf}.`);
};

window.toggleAutoModo = () => {
    modoAutomatico = document.getElementById('auto-switch').checked;
    const estado = modoAutomatico ? "ACTIVADO (El sistema aprobará solo)" : "DESACTIVADO (Tú apruebas)";
    alert(`🤖 MODO AUTOMÁTICO: ${estado}`);
};
