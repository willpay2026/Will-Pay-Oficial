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
                    <button onclick="window.abrirModuloRecarga()" style="background: var(--gold); color: #000; border: none; padding: 8px 15px; border-radius: 12px; font-size: 0.6rem; font-weight: bold; cursor: pointer;">+ RECARGAR</button>
                    <button onclick="window.abrirModuloRetiro()" style="background: #1a1a1a; color: #fff; border: 1px solid #333; padding: 8px 15px; border-radius: 12px; font-size: 0.6rem; font-weight: bold; cursor: pointer;">↑ RETIRAR</button>
                </div>
            </div>

            <div style="display: flex; gap: 15px; margin-bottom: 25px;">
                <button onclick="window.activarModo('PAGAR')" style="flex: 1; background: #fff; color: #000; border: none; padding: 18px; border-radius: 18px; font-weight: bold; cursor: pointer; font-size: 0.8rem;">PAGAR / ENVIAR</button>
                <button onclick="window.activarModo('COBRAR')" style="flex: 1; background: #1a1a1a; color: #fff; border: 1px solid #333; padding: 18px; border-radius: 18px; font-weight: bold; cursor: pointer; font-size: 0.8rem;">COBRAR / SCAN</button>
            </div>

            <div id="area-operacion" style="background: #050505; border: 1px dashed #222; border-radius: 20px; min-height: 220px; display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 20px; padding: 15px;">
                <p style="color: #333; font-size: 0.7rem; letter-spacing: 1px;">ESPERANDO ACCIÓN...</p>
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
            <p style="color: var(--gold); font-size: 0.7rem; font-weight: bold; margin-bottom:10px;">DATOS DE PAGO MÓVIL (WILL-PAY)</p>
            <div style="background:#000; padding:15px; border-radius:15px; border:1px solid #222; margin-bottom:15px;">
                <p style="margin:2px 0; font-size: 0.8rem; color:#fff;">BANCO: <b>BANESCO</b></p>
                <p style="margin:2px 0; font-size: 0.8rem; color:#fff;">TELÉFONO: <b>04126602555</b></p>
                <p style="margin:2px 0; font-size: 0.8rem; color:#fff;">CÉDULA: <b>13496133</b></p>
            </div>
            <label style="color:#555; font-size:0.6rem; margin-left:5px;">MONTO RECARGADO</label>
            <input type="number" id="monto-recarga" placeholder="0.00" style="width:100%; padding:12px; background:#000; border:1px solid #333; color:#fff; border-radius:12px; margin-bottom:10px;">
            <label style="color:#555; font-size:0.6rem; margin-left:5px;">NÚMERO DE REFERENCIA (ÚLTIMOS 4)</label>
            <input type="number" id="ref-pago" placeholder="1234" style="width:100%; padding:12px; background:#000; border:1px solid #333; color:#fff; border-radius:12px; margin-bottom:15px;">
            <button onclick="window.notificarRecarga()" class="btn-gold" style="padding:15px;">NOTIFICAR RECARGA</button>
        </div>
    `;
};

// MODULO DE RETIRO (CASH OUT)
window.abrirModuloRetiro = () => {
    const area = document.getElementById('area-operacion');
    const tasa = window.tasaRetiros || 2.0;
    area.innerHTML = `
        <div style="text-align: left; width: 100%; animation: slideUp 0.3s;">
            <p style="color: var(--gold); font-size: 0.7rem; font-weight: bold; margin-bottom:10px;">RETIRAR FONDOS A MI BANCO</p>
            <label style="color:#555; font-size:0.6rem; margin-left:5px;">MONTO A RETIRAR (Bs)</label>
            <input type="number" id="monto-retiro" placeholder="0.00" style="width:100%; padding:12px; background:#000; border:1px solid #333; color:#fff; border-radius:12px; margin-bottom:5px;">
            <p style="color:#444; font-size:0.55rem; margin-bottom:15px;">* Comisión por servicio de plataforma: ${tasa}%</p>
            <button onclick="window.procesarRetiro()" class="btn-gold" style="padding:15px; background:#fff; color:#000;">SOLICITAR RETIRO</button>
        </div>
    `;
};

window.notificarRecarga = () => {
    const monto = document.getElementById('monto-recarga').value;
    const ref = document.getElementById('ref-pago').value;
    if(!monto || !ref) return alert("Por favor complete los datos del pago.");
    alert(`✅ RECARGA REPORTADA\n\nMonto: ${monto} Bs\nReferencia: ${ref}\n\nWilfredo Donquiz validará su pago en breve.`);
    window.mostrarDashboardUsuario();
};

window.procesarRetiro = () => {
    const monto = document.getElementById('monto-retiro').value;
    if(!monto || monto <= 0) return alert("Ingrese un monto válido.");
    if(monto > miSaldo) return alert("Saldo insuficiente.");
    alert(`🚀 SOLICITUD DE RETIRO ENVIADA\n\nMonto: ${monto} Bs\n\nEl dinero será enviado a su cuenta bancaria registrada.`);
    window.mostrarDashboardUsuario();
};

window.activarModo = (modo) => {
    const area = document.getElementById('area-operacion');
    if (scannerQR) { scannerQR.stop().catch(() => {}); }

    if(modo === 'PAGAR') {
        area.innerHTML = `
            <p style="color:var(--gold); font-size:0.6rem; margin-bottom:10px;">MONTO A PAGAR</p>
            <input type="number" id="monto-qr" oninput="window.generarQR()" placeholder="0.00" style="background: transparent; border: none; border-bottom: 2px solid #222; color: #fff; font-size: 2.2rem; text-align: center; width: 80%; margin-bottom: 15px; outline: none;">
            <div id="qrcode" style="background: #fff; padding: 10px; border-radius: 12px;">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=WILLPAY-WAIT" style="width: 130px;">
            </div>
        `;
    } else {
        area.innerHTML = `<div id="reader" style="width: 100%; border-radius:15px; overflow:hidden;"></div>`;
        scannerQR = new Html5Qrcode("reader");
        scannerQR.start({ facingMode: "environment" }, { fps: 10, qrbox: 250 }, (text) => {
            new Audio('beep.mp3').play();
            alert("LECTURA EXITOSA: " + text);
            scannerQR.stop();
            window.mostrarDashboardUsuario();
        }, () => {}).catch(() => alert("Error: Acceso a cámara denegado."));
    }
};

window.generarQR = () => {
    const monto = document.getElementById('monto-qr').value;
    const qrImg = document.querySelector('#qrcode img');
    if(monto > 0) qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=WILLPAY-PAGO-${monto}`;
};
