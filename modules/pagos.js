// PANEL DE OPERACIONES WILL-PAY - TU BILLETERA DE CONFIANZA
let miSaldo = 50.00; // Saldo inicial de prueba

window.mostrarDashboardUsuario = () => {
    const content = document.getElementById('content-box');
    content.style.maxWidth = "400px";
    content.style.background = "#080808";
    
    content.innerHTML = `
        <img src="logonuevo.png" style="width: 150px; margin-bottom: 20px;">
        
        <div style="border: 2px solid var(--gold); border-radius: 20px; padding: 20px; margin-bottom: 20px;">
            <p style="color: #888; margin: 0; font-size: 0.8rem;">Mi Saldo</p>
            <h1 style="color: var(--gold); margin: 5px 0; font-size: 2.5rem;">Bs. ${miSaldo.toFixed(2)}</h1>
        </div>

        <div style="display: flex; gap: 10px; margin-bottom: 20px;">
            <button id="btn-pagar" onclick="activarModo('PAGAR')" style="flex: 1; background: var(--gold); color: #000; border: none; padding: 15px; border-radius: 10px; font-weight: bold; cursor: pointer;">PAGAR</button>
            <button id="btn-cobrar" onclick="activarModo('COBRAR')" style="flex: 1; background: #1a1a1a; color: #fff; border: 1px solid #333; padding: 15px; border-radius: 10px; font-weight: bold; cursor: pointer;">COBRAR</button>
        </div>

        <div id="area-operacion" style="background: #111; border: 1px solid #333; border-radius: 20px; padding: 20px; min-height: 300px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <p style="color: #444;">Seleccione una operación</p>
        </div>

        <div style="margin-top: 25px; text-align: left;">
            <p style="color: var(--gold); font-size: 0.8rem; font-weight: bold; margin-bottom: 10px;">MOVIMIENTOS RECIENTES</p>
            <div id="lista-mini-historial" style="background: #050505; border-radius: 10px; padding: 10px;">
                <p style="color: #333; font-size: 0.7rem; text-align: center;">No hay transacciones recientes</p>
            </div>
        </div>

        <p onclick="location.reload()" style="color: #ff4444; cursor: pointer; margin-top: 20px; font-size: 0.8rem;">Salir</p>
    `;
};

window.activarModo = (modo) => {
    const area = document.getElementById('area-operacion');
    const btnPagar = document.getElementById('btn-pagar');
    const btnCobrar = document.getElementById('btn-cobrar');

    if (modo === 'PAGAR') {
        btnPagar.style.background = "var(--gold)"; btnPagar.style.color = "#000";
        btnCobrar.style.background = "#1a1a1a"; btnCobrar.style.color = "#fff";
        
        area.innerHTML = `
            <input type="number" id="monto-qr" oninput="generarQR()" placeholder="0" style="background: transparent; border: 2px solid #fff; color: var(--gold); font-size: 3rem; text-align: center; width: 80%; border-radius: 15px; margin-bottom: 20px;">
            <div id="qrcode" style="background: #fff; padding: 10px; border-radius: 10px;">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=WillPay-Listo" style="width: 150px;">
            </div>
        `;
    } else {
        btnCobrar.style.background = "var(--gold)"; btnCobrar.style.color = "#000";
        btnPagar.style.background = "#1a1a1a"; btnPagar.style.color = "#fff";
        
        area.innerHTML = `
            <div style="width: 100%; height: 200px; background: #000; border-radius: 10px; display: flex; align-items: center; justify-content: center; border: 2px dashed var(--gold);">
                <p style="font-size: 0.7rem; color: var(--gold);">CÁMARA ACTIVADA...</p>
            </div>
            <button onclick="simularLectura()" style="margin-top: 15px; background: transparent; border: 1px solid #444; color: #888; padding: 5px 10px; border-radius: 5px; font-size: 0.6rem;">SIMULAR LECTURA BEEP</button>
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

window.simularLectura = () => {
    const audio = new Audio('beep.mp3');
    audio.play().catch(e => console.log("Sonido listo al escanear"));
    alert("¡BEEP! Código escaneado con éxito.");
};
