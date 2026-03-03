// PANEL DE OPERACIONES WILL-PAY - TU BILLETERA DE CONFIANZA
let miSaldo = 0.00; 
let scannerQR; // Objeto para controlar la cámara

window.mostrarDashboardUsuario = () => {
    const content = document.getElementById('content-box');
    content.style.maxWidth = "420px";
    
    // Obtenemos tasas del maestro o usamos por defecto
    const tPago = window.tasaPagos || 1.5;

    content.innerHTML = `
        <div style="text-align:center; animation: fadeIn 0.5s;">
            <img src="logonuevo.png" style="width: 120px; margin-bottom: 15px;">
            
            <div style="background: linear-gradient(180deg, #0a0a0a, #000); border: 2px solid var(--gold); border-radius: 25px; padding: 25px; margin-bottom: 20px; box-shadow: 0 10px 25px rgba(255,207,64,0.1);">
                <p style="color: #666; margin: 0; font-size: 0.7rem; letter-spacing: 2px;">SALDO DISPONIBLE</p>
                <h1 style="color: #fff; margin: 10px 0; font-size: 2.8rem; font-weight: bold;">${miSaldo.toFixed(2)} <span style="font-size:1rem; color:var(--gold);">Bs</span></h1>
                <button onclick="window.abrirModuloRecarga()" style="background: var(--gold); color: #000; border: none; padding: 8px 20px; border-radius: 20px; font-size: 0.7rem; font-weight: bold; cursor: pointer;">+ RECARGAR ALIAS</button>
            </div>

            <div style="display: flex; gap: 12px; margin-bottom: 20px;">
                <button onclick="window.activarModo('PAGAR')" style="flex: 1; background: #fff; color: #000; border: none; padding: 18px; border-radius: 15px; font-weight: bold; cursor: pointer; font-size: 0.9rem;">ENVIAR</button>
                <button onclick="window.activarModo('COBRAR')" style="flex: 1; background: #1a1a1a; color: #fff; border: 1px solid #333; padding: 18px; border-radius: 15px; font-weight: bold; cursor: pointer; font-size: 0.9rem;">ESCANEAR</button>
            </div>

            <div id="area-operacion" style="background: #080808; border: 1px solid #1a1a1a; border-radius: 20px; min-height: 200px; display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 20px; padding: 20px;">
                <p style="color: #333; font-size: 0.7rem; letter-spacing: 1px;">SELECCIONE UNA OPERACIÓN</p>
            </div>

            <div style="text-align: left; background: #050505; padding: 15px; border-radius: 20px; border: 1px solid #111;">
                <p style="color: var(--gold); font-size: 0.6rem; font-weight: bold; margin-bottom: 10px; letter-spacing: 1px;">MOVIMIENTOS</p>
                <div id="tabla-movimientos" style="font-size: 0.7rem; color: #444; text-align: center;">Sin actividad reciente</div>
            </div>
            
            <p onclick="location.reload()" style="color: #222; font-size: 0.6rem; margin-top: 30px; cursor: pointer; letter-spacing: 2px;">DESCONECTAR ADN</p>
        </div>
    `;
};

window.activarModo = (modo) => {
    const area = document.getElementById('area-operacion');
    if (scannerQR) { scannerQR.stop().catch(() => {}); }

    if(modo === 'PAGAR') {
        area.innerHTML = `
            <p style="color:var(--gold); font-size:0.6rem; margin-bottom:10px;">GENERAR QR DE PAGO</p>
            <input type="number" id="monto-qr" oninput="window.generarQR()" placeholder="Monto Bs." style="background: transparent; border: none; border-bottom: 2px solid #222; color: #fff; font-size: 2rem; text-align: center; width: 80%; margin-bottom: 15px; outline: none;">
            <div id="qrcode" style="background: #fff; padding: 10px; border-radius: 12px;">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=WILLPAY-WAIT" style="width: 140px;">
            </div>
            <p style="color:#555; font-size:0.5rem; margin-top:10px;">Tasa de servicio: ${window.tasaPagos || 1.5}%</p>
        `;
    } else {
        area.innerHTML = `<div id="reader" style="width: 100%; border-radius:15px; overflow:hidden;"></div>`;
        scannerQR = new Html5Qrcode("reader");
        scannerQR.start({ facingMode: "environment" }, { fps: 10, qrbox: 250 },
            (text) => {
                new Audio('beep.mp3').play();
                alert("Pago procesado con éxito: " + text);
                scannerQR.stop();
                window.mostrarDashboardUsuario();
            },
            () => {}
        ).catch(() => alert("Error: Acceso a cámara denegado."));
    }
};

window.generarQR = () => {
    const monto = document.getElementById('monto-qr').value;
    const qrImg = document.querySelector('#qrcode img');
    if(monto > 0) {
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=WILLPAY-PAGO-${monto}`;
    }
};

window.abrirModuloRecarga = () => {
    const area = document.getElementById('area-operacion');
    area.innerHTML = `
        <div style="text-align: left; width: 100%;">
            <p style="color: var(--gold); font-size: 0.7rem; font-weight: bold; margin-bottom:15px;">MÉTODO DE RECARGA: PAGO MÓVIL</p>
            <div style="background:#000; padding:12px; border-radius:12px; border:1px solid #222; margin-bottom:15px;">
                <p style="margin:2px 0; font-size: 0.8rem; color:#fff;">BANESCO</p>
                <p style="margin:2px 0; font-size: 0.8rem; color:#888;">04126602555</p>
                <p style="margin:2px 0; font-size: 0.8rem; color:#888;">V-13496133</p>
            </div>
            <input type="number" id="ref-pago" placeholder="Últimos 4 dígitos Referencia" style="width:100%; padding:12px; background:#000; border:1px solid #333; color:#fff; border-radius:10px; margin-bottom:10px;">
            <button onclick="alert('Referencia enviada para validación')" class="btn-gold" style="padding:10px;">NOTIFICAR PAGO</button>
        </div>
    `;
};
