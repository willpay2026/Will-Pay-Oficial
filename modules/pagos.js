// PANEL DE OPERACIONES WILL-PAY - TU BILLETERA DE CONFIANZA
let miSaldo = 0.00; 
let scannerQR; // Objeto para controlar la cámara

window.mostrarDashboardUsuario = () => {
    const content = document.getElementById('content-box');
    content.style.maxWidth = "420px";
    
    content.innerHTML = `
        <img src="logonuevo.png" style="width: 130px; margin-bottom: 10px;">
        
        <div style="background: linear-gradient(145deg, #0f0f0f, #000); border: 2px solid var(--gold); border-radius: 25px; padding: 20px; margin-bottom: 15px;">
            <p style="color: #888; margin: 0; font-size: 0.7rem; letter-spacing: 1px;">SALDO DISPONIBLE</p>
            <h1 style="color: var(--gold); margin: 5px 0; font-size: 2.5rem;">${miSaldo.toFixed(2)} Bs</h1>
            <button onclick="abrirModuloRecarga()" style="background: transparent; color: var(--gold); border: 1px solid var(--gold); padding: 5px 15px; border-radius: 20px; font-size: 0.6rem; cursor: pointer;">+ RECARGAR</button>
        </div>

        <div style="display: flex; gap: 10px; margin-bottom: 20px;">
            <button onclick="activarModo('PAGAR')" style="flex: 1; background: var(--gold); color: #000; border: none; padding: 15px; border-radius: 12px; font-weight: bold; cursor: pointer;">PAGAR</button>
            <button onclick="activarModo('COBRAR')" style="flex: 1; background: #1a1a1a; color: #fff; border: 1px solid #333; padding: 15px; border-radius: 12px; font-weight: bold; cursor: pointer;">COBRAR</button>
        </div>

        <div id="area-operacion" style="background: #0f0f0f; border: 1px dashed #333; border-radius: 20px; min-height: 250px; display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 20px; overflow: hidden;">
            <p style="color: #444; font-size: 0.8rem;">Selecciona una acción superior</p>
        </div>

        <div style="text-align: left; background: #0a0a0a; padding: 15px; border-radius: 20px; border: 1px solid #1a1a1a;">
            <p style="color: var(--gold); font-size: 0.7rem; font-weight: bold; margin-bottom: 5px;">MOVIMIENTOS RECIENTES</p>
            <div id="tabla-movimientos" style="font-size: 0.7rem; color: #333; text-align: center; padding: 10px;">No hay actividad todavía</div>
        </div>
        
        <p onclick="location.reload()" style="color: #333; font-size: 0.7rem; margin-top: 20px; cursor: pointer;">Cerrar Sesión</p>
    `;
};

window.activarModo = (modo) => {
    const area = document.getElementById('area-operacion');
    
    // Detener cámara si ya estaba prendida
    if (scannerQR) {
        scannerQR.stop().catch(() => {});
    }

    if(modo === 'PAGAR') {
        area.innerHTML = `
            <input type="number" id="monto-qr" oninput="generarQR()" placeholder="0.00" style="background: transparent; border: none; border-bottom: 2px solid var(--gold); color: #fff; font-size: 2.5rem; text-align: center; width: 80%; margin-bottom: 15px; outline: none;">
            <div id="qrcode" style="background: #fff; padding: 10px; border-radius: 10px; border: 4px solid var(--gold);">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Esperando" style="width: 150px;">
            </div>
        `;
    } else {
        // MODO COBRAR: ENCENDER CÁMARA REAL
        area.innerHTML = `<div id="reader" style="width: 100%; height: 100%;"></div>`;
        
        scannerQR = new Html5Qrcode("reader");
        
        const config = { fps: 10, qrbox: { width: 220, height: 220 } };

        scannerQR.start(
            { facingMode: "environment" }, // Cámara trasera
            config,
            (decodedText) => {
                // AL DETECTAR QR
                const audio = new Audio('beep.mp3');
                audio.play();
                alert("¡BEEP! Pago Recibido: " + decodedText);
                scannerQR.stop();
                mostrarDashboardUsuario();
            },
            (error) => { /* Escaneando... */ }
        ).catch(err => {
            alert("⚠️ Error: Activa el permiso de cámara en tu navegador.");
        });
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
        <div style="text-align: left; width: 100%; padding: 10px;">
            <p style="color: var(--gold); font-weight: bold; font-size: 0.8rem;">PAGO MÓVIL BANESCO</p>
            <p style="margin:0; font-size: 0.7rem;">📞 04126602555</p>
            <p style="margin:0; font-size: 0.7rem;">🆔 13496133</p>
            <input type="number" id="ref-pago" placeholder="Referencia Banco" style="width:100%; margin-top:10px; padding:10px; background:#000; border:1px solid #333; color:#fff; border-radius:10px;">
            <button onclick="alert('Reporte enviado')" style="width: 100%; background: var(--gold); padding: 10px; border-radius: 10px; margin-top: 10px; border:none; font-weight:bold;">NOTIFICAR</button>
        </div>
    `;
};
