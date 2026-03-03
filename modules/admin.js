// ==========================================
// WILL-PAY - PANEL MAESTRO (VERSION ORIGINAL)
// CONTROL DE TASAS, GANANCIAS Y SOCIOS
// ==========================================

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
                <p style="color: #555; font-size: 0.5rem; margin-top: 5px;">PRÓXIMA META: 100 USUARIOS 🚀</p>
            </div>

            <div style="background: #000; border: 1px solid #333; border-radius: 20px; padding: 15px; margin-bottom: 15px;">
                <p style="color: #ffcf40; font-size: 0.6rem; margin: 0;">BALANCE PRINCIPAL BS</p>
                <h2 style="color: #fff; margin: 5px 0; font-size: 2.4rem;">290.074,68</h2>
                <span style="background: #004400; color: #00ff00; padding: 3px 10px; border-radius: 10px; font-size: 0.5rem; font-weight: bold;">OPERATIVO</span>
            </div>

            <div style="background: #111; border: 1px solid #222; border-radius: 15px; padding: 12px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
                <div style="text-align: left;">
                    <p style="color: #fff; font-size: 0.7rem; margin: 0;">Aprobaciones Automáticas</p>
                    <p style="color: #555; font-size: 0.5rem; margin: 0;">El sistema validará pagos sin intervención</p>
                </div>
                <label class="switch">
                    <input type="checkbox">
                    <span class="slider round"></span>
                </label>
            </div>

            <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                <div style="flex: 1; background: #0a0a0a; border: 1px solid #222; border-radius: 15px; padding: 15px;">
                    <p style="color: #444; font-size: 0.5rem; margin: 0;">% TASA PAGOS</p>
                    <h3 style="color: #ffcf40; margin: 10px 0; font-size: 1.5rem;">1,5</h3>
                    <p style="color: #ffcf40; font-size: 0.7rem; margin: 0;">%</p>
                </div>
                <div style="flex: 1; background: #0a0a0a; border: 1px solid #222; border-radius: 15px; padding: 15px;">
                    <p style="color: #444; font-size: 0.5rem; margin: 0;">% TASA RETIROS</p>
                    <h3 style="color: #00ff00; margin: 10px 0; font-size: 1.5rem;">2</h3>
                    <p style="color: #00ff00; font-size: 0.7rem; margin: 0;">%</p>
                </div>
            </div>

            <div style="background: #111; border: 1px solid #ffcf40; border-radius: 15px; padding: 12px; margin-bottom: 15px; display: flex; justify-content: space-between;">
                <p style="color: #ffcf40; font-size: 0.6rem; margin: 0;">MIS GANANCIAS</p>
                <p style="color: #ffcf40; font-size: 0.8rem; margin: 0; font-weight: bold;">Bs. 125.50</p>
            </div>

            <div style="background: #111; padding: 15px; border-radius: 20px; border: 1px solid #222;">
                <p style="color: #ffcf40; font-size: 0.6rem; font-weight: bold; margin-bottom: 10px;">⚡ INYECCIÓN DE SALDO DIRECTA</p>
                <input type="text" placeholder="Número de Teléfono" style="width: 100%; background: #000; border: none; border-bottom: 1px solid #333; color: #fff; padding: 8px; font-size: 0.8rem; margin-bottom: 10px; outline:none; text-align:center;">
                <input type="number" placeholder="Monto Bs." style="width: 100%; background: #000; border: none; border-bottom: 1px solid #333; color: #fff; padding: 8px; font-size: 0.8rem; margin-bottom: 15px; outline:none; text-align:center;">
                <button class="btn-gold" style="padding: 12px; font-size: 0.7rem;" onclick="alert('Ejecutando Carga...')">EJECUTAR CARGA</button>
            </div>

            <p style="color: #333; font-size: 0.55rem; margin-top: 20px; letter-spacing: 1px;">DESCONECTAR PANEL MAESTRO</p>
        </div>
    `;
};

// CSS para el Switch y Animaciones
const styleAdmin = document.createElement('style');
styleAdmin.innerHTML = `
    .switch { position: relative; display: inline-block; width: 40px; height: 20px; }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #333; transition: .4s; border-radius: 34px; }
    .slider:before { position: absolute; content: ""; height: 14px; width: 14px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; }
    input:checked + .slider { background-color: #ffcf40; }
    input:checked + .slider:before { transform: translateX(20px); }
`;
document.head.appendChild(styleAdmin);
