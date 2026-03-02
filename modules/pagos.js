// PANEL DE OPERACIONES WILL-PAY - TU BILLETERA DE CONFIANZA
let miSaldo = 0.00; 
let capturasUsadas = []; // Para que no repitan el mismo pago

window.mostrarDashboardUsuario = () => {
    const content = document.getElementById('content-box');
    content.style.maxWidth = "420px";
    
    content.innerHTML = `
        <img src="logonuevo.png" style="width: 140px; margin-bottom: 10px;">
        
        <div style="background: linear-gradient(145deg, #0f0f0f, #000); border: 2px solid var(--gold); border-radius: 25px; padding: 20px; margin-bottom: 15px;">
            <p style="color: #888; margin: 0; font-size: 0.7rem;">SALDO WILL-PAY</p>
            <h1 style="color: var(--gold); margin: 5px 0; font-size: 2.5rem;">${miSaldo.toFixed(2)} Bs</h1>
            <button onclick="abrirModuloRecarga()" style="background: #1a1a1a; color: var(--gold); border: 1px solid var(--gold); padding: 8px 15px; border-radius: 20px; font-size: 0.7rem; font-weight: bold; cursor: pointer; margin-top: 5px;">+ RECARGAR SALDO</button>
        </div>

        <div style="display: flex; gap: 10px; margin-bottom: 20px;">
            <button onclick="activarModo('PAGAR')" style="flex: 1; background: var(--gold); color: #000; border: none; padding: 15px; border-radius: 12px; font-weight: bold; cursor: pointer;">PAGAR</button>
            <button onclick="activarModo('COBRAR')" style="flex: 1; background: #1a1a1a; color: #fff; border: 1px solid #333; padding: 15px; border-radius: 12px; font-weight: bold; cursor: pointer;">COBRAR</button>
        </div>

        <div id="area-operacion" style="background: #0f0f0f; border: 1px dashed #333; border-radius: 20px; padding: 20px; min-height: 200px; display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 20px;">
            <p style="color: #444; font-size: 0.8rem;">Seleccione una operación</p>
        </div>

        <div style="text-align: left; background: #0a0a0a; padding: 15px; border-radius: 20px; border: 1px solid #1a1a1a;">
            <p style="color: var(--gold); font-size: 0.7rem; font-weight: bold; margin-bottom: 10px; border-bottom: 1px solid #222; padding-bottom: 5px;">MOVIMIENTOS RECIENTES</p>
            <div id="tabla-movimientos" style="font-size: 0.8rem; color: #555; text-align: center;">Sin movimientos hoy</div>
        </div>
    `;
};

// --- MÓDULO DE RECARGA (TUS DATOS) ---
window.abrirModuloRecarga = () => {
    const area = document.getElementById('area-operacion');
    area.innerHTML = `
        <div style="text-align: left; width: 100%;">
            <p style="color: var(--gold); font-weight: bold; font-size: 0.9rem; margin-bottom: 10px; text-align: center;">DATOS PARA PAGO MÓVIL</p>
            <div style="background: #1a1a1a; padding: 15px; border-radius: 15px; border: 1px solid #333; line-height: 1.6;">
                <p style="margin: 0; font-size: 0.8rem; color: #bbb;">Banco: <b style="color:#fff;">Banesco</b></p>
                <p style="margin: 0; font-size: 0.8rem; color: #bbb;">Teléfono: <b style="color:#fff;">04126602555</b></p>
                <p style="margin: 0; font-size: 0.8rem; color: #bbb;">ID: <b style="color:#fff;">13496133</b></p>
            </div>
            
            <p style="font-size: 0.6rem; color: #888; margin-top: 15px; text-align: center;">Ingrese el número de referencia del capture:</p>
            <input type="number" id="ref-pago" placeholder="Últimos 6 dígitos" style="width: 100%; padding: 12px; margin-top: 5px; background: #000; border: 1px solid var(--gold); color: #fff; border-radius: 10px; text-align: center;">
            
            <button onclick="enviarNotificacionRecarga()" style="width: 100%; background: var(--gold); color: #000; padding: 12px; border-radius: 10px; margin-top: 10px; font-weight: bold; border: none; cursor: pointer;">NOTIFICAR PAGO</button>
            <button onclick="mostrarDashboardUsuario()" style="width: 100%; background: transparent; color: #666; font-size: 0.7rem; border: none; margin-top: 10px; cursor: pointer;">CANCELAR</button>
        </div>
    `;
};

window.enviarNotificacionRecarga = () => {
    const ref = document.getElementById('ref-pago').value;
    
    if(!ref || ref.length < 4) return alert("❌ Ingrese una referencia válida.");

    // VALIDACIÓN DE CAPTURE USADO
    if(capturasUsadas.includes(ref)) {
        alert("🚨 ERROR: Este número de referencia ya fue reportado anteriormente. Intento de fraude detectado.");
    } else {
        capturasUsadas.push(ref);
        alert("✅ ¡Reporte enviado con éxito! Wilfredo validará su pago en unos minutos para aprobar su balance.");
        mostrarDashboardUsuario();
    }
};

window.activarModo = (modo) => {
    const area = document.getElementById('area-operacion');
    if(modo === 'PAGAR') {
        area.innerHTML = `
            <input type="number" id="monto-qr" oninput="generarQR()" placeholder="Bs. 0" style="background: transparent; border: none; border-bottom: 2px solid var(--gold); color: #fff; font-size: 2.5rem; text-align: center; width: 80%; margin-bottom: 15px; outline: none;">
            <div id="qrcode" style="background: #fff; padding: 10px; border-radius: 10px; border: 4px solid var(--gold);">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=WillPay-Listo" style="width: 150px;">
            </div>
            <p style="font-size: 0.6rem; color: #444; margin-top: 10px;">"Tu billetera de confianza"</p>
        `;
    } else {
        area.innerHTML = `
            <div style="width: 180px; height: 180px; background: #000; border-radius: 15px; border: 2px dashed var(--gold); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
                <div style="width: 100%; height: 2px; background: var(--gold); position: absolute; top: 0; left: 0; animation: scanner 2s infinite linear;"></div>
                <p style="font-size: 0.6rem; color: var(--gold);">ESCANEANDO QR...</p>
            </div>
            <p style="font-size: 0.7rem; color: #888; margin-top: 15px; text-align: center;">Apunta la cámara al código QR del socio para cobrar.</p>
        `;
    }
};

window.generarQR = () => {
    const monto = document.getElementById('monto-qr').value;
    const qrImg = document.querySelector('#qrcode img');
    if(monto > 0) {
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=WILLPAY-PAGO-${monto}`;
    }
};

// Animación del escáner en CSS
const style = document.createElement('style');
style.innerHTML = `@keyframes scanner { 0% { top: 0; } 50% { top: 100%; } 100% { top: 0; } }`;
document.head.appendChild(style);
