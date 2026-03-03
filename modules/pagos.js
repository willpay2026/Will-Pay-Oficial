// PANEL DE OPERACIONES WILL-PAY - DISEÑO UNIFICADO 2026
let miSaldo = 7560.00; // Saldo de ejemplo basado en tu captura
let scannerQR; 

window.mostrarDashboardUsuario = () => {
    const content = document.getElementById('content-box');
    content.style.maxWidth = "420px";
    
    content.innerHTML = `
        <div style="text-align:center; animation: fadeIn 0.5s;">
            <img src="logonuevo.png" style="width: 130px; margin-bottom: 15px;">
            
            <div style="background: #000; border: 2px solid #ffcf40; border-radius: 25px; padding: 25px; margin-bottom: 15px; box-shadow: 0 0 15px rgba(255,207,64,0.2);">
                <p style="color: #ffcf40; margin: 0; font-size: 0.8rem; font-weight: bold; letter-spacing: 1px;">Saldo Disponible</p>
                <h1 style="color: #fff; margin: 10px 0; font-size: 2.8rem;">Bs. ${miSaldo.toLocaleString('de-DE', {minimumFractionDigits: 2})}</h1>
                
                <div style="display:flex; gap:10px; justify-content:center; margin-top:10px;">
                    <button onclick="window.abrirModuloRecarga()" style="flex:1; background: #ffcf40; color: #000; border: none; padding: 12px; border-radius: 12px; font-weight: bold; font-size: 0.7rem; cursor: pointer;">RECARGAR</button>
                    <button onclick="window.abrirModuloRetiro()" style="flex:1; background: #1a1a1a; color: #fff; border: 1px solid #333; padding: 12px; border-radius: 12px; font-weight: bold; font-size: 0.7rem; cursor: pointer;">RETIRAR</button>
                </div>
            </div>

            <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                <button id="btn-pagar" onclick="window.activarModo('PAGAR')" style="flex: 1; background: #ffcf40; color: #000; border: none; padding: 15px; border-radius: 12px; font-weight: bold; cursor: pointer;">PAGAR</button>
                <button id="btn-cobrar" onclick="window.activarModo('COBRAR')" style="flex: 1; background: #333; color: #fff; border: none; padding: 15px; border-radius: 12px; font-weight: bold; cursor: pointer;">COBRAR</button>
            </div>

            <div id="area-operacion" style="background: #0a0a0a; border: 1px solid #222; border-radius: 20px; padding: 20px; min-height: 250px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <p style="color: #555; font-size: 0.7rem;">SELECCIONE UNA OPERACIÓN</p>
            </div>

            <div style="text-align: left; margin-top: 20px;">
                <p style="color: #fff; font-size: 0.8rem; margin-bottom: 10px; font-weight: bold;">Últimos Movimientos</p>
                <div style="background: #111; border-radius: 15px; padding: 15px; border-left: 4px solid #ffcf40;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <p style="color: #fff; margin: 0; font-size: 0.75rem;">Recarga Aprobada</p>
                            <p style="color: #555; margin: 0; font-size: 0.6rem;">2026-02-20 01:52:25</p>
                        </div>
                        <p style="color: #4CAF50; margin: 0; font-size: 0.8rem; font-weight: bold;">+ Bs. 7560</p>
                    </div>
                </div>
            </div>

            <p onclick="location.reload()" style="color: #cc0000; font-size: 0.7rem; margin-top: 25px; cursor: pointer; font-weight: bold;">Cerrar Sesión</p>
        </div>
    `;
};

window.activarModo = (modo) => {
    const area = document.getElementById('area-operacion');
    const btnPagar = document.getElementById('btn-pagar');
    const btnCobrar = document.getElementById('btn-cobrar');
    
    if (scannerQR) { scannerQR.stop().catch(() => {}); }

    if(modo === 'PAGAR') {
        btnPagar.style.background = "#ffcf40"; btnPagar.style.color = "#000";
        btnCobrar.style.background = "#333"; btnCobrar.style.color = "#fff";
        
        area.innerHTML = `
            <input type="number" id="monto-pago" oninput="window.actualizarQR()" placeholder="0.00" style="background: transparent; border: none; border-bottom: 2px solid #ffcf40; color: #fff; font-size: 2.5rem; text-align: center; width: 80%; margin-bottom: 10px; outline: none;">
            <p style="color: #888; font-size: 0.65rem; margin-bottom: 15px;">Muestra este QR a quien le vas a pagar</p>
            <div id="qrcode-cont" style="background: #fff; padding: 10px; border-radius: 10px;">
                <img id="img-qr" src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=WILLPAY-IDLE" style="width: 150px;">
            </div>
        `;
    } else {
        btnCobrar.style.background = "#ffcf40"; btnCobrar.style.color = "#000";
        btnPagar.style.background = "#333"; btnPagar.style.color = "#fff";
        
        area.innerHTML = `
            <div id="reader" style="width: 100%; border-radius: 15px; overflow: hidden; border: 1px solid #333;"></div>
            <p style="color: #888; font-size: 0.65rem; margin-top: 10px;">Escanea el código QR de quien te paga</p>
        `;
        
        scannerQR = new Html5Qrcode("reader");
        scannerQR.start({ facingMode: "environment" }, { fps: 10, qrbox: 250 }, (text) => {
            alert("PAGO RECIBIDO EXITOSAMENTE: " + text);
            scannerQR.stop();
            window.mostrarDashboardUsuario();
        }, () => {});
    }
};

window.actualizarQR = () => {
    const monto = document.getElementById('monto-pago').value;
    const qrImg = document.getElementById('img-qr');
    if(monto > 0) {
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=WILLPAY-PAGO-${monto}`;
    }
};

window.abrirModuloRecarga = () => {
    document.getElementById('area-operacion').innerHTML = `
        <p style="color: #ffcf40; font-size: 0.7rem; font-weight: bold; margin-bottom:10px;">PAGO MÓVIL: 04126602555 | 13496133 | BANESCO</p>
        <input type="number" id="m-rec" placeholder="Monto Bs." style="width:90%; padding:12px; background:#000; border:1px solid #333; color:#fff; border-radius:10px; margin-bottom:10px;">
        <input type="number" id="r-rec" placeholder="Referencia" style="width:90%; padding:12px; background:#000; border:1px solid #333; color:#fff; border-radius:10px; margin-bottom:15px;">
        <button onclick="alert('Notificado')" style="width:90%; background:#4CAF50; color:#fff; border:none; padding:12px; border-radius:10px; font-weight:bold;">ENVIAR RECARGA</button>
    `;
};

window.abrirModuloRetiro = () => {
    document.getElementById('area-operacion').innerHTML = `
        <p style="color: #ffcf40; font-size: 0.7rem; font-weight: bold; margin-bottom:10px;">RETIRAR A MI CUENTA BANCARIA</p>
        <input type="number" id="m-ret" placeholder="Monto a retirar" style="width:90%; padding:12px; background:#000; border:1px solid #333; color:#fff; border-radius:10px; margin-bottom:10px;">
        <p style="color:#555; font-size:0.6rem; margin-bottom:15px;">Comisión de retiro: 2%</p>
        <button onclick="alert('Solicitado')" style="width:90%; background:#fff; color:#000; border:none; padding:12px; border-radius:10px; font-weight:bold;">SOLICITAR DINERO</button>
    `;
};
