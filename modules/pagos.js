// ==========================================
// WILL-PAY VENEZUELA - MÓDULO DE PAGOS ELITE
// ==========================================
let miSaldo = 7560.00; 
let nombreUsuario = "YESICA"; 
let scannerQR; 

// 🔊 Función del BEEP PROFESIONAL
const sonarBeep = () => {
    try {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const osc = context.createOscillator();
        const gain = context.createGain();
        osc.connect(gain);
        gain.connect(context.destination);
        osc.type = "sine";
        osc.frequency.value = 900; 
        gain.gain.setValueAtTime(0, context.currentTime);
        gain.gain.linearRampToValueAtTime(0.5, context.currentTime + 0.05);
        gain.gain.linearRampToValueAtTime(0, context.currentTime + 0.3);
        osc.start();
        osc.stop(context.currentTime + 0.3);
    } catch(e) { console.log("Audio no soportado"); }
};

window.mostrarDashboardUsuario = () => {
    const content = document.getElementById('content-box');
    content.innerHTML = `
        <div style="text-align:center; animation: fadeIn 0.5s;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; padding: 10px;">
                <img src="logonuevo.png" style="width: 85px;">
                <div style="text-align: right;">
                    <p style="color: #666; margin: 0; font-size: 0.6rem; letter-spacing: 1px;">ADN ACTIVO</p>
                    <p style="color: #ffcf40; margin: 0; font-size: 0.9rem; font-weight: bold;">${nombreUsuario}</p>
                </div>
            </div>
            
            <div style="background: #000; border: 2px solid #ffcf40; border-radius: 25px; padding: 25px; margin-bottom: 15px; box-shadow: 0 10px 20px rgba(0,0,0,0.4);">
                <p style="color: #ffcf40; margin: 0; font-size: 0.8rem; font-weight: bold;">Saldo Disponible</p>
                <h1 style="color: #fff; margin: 10px 0; font-size: 2.8rem;">Bs. ${miSaldo.toLocaleString('de-DE', {minimumFractionDigits: 2})}</h1>
                <div style="display:flex; gap:10px; justify-content:center;">
                    <button onclick="window.toggleModulo('RECARGA')" style="flex:1; background: #ffcf40; border:none; padding:10px; border-radius:10px; font-weight:bold; font-size:0.7rem; cursor:pointer;">RECARGAR</button>
                    <button onclick="window.toggleModulo('RETIRO')" style="flex:1; background: #1a1a1a; color:#fff; border:1px solid #333; padding:10px; border-radius:10px; font-weight:bold; font-size:0.7rem; cursor:pointer;">RETIRAR</button>
                </div>
            </div>

            <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                <button onclick="window.activarModo('PAGAR')" style="flex: 1; background: #333; color: #fff; border: none; padding: 18px; border-radius: 15px; font-weight: bold; cursor:pointer;">PAGAR</button>
                <button onclick="window.activarModo('COBRAR')" style="flex: 1; background: #333; color: #fff; border: none; padding: 18px; border-radius: 15px; font-weight: bold; cursor:pointer;">COBRAR</button>
            </div>

            <div id="area-operacion" style="background: #0a0a0a; border: 1px solid #222; border-radius: 20px; padding: 20px; min-height: 250px; display: flex; flex-direction: column; align-items: center; justify-content: center; position:relative;">
                <p style="color: #333; font-size: 0.7rem;">ESPERANDO OPERACIÓN</p>
            </div>
        </div>
    `;
};

window.activarModo = (modo) => {
    const area = document.getElementById('area-operacion');
    if (scannerQR) { scannerQR.stop().catch(() => {}); }

    if(modo === 'PAGAR') {
        area.innerHTML = `
            <p style="color: #ffcf40; font-size: 0.6rem; margin-bottom: 5px;">MONTO A PAGAR</p>
            <input type="number" id="monto-pago" oninput="window.actualizarQR()" placeholder="0.00" style="background: transparent; border: none; border-bottom: 2px solid #ffcf40; color: #fff; font-size: 2.5rem; text-align: center; width: 80%; outline: none; margin-bottom:10px;">
            <div id="qrcode-cont" style="background: #fff; padding: 10px; border-radius: 10px;">
                <img id="img-qr" src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=WILLPAY-WAIT" style="width: 150px;">
            </div>
        `;
    } else {
        area.innerHTML = `
            <div id="reader" style="width: 100%; border-radius: 15px; overflow: hidden; border: 1px solid #333;"></div>
            <p style="color: #555; font-size: 0.6rem; margin-top: 10px;">ESCANEANDO CÓDIGO...</p>
        `;
        scannerQR = new Html5Qrcode("reader");
        scannerQR.start({ facingMode: "environment" }, { fps: 10, qrbox: 250 }, (text) => {
            sonarBeep();
            scannerQR.stop();
            window.generarTicket(text);
        }, () => {});
    }
};

