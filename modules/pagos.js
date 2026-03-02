// PANEL DE OPERACIONES WILL-PAY - TU BILLETERA DE CONFIANZA
let miSaldo = 50.00; 

// Simulamos unos movimientos iniciales para que la tabla no se vea vacía
let misMovimientos = [
    { tipo: 'PAGO', entidad: 'Abasto La Fe', monto: 15.50, fecha: '02/03 10:20 AM', ref: 'WP-7721' },
    { tipo: 'COBRO', entidad: 'Juan Pérez', monto: 25.00, fecha: '01/03 04:45 PM', ref: 'WP-6540' }
];

window.mostrarDashboardUsuario = () => {
    const content = document.getElementById('content-box');
    content.style.maxWidth = "420px";
    content.style.background = "#080808";
    
    // Generamos las filas de la tabla dinámicamente
    let filasTabla = misMovimientos.map(m => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 5px; border-bottom: 1px solid #1a1a1a;">
            <div style="text-align: left;">
                <p style="margin: 0; font-size: 0.8rem; font-weight: bold; color: #fff;">${m.entidad}</p>
                <p style="margin: 0; font-size: 0.6rem; color: #555;">${m.fecha} | Ref: ${m.ref}</p>
            </div>
            <div style="text-align: right;">
                <p style="margin: 0; font-size: 0.9rem; font-weight: bold; color: ${m.tipo === 'PAGO' ? '#ff4444' : '#00ff00'};">
                    ${m.tipo === 'PAGO' ? '-' : '+'}${m.monto.toFixed(2)} Bs
                </p>
            </div>
        </div>
    `).join('');

    content.innerHTML = `
        <img src="logonuevo.png" style="width: 140px; margin-bottom: 15px;">
        
        <div style="background: linear-gradient(145deg, #0f0f0f, #000); border: 2px solid var(--gold); border-radius: 25px; padding: 25px; margin-bottom: 20px; box-shadow: 0 10px 20px rgba(0,0,0,0.5);">
            <p style="color: #888; margin: 0; font-size: 0.7rem; letter-spacing: 2px;">SALDO DISPONIBLE</p>
            <h1 style="color: var(--gold); margin: 5px 0; font-size: 2.8rem; font-weight: 700;">${miSaldo.toFixed(2)} <span style="font-size: 1rem;">Bs</span></h1>
        </div>

        <div style="display: flex; gap: 15px; margin-bottom: 25px;">
            <button id="btn-pagar" onclick="activarModo('PAGAR')" style="flex: 1; background: var(--gold); color: #000; border: none; padding: 18px; border-radius: 15px; font-weight: bold; cursor: pointer; font-size: 0.9rem;">PAGAR</button>
            <button id="btn-cobrar" onclick="activarModo('COBRAR')" style="flex: 1; background: #1a1a1a; color: #fff; border: 1px solid #333; padding: 18px; border-radius: 15px; font-weight: bold; cursor: pointer; font-size: 0.9rem;">COBRAR</button>
        </div>

        <div id="area-operacion" style="background: #0f0f0f; border: 1px dashed #333; border-radius: 20px; padding: 20px; min-height: 220px; display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 25px;">
            <p style="color: #444; font-size: 0.8rem;">Seleccione una operación superior</p>
        </div>

        <div style="text-align: left; background: #0a0a0a; padding: 15px; border-radius: 20px; border: 1px solid #1a1a1a;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom:
