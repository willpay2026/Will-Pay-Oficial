// PANEL WILL-PAY ELITE: BEEP + TICKETS REALES
let miSaldo = 7560.00; 
let nombreUsuario = "YESICA"; 
let scannerQR; 

// Función para el BEEP (Sonido de éxito)
const sonarBeep = () => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.connect(gain);
    gain.connect(context.destination);
    osc.type = "sine";
    osc.frequency.value = 880; // Tono alto profesional
    gain.gain.setValueAtTime(0, context.currentTime);
    gain.gain.linearRampToValueAtTime(0.5, context.currentTime + 0.05);
    gain.gain.linearRampToValueAtTime(0, context.currentTime + 0.3);
    osc.start();
    osc.stop(context.currentTime + 0.3);
};

window.mostrarDashboardUsuario = () => {
    const content = document.getElementById('content-box');
    content.innerHTML = `
        <div style="text-align:center; animation: fadeIn 0.5s;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; padding: 10px;">
                <img src="logonuevo.png" style="width: 85px;">
                <div style="text-align: right;">
                    <p style="color: #666; margin: 0; font-size: 0.6rem;">BIENVENIDA</p>
                    <p style="color: #ffcf40; margin: 0; font-size: 0.9rem; font-weight: bold;">${nombreUsuario}</p>
                </div>
            </div>
            
            <div style="background: #000; border: 2px solid #ffcf40; border-radius: 25px; padding: 25px; margin-bottom: 15px;">
                <p style="color: #ffcf40; margin: 0; font-size: 0.8rem; font-weight: bold;">Saldo Disponible</p>
                <h1 style="color: #fff; margin: 10px 0; font-size: 2.8rem;">Bs. ${miSaldo.toLocaleString('de-DE', {minimumFractionDigits: 2})}</h1>
                <div style="display:flex; gap:10px; justify-content:center;">
                    <button onclick="window.toggleModulo('RECARGA')" style="flex:1; background: #ffcf40; border:none; padding:10px; border-radius:10px; font-weight:bold; font-size:0.7rem;">RECARGAR</button>
                    <button onclick="window.toggleModulo('RETIRO')" style="flex:1; background: #1a1a1a; color:#fff; border:1px solid #333; padding:10px; border-radius:10px; font-weight:bold; font-size:0.7rem;">RETIRAR</button>
                </div>
            </div>

            <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                <button onclick="window.activarModo('PAGAR')" style="flex: 1; background: #333; color: #fff; border: none; padding: 15px; border-radius: 12px; font-weight: bold;">PAGAR</button>
                <button onclick="window.activarModo('COBRAR')" style="flex: 1; background: #333; color: #fff; border: none; padding: 15px; border-radius: 12px; font-weight: bold;">COBRAR</button>
            </div>

            <div id="area-operacion" style="background: #0a0a0a; border: 1px solid #222; border-radius: 20px; padding: 20px; min-height: 250px; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative;">
                <p style="color: #333; font-size: 0.7rem;">ESPERANDO ACCIÓN...</p>
            </div>
        </div>
    `;
};

window.activarModo = (modo) => {
    const area = document.getElementById('area-operacion');
    if (scannerQR) { scannerQR.stop().catch(() => {}); }

    if(modo === 'PAGAR') {
        area.innerHTML = `
            <input type="number" id="monto-pago" oninput="window.actualizarQR()" placeholder="Monto Bs." style="background: transparent; border: none; border-bottom: 2px solid #ffcf40; color: #fff; font-size: 2.5rem; text-align: center; width: 80%; outline: none;">
            <div id="qrcode-cont" style="background: #fff; padding: 10px; border-radius: 10px; margin-top: 15px;">
                <img id="img-qr" src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=WILLPAY-INIT" style="width: 150px;">
            </div>
        `;
    } else {
        area.innerHTML = `<div id="reader" style="width: 100%; border-radius: 15px; overflow: hidden;"></div>`;
        scannerQR = new Html5Qrcode("reader");
        scannerQR.start({ facingMode: "environment" }, { fps: 10, qrbox: 250 }, (text) => {
            sonarBeep();
            scannerQR.stop();
            window.generarComprobante(text);
        }, () => {});
    }
};

window.generarComprobante = (datosQR) => {
    const area = document.getElementById('area-operacion');
    const monto = datosQR.split('-').pop(); // Extrae el monto del QR
    const fecha = new Date().toLocaleString();
    
    area.innerHTML = `
        <div id="ticket" style="background: #fff; color: #000; padding: 20px; border-radius: 10px; width: 100%; font-family: 'Courier New', Courier, monospace; text-align: left; animation: slideUp 0.4s;">
            <center>
                <img src="logonuevo.png" style="width: 60px; filter: grayscale(1);">
                <h3 style="margin: 5px 0; font-size: 1rem;">COMPROBANTE DE PAGO</h3>
                <p style="font-size: 0.7rem; color: #4CAF50; font-weight: bold;">● TRANSACCIÓN EXITOSA</p>
            </center>
            <hr style="border: 0.5px dashed #ccc;">
            <p style="font-size: 0.75rem; margin: 5px 0;"><b>ID ADN:</b> WP-992144</p>
            <p style="font-size: 0.75rem; margin: 5px 0;"><b>CLIENTE:</b> YESICA</p>
            <p style="font-size: 0.75rem; margin: 5px 0;"><b>COMERCIO:</b> WIL-PAY SERV.</p>
            <p style="font-size: 0.75rem; margin: 5px 0;"><b>ACTIVIDAD:</b> SERVICIOS FINANC.</p>
            <hr style="border: 0.5px dashed #ccc;">
            <p style="font-size: 0.8rem; margin: 10px 0; text-align: center;">TOTAL PAGADO</p>
            <h2 style="text-align: center; margin: 0;">Bs. ${parseFloat(monto).toFixed(2)}</h2>
            <hr style="border: 0.5px dashed #ccc;">
            <p style="font-size: 0.6rem; text-align: center;">${fecha}</p>
            <p style="font-size: 0.5rem; text-align: center; color: #888; margin-top: 10px;">REVOLUCIONANDO EL SISTEMA DE PAGOS EN VENEZUELA</p>
            <button onclick="window.mostrarDashboardUsuario()" style="width: 100%; margin-top: 15px; padding: 10px; background: #000; color: #fff; border: none; border-radius: 5px; cursor: pointer;">LISTO</button>
        </div>
    `;
};

window.actualizarQR = () => {
    const monto = document.getElementById('monto-pago').value;
    const qrImg = document.getElementById('img-qr');
    if(monto > 0) qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=WILLPAY-PAGO-${monto}`;
};
