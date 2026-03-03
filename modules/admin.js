// ==========================================
// WILL-PAY - PANEL MAESTRO (CONTROL TOTAL)
// MONITOREO EN VIVO Y ESTADÍSTICAS
// ==========================================

let totalSocios = 14; // Ejemplo actual
let metaSiguiente = 100;

window.mostrarPanelMaestro = () => {
    const content = document.getElementById('content-box');
    content.innerHTML = `
        <div style="text-align:center; animation: fadeIn 0.5s;">
            <p style="color: #ffcf40; font-weight: bold; margin-bottom: 5px;">WILL-PAY</p>
            <p style="color: #666; font-size: 0.6rem; margin-top: 0;">SISTEMA CENTRAL VENEZUELA</p>
            
            <div style="background: #111; padding: 5px 15px; border-radius: 20px; display: inline-block; margin-bottom: 15px; border: 1px solid #333;">
                <p style="color: #fff; font-size: 0.6rem; margin: 0;">MAESTRO: <b>WILFREDO DONQUIZ</b></p>
            </div>

            <div style="background: #000; border: 2px solid #ffcf40; border-radius: 25px; padding: 20px; margin-bottom: 15px;">
                <p style="color: #ffcf40; margin: 0; font-size: 0.7rem; font-weight: bold;">SOCIOS REGISTRADOS</p>
                <h1 style="color: #fff; margin: 5px 0; font-size: 2.5rem;">${totalSocios}</h1>
                
                <div style="width: 100%; background: #222; height: 10px; border-radius: 5px; margin-top: 10px; overflow: hidden;">
                    <div style="width: ${(totalSocios/metaSiguiente)*100}%; background: #ffcf40; height: 100%;"></div>
                </div>
                <p style="color: #555; font-size: 0.55rem; margin-top: 5px;">PRÓXIMA META: ${metaSiguiente} USUARIOS 🚀</p>
            </div>

            <div style="background: #111; border-radius: 20px; padding: 15px; margin-bottom: 15px; border: 1px solid #222;">
                <p style="color: #666; font-size: 0.7rem; margin: 0;">BALANCE PRINCIPAL BS</p>
                <h2 style="color: #fff; margin: 5px 0;">290.074,68</h2>
                <span style="background: #004400; color: #00ff00; padding: 3px 10px; border-radius: 10px; font-size: 0.5rem; font-weight: bold;">OPERATIVO</span>
            </div>

            <div style="text-align: left; margin-top: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <p style="color: #fff; font-size: 0.8rem; font-weight: bold; margin: 0;">Monitor de Actividad</p>
                    <span style="color: #ffcf40; font-size: 0.5rem; animation: pulse 1s infinite;">● EN VIVO</span>
                </div>
                
                <div id="monitor-actividad" style="background: #0a0a0a; border: 1px solid #222; border-radius: 15px; padding: 10px; height: 180px; overflow-y: auto;">
                    <div style="border-bottom: 1px solid #1a1a1a; padding: 8px 0; display: flex; align-items: center; gap: 10px;">
                        <div style="width: 8px; height: 8px; background: #4CAF50; border-radius: 50%;"></div>
                        <div>
                            <p style="color: #fff; font-size: 0.65rem; margin: 0;"><b>YESICA</b> acaba de entrar al panel.</p>
                            <p style="color: #444; font-size: 0.55rem; margin: 0;">Hace 2 min | IP: 190.x.x.x</p>
                        </div>
                    </div>
                    <div style="border-bottom: 1px solid #1a1a1a; padding: 8px 0; display: flex; align-items: center; gap: 10px;">
                        <div style="width: 8px; height: 8px; background: #ffcf40; border-radius: 50%;"></div>
                        <div>
                            <p style="color: #fff; font-size: 0.65rem; margin: 0;"><b>SOCIO #012</b> generó cobro de Bs. 500,00</p>
                            <p style="color: #444; font-size: 0.55rem; margin: 0;">Hace 5 min | Punto Fijo</p>
                        </div>
                    </div>
                    <div style="border-bottom: 1px solid #1a1a1a; padding: 8px 0; display: flex; align-items: center; gap: 10px;">
                        <div style="width: 8px; height: 8px; background: #f44336; border-radius: 50%;"></div>
                        <div>
                            <p style="color: #fff; font-size: 0.65rem; margin: 0;"><b>REPORTADA</b> solicitud de retiro de Bs. 2.000</p>
                            <p style="color: #444; font-size: 0.55rem; margin: 0;">Pendiente de aprobación</p>
                        </div>
                    </div>
                </div>
            </div>

            <div style="margin-top: 15px; background: #111; padding: 15px; border-radius: 20px; border: 1px solid #222;">
                <p style="color: #ffcf40; font-size: 0.6rem; font-weight: bold; margin-bottom: 10px;">⚡ INYECCIÓN DE SALDO DIRECTA</p>
                <input type="text" placeholder="Número de Teléfono" style="width: 100%; background: #000; border: 1px solid #333; color: #fff; padding: 10px; border-radius: 10px; font-size: 0.7rem; margin-bottom: 10px;">
                <input type="number" placeholder="Monto Bs." style="width: 100%; background: #000; border: 1px solid #333; color: #fff; padding: 10px; border-radius: 10px; font-size: 0.7rem; margin-bottom: 15px;">
                <button onclick="alert('Ejecutando Inyección...')" style="width: 100%; background: #ffcf40; color: #000; border: none; padding: 12px; border-radius: 10px; font-weight: bold; font-size: 0.7rem; cursor: pointer;">EJECUTAR CARGA</button>
            </div>

            <p style="color: #444; font-size: 0.6rem; margin-top: 20px; cursor: pointer;">DESCONECTAR PANEL MAESTRO</p>
        </div>
    `;
};

// CSS necesario para el efecto "En Vivo"
const style = document.createElement('style');
style.innerHTML = `
    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.3; }
        100% { opacity: 1; }
    }
    #monitor-actividad::-webkit-scrollbar { width: 3px; }
    #monitor-actividad::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
`;
document.head.appendChild(style);
