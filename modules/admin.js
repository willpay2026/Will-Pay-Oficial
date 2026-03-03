// ==========================================
// WILL-PAY - PANEL MAESTRO (CONTROL TOTAL)
// TASAS EDITABLES POR EL DUEÑO
// ==========================================

let tasaPagos = 1.5;
let tasaRetiros = 2.0;

window.mostrarPanelMaestro = () => {
    const content = document.getElementById('content-box');
    content.innerHTML = `
        <div style="text-align:center; animation: fadeIn 0.5s;">
            <p style="color: #ffcf40; font-weight: bold; margin-bottom: 5px; letter-spacing: 2px;">WILL-PAY</p>
            <p style="color: #666; font-size: 0.5rem; margin-top: 0; letter-spacing: 1px;">SISTEMA CENTRAL VENEZUELA</p>
            
            <div style="background: #111; padding: 5px 15px; border-radius: 20px; display: inline-block; margin-bottom: 15px; border: 1px solid #333;">
                <p style="color: #fff; font-size: 0.6rem; margin: 0;">MAESTRO: <b>WILFREDO DONQUIZ</b></p>
            </div>

            <div style="background: #000; border: 1px solid #333; border-radius: 20px; padding: 15px; margin-bottom: 10px;">
                <p style="color: #ffcf40; margin: 0; font-size: 0.6rem; font-weight: bold;">SOCIOS REGISTRADOS</p>
                <h1 style="color: #fff; margin: 5px 0; font-size: 2.2rem;">14</h1>
                <div style="width: 100%; background: #222; height: 6px; border-radius: 3px; margin-top: 5px;">
                    <div style="width: 14%; background: #ffcf40; height: 100%;"></div>
                </div>
            </div>

            <div style="background: #000; border: 1px solid #333; border-radius: 20px; padding: 15px; margin-bottom: 15px;">
                <p style="color: #ffcf40; font-size: 0.6rem; margin: 0;">BALANCE PRINCIPAL BS</p>
                <h2 style="color: #fff; margin: 5px 0; font-size: 2.4rem;">290.074,68</h2>
                <span style="background: #004400; color: #00ff00; padding: 3px 10px; border-radius: 10px; font-size: 0.5rem; font-weight: bold;">OPERATIVO</span>
            </div>

            <div style="background: #111; border: 1px solid #222; border-radius: 15px; padding: 12px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
                <div style="text-align: left;">
                    <p style="color: #fff; font-size: 0.7rem; margin: 0;">Aprobaciones Automáticas</p>
                    <p style="color: #555; font-size: 0.5rem; margin: 0;">Validar sin intervención</p>
                </div>
                <label class="switch">
                    <input type="checkbox" id="aprobacion-auto">
                    <span class="slider round"></span>
                </label>
            </div>

            <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                <div style="flex: 1; background: #0a0a0a; border: 1px solid #222; border-radius: 15px; padding: 15px;">
                    <p style="color: #444; font-size: 0.5rem; margin-bottom: 5px;">% TASA PAGOS</p>
                    <input type="number" step="0.1" value="${tasaPagos}" id="tasa-p" onchange="window.actualizarTasas()" 
                           style="background:transparent; border:none; color:#ffcf40; font-size:1.8rem; font-weight:bold; width:100%; text-align:center; outline:none;">
                    <p style="color: #ffcf40; font-size: 0.7rem; margin: 0;">%</p>
                </div>
                <div style="flex: 1; background: #0a0a0a; border: 1px solid #222; border-radius: 15px; padding: 15px;">
                    <p style="color: #444; font-size: 0.5rem; margin-bottom: 5px;">% TASA RETIROS</p>
                    <input type="number" step="0.1" value="${tasaRetiros}" id="tasa-r" onchange="window.actualizarTasas()" 
                           style="background:transparent; border:none; color:#00ff00; font-size:1.8rem; font-weight:bold; width:100%; text-align:center; outline:none;">
                    <p style="color: #00ff00; font-size: 0.7rem; margin: 0;">%</p>
                </div>
            </div>

            <div style="background: #111; border: 1px solid #ffcf40; border-radius: 15px; padding: 12px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
                <p style="color: #ffcf40; font-size: 0.6rem; margin: 0;">MIS GANANCIAS</p>
                <p style="color: #ffcf40; font-size: 0.9rem; margin: 0; font-weight: bold;">Bs. 125.50</p>
            </div>

            <div style="background: #111; padding: 15px; border-radius: 20px; border: 1px solid #222;">
                <p style="color: #ffcf40; font-size: 0.6rem; font-weight: bold; margin-bottom: 10px;">⚡ INYECCIÓN DE SALDO DIRECTA</p>
                <input type="text" id="tel-iny" placeholder="Número de Teléfono" style="width: 100%; background: #000; border: none; border-bottom: 1px solid #333; color: #fff; padding: 8px; font-size: 0.8rem; margin-bottom: 10px; outline:none; text-align:center;">
                <input type="number" id="mon-iny" placeholder="Monto Bs." style="width: 100%; background: #000; border: none; border-bottom: 1px solid #333; color: #fff; padding: 8px; font-size: 0.8rem; margin-bottom: 15px; outline:none; text-align:center;">
                <button class="btn-gold" style="padding: 12px; font-size: 0.7rem;" onclick="window.ejecutarInyeccion()">EJECUTAR CARGA</button>
            </div>

            <p style="color: #333; font-size: 0.55rem; margin-top: 20px; letter-spacing: 1px; cursor:pointer;" onclick="location.reload()">DESCONECTAR PANEL MAESTRO</p>
        </div>
    `;
};

// FUNCIÓN PARA ACTUALIZAR VALORES EN TIEMPO REAL
window.actualizarTasas = () => {
    tasaPagos = document.getElementById('tasa-p').value;
    tasaRetiros = document.getElementById('tasa-r').value;
    console.log(`Tasas actualizadas: Pago ${tasaPagos}% | Retiro ${tasaRetiros}%`);
    // Aquí podrías guardar en una base de datos en el futuro
};

window.ejecutarInyeccion = () => {
    const t = document.getElementById('tel-iny').value;
    const m = document.getElementById('mon-iny').value;
    if(t && m) {
        alert(`Inyección Exitosa: Se han cargado Bs. ${m} al número ${t}`);
        window.mostrarPanelMaestro();
    } else {
        alert("Faltan datos para la inyección.");
    }
};