window.generarTicket = (datos) => {
    const area = document.getElementById('area-operacion');
    const monto = datos.split('-').pop();
    const operacionID = "WP-" + Math.floor(Math.random() * 90000000 + 10000000);
    const fecha = new Date().toLocaleString();

    area.innerHTML = `
        <div style="background: #fff; color: #000; padding: 20px; border-radius: 10px; width: 100%; font-family: 'Courier New', Courier, monospace; text-align: left; box-shadow: 0 10px 30px rgba(0,0,0,0.5); animation: slideUp 0.4s;">
            <center>
                <p style="margin: 0; font-weight: bold; font-size: 1rem; color:#000;">WILL-PAY VENEZUELA</p>
                <p style="font-size: 0.6rem; margin: 0; color:#000;">RIF: V-13496133-0</p>
                <p style="background: #000; color: #fff; display: inline-block; padding: 2px 10px; font-size: 0.7rem; margin-top: 5px;">COMPROBANTE ELECTRÓNICO</p>
            </center>
            <hr style="border: 0.5px dashed #000; margin: 10px 0;">
            <p style="font-size: 0.7rem; margin: 5px 0; color:#000;"><b>Nro. OPERACIÓN:</b> ${operacionID}</p>
            <p style="font-size: 0.7rem; margin: 5px 0; color:#000;"><b>FECHA/HORA:</b> ${fecha}</p>
            <p style="font-size: 0.7rem; margin: 5px 0; color:#000;"><b>CLIENTE:</b> ${nombreUsuario} (WP-ADN-321)</p>
            <p style="font-size: 0.7rem; margin: 5px 0; color:#000;"><b>COMERCIO:</b> WILL-PAY SERV.</p>
            <p style="font-size: 0.7rem; margin: 5px 0; color:#000;"><b>ESTATUS:</b> <span style="color: green; font-weight:bold;">CERTIFICADO ✅</span></p>
            <hr style="border: 0.5px dashed #000; margin: 10px 0;">
            <center>
                <p style="font-size: 0.8rem; margin: 5px 0; color:#000;">TOTAL PAGADO</p>
                <h2 style="margin: 0; font-size: 2rem; color:#000;">Bs. ${parseFloat(monto).toFixed(2)}</h2>
            </center>
            <hr style="border: 0.5px dashed #000; margin: 10px 0;">
            <p style="font-size: 0.5rem; text-align: center; color: #666;">Respaldo auditable para la red Will-Pay.</p>
            <button onclick="window.mostrarDashboardUsuario()" style="width: 100%; margin-top: 15px; padding: 12px; background: #000; color: #fff; border: none; font-weight: bold; border-radius: 8px; cursor:pointer;">FINALIZAR</button>
        </div>
    `;
};

window.actualizarQR = () => {
    const monto = document.getElementById('monto-pago').value;
    const qrImg = document.getElementById('img-qr');
    if(monto > 0) qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=WILLPAY-PAGO-${monto}`;
};

window.toggleModulo = (tipo) => {
    const area = document.getElementById('area-operacion');
    area.innerHTML = `
        <button onclick="window.mostrarDashboardUsuario()" style="position:absolute; top:10px; right:15px; background:none; border:none; color:#555; font-size:1.5rem; cursor:pointer;">&times;</button>
        <p style="color: #ffcf40; font-size: 0.8rem; font-weight: bold; margin-bottom:15px;">MÓDULO DE ${tipo}</p>
        <input type="number" placeholder="Monto Bs." style="width:90%; padding:12px; background:#000; border:1px solid #333; color:#fff; border-radius:10px; margin-bottom:15px;">
        <button onclick="alert('Operación en proceso')" style="width:90%; background:#ffcf40; color:#000; border:none; padding:12px; border-radius:10px; font-weight:bold;">CONFIRMAR</button>
    `;
};
