// PANEL DE OPERACIONES WILL-PAY - TU BILLETERA DE CONFIANZA
let miSaldo = 0.00; 
let scannerQR; 

window.mostrarDashboardUsuario = () => {
    const content = document.getElementById('content-box');
    content.style.maxWidth = "420px";
    
    content.innerHTML = `
        <div style="text-align:center; animation: fadeIn 0.5s;">
            <img src="logonuevo.png" style="width: 110px; margin-bottom: 10px;">
            
            <div style="background: #000; border: 2px solid var(--gold); border-radius: 25px; padding: 25px; margin-bottom: 20px; box-shadow: 0 10px 20px rgba(0,0,0,0.5);">
                <p style="color: #666; margin: 0; font-size: 0.65rem; letter-spacing: 2px;">SALDO DISPONIBLE</p>
                <h1 style="color: #fff; margin: 10px 0; font-size: 2.5rem; font-weight: bold;">${miSaldo.toFixed(2)} <span style="font-size:0.9rem; color:var(--gold);">Bs</span></h1>
                <div style="display:flex; gap:10px; justify-content:center;">
                    <button onclick="window.abrirModuloRecarga()" style="background: var(--gold); color: #000; border: none; padding: 10px 18px; border-radius: 12px; font-size: 0.7rem; font-weight: bold; cursor: pointer;">+ RECARGAR</button>
                    <button onclick="window.abrirModuloRetiro()" style="background: #1a1a1a; color: #fff; border: 1px solid #333; padding: 10px 18px; border-radius: 12px; font-size: 0.7rem; font-weight: bold; cursor: pointer;">↑ RETIRAR</button>
                </div>
            </div>

            <div style="display: flex; gap: 15px; margin-bottom: 25px;">
                <button onclick="window.activarModo('PAGAR')" style="flex: 1; background: #fff; color: #000; border: none; padding: 18px; border-radius: 18px; font-weight: bold; cursor: pointer; font-size: 0.8rem;">PAGAR</button>
                <button onclick="window.activarModo('COBRAR')" style="flex: 1; background: #1a1a1a; color: #fff; border: 1px solid #333; padding: 18px; border-radius: 18px; font-weight: bold; cursor: pointer; font-size: 0.8rem;">COBRAR</button>
            </div>

            <div id="area-operacion" style="background: #050505; border: 1px dashed #222; border-radius: 20px; min-height: 220px; display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 20px; padding: 15px;">
                <p style="color: #333; font-size: 0.7rem; letter-spacing: 1px;">ESPERANDO OPERACIÓN</p>
            </div>

            <p onclick="location.reload()" style="color: #222; font-size: 0.6rem; margin-top: 20px; cursor: pointer; letter-spacing: 2px;">CERRAR SESIÓN SEGURA</p>
        </div>
    `;
};

// MODULO DE RECARGA (TOP-UP)
window.abrirModuloRecarga = () => {
    const area = document.getElementById('area-operacion');
    area.innerHTML = `
        <div style="text-align: left; width: 100%; animation: slideUp 0.3s;">
            <p style="color: var(--gold); font-size: 0.7rem; font-weight: bold; margin-bottom:10px;">DATOS PAGO MÓVIL BANESCO</p>
            <div style="background:#000; padding:15px; border-radius:15px; border:1px solid #222; margin-bottom:15px;">
                <p style="margin:2px 0; font-size: 0.8rem; color:#fff;">📞 04126602555</p>
                <p style="margin:2px 0; font-size: 0.8rem; color:#fff;">🆔 13496133</p>
            </div>
            <input type="number" id="monto-recarga" placeholder="Monto Bs." style="width:100%; padding:12px; background:#000; border:1px solid #333; color:#fff; border-radius:12px; margin-bottom:10px;">
            <input type="number" id="ref-pago" placeholder="Referencia (últimos 4)" style="width:100%; padding:12px; background:#000; border:1px solid #333; color:#fff; border-radius:12px; margin-bottom:15px;">
            <button onclick="window.notificarRecarga()" class="btn-gold">REPORTAR PAGO</button>
        </div>
    `;
};

// MODULO DE RETIRO (CASH OUT)
window.abrirModuloRetiro = () => {
    const area = document.getElementById('area-operacion');
    const tasa = window.tasaRetiros || 2.0;
    area.innerHTML = `
        <div style="text-align: left; width: 100%; animation: slideUp 0.3s;">
            <p style="color: var(--gold); font-size: 0.7rem; font-weight: bold; margin-bottom:10px;">SOLICITAR RETIRO A BANCO</p>
            <input type="number" id="monto-retiro" placeholder="Monto a retirar" style="width:100%; padding:12px; background:#000; border:1px solid #333; color:#fff; border-radius:12px; margin-bottom:5px;">
            <p style="color:#555; font-size:0.6rem; margin-bottom:15px;">Comisión por servicio: ${tasa}%</p>
            <button onclick="window.procesarRetiro()" class="btn-gold" style="background:#fff; color:#000;">SOLICITAR DINERO</button>
        </div>
    `;
};

window.notificarRecarga = () => {
    const monto = document.getElementById('monto-recarga').value;
    const ref = document.getElementById('ref-pago').value;
    if(!
