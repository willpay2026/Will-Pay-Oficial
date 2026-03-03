// PANEL MAESTRO - PROPIEDAD EXCLUSIVA DE WILFREDO DONQUIZ
let saldoBs = 290074.68; // Actualizado a tu saldo imponente
let misGananciasBs = 125.50;
let aprobacionAutomatica = false; // Estado del Switch

// Tasas manipulables a antojo
let tasaPagos = 1.5;
let tasaRetiros = 2.0;

window.mostrarPanelAdmin = () => {
    const content = document.getElementById('content-box');
    content.style.maxWidth = "500px"; // Ajuste Smart para móvil y PC
    
    content.innerHTML = `
        <div style="text-align:center; margin-bottom:20px; animation: fadeIn 0.5s;">
            <h1 style="color:var(--gold); margin:0; font-size:1.6rem; letter-spacing:3px;">WILL-PAY</h1>
            <p style="font-size:0.6rem; color:#555; margin:0; letter-spacing:2px;">SISTEMA CENTRAL VENEZUELA</p>
            <div style="margin-top:10px; padding:5px; border-radius:10px; background:#111; display:inline-block; border:1px solid #222;">
                <span style="color:#fff; font-size:0.7rem; padding:0 10px;">MAESTRO: <b>WILFREDO DONQUIZ</b></span>
            </div>
        </div>

        <div style="background:linear-gradient(180deg, #0a0a0a 0%, #000 100%); border:1px solid #222; border-radius:25px; padding:25px; text-align:center; margin-bottom:20px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <span style="font-size:0.7rem; color:var(--gold); letter-spacing:2px;">BALANCE PRINCIPAL BS</span>
            <h2 style="margin:10px 0; color:#fff; font-size:2.2rem; font-weight:700;">${saldoBs.toLocaleString('es-VE')}</h2>
            <div style="display:flex; justify-content:center; gap:10px;">
                 <span style="font-size:0.6rem; color:#00ff00; background:#00ff0011; padding:4px 10px; border-radius:20px; border:1px solid #00ff0033;">OPERATIVO</span>
            </div>
        </div>

        <div style="background:#0a0a0a; border:1px solid #222; border-radius:20px; padding:15px; margin-bottom:15px; display:flex; justify-content:space-between; align-items:center;">
            <div>
                <p style="margin:0; font-size:0.8rem; color:#fff;">Aprobaciones Automáticas</p>
                <p style="margin:0; font-size:0.55rem; color:#555;">El sistema validará pagos sin intervención</p>
            </div>
            <div onclick="window.toggleAuto()" style="width:50px; height:26px; background:${aprobacionAutomatica ? 'var(--gold)' : '#222'}; border-radius:15px; position:relative; cursor:pointer; transition:0.3s;">
                <div style="width:20px; height:20px; background:#fff; border-radius:50%; position:absolute; top:3px; left:${aprobacionAutomatica ? '27px' : '3px'}; transition:0.3s;"></div>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px;">
            <div style="background:#0a0a0a; border:1px solid #1a1a1a; padding:12px; border-radius:18px;">
                <label style="font-size:0.55rem; color:#666; display:block; margin-bottom:5px;">% TASA PAGOS</label>
                <input type="number" id="tasa-pagos" value="${tasaPagos}" onchange="tasaPagos=this.value" style="width:80%; background:none; border:none; color:var(--gold); font-size:1.1rem; font-weight:bold; outline:none;"> <span style="color:var(--gold)">%</span>
            </div>
            <div style="background:#0a0a0a; border:1px solid #1a1a1a; padding:12px; border-radius:18px;">
                <label style="font-size:0.55rem; color:#666; display:block; margin-bottom:5px;">% TASA RETIROS</label>
                <input type="number" id="tasa-retiros" value="${tasaRetiros}" onchange="tasaRetiros=this.value" style="width:80%; background:none; border:none; color:#00ff00; font-size:1.1rem; font-weight:bold; outline:none;"> <span style="color:#00ff00">%</span>
            </div>
        </div>

        <div style="background:rgba(255, 207, 64, 0.05); border:1px solid #ffcf4022; border-radius:20px; padding:15px; margin-bottom:15px; display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:0.7rem; color:#888;">MIS GANANCIAS</span>
            <span style="color:var(--gold); font-weight:bold; font-size:1.2rem;">Bs. ${misGananciasBs.toFixed(2)}</span>
        </div>

        <div style="background:#0a0a0a; border:1px solid #222; border-radius:20px; padding:18px; margin-bottom:15px;">
            <p style="font-size:0.7rem; color:var(--gold); font-weight:bold; margin-bottom:12px; text-transform:uppercase; letter-spacing:1px;">⚡ Inyección de Saldo Directa</p>
            <input type="tel" id="rec-telf" placeholder="Número de Teléfono" style="margin-bottom:10px; border-bottom:1px solid #222;">
            <input type="number" id="rec-monto" placeholder="Monto Bs." style="margin-bottom:15px; border-bottom:1px solid #222;">
            <button class="btn-gold" onclick="window.ejecutarRecargaDirecta()" style="padding:12px; font-size:0.75rem;">EJECUTAR CARGA</button>
        </div>

        <button onclick="location.reload()" style="background:none; border:none; color:#444; margin-top:10px; cursor:pointer; font-size:0.6rem; letter-spacing:1px;">DESCONECTAR PANEL MAESTRO</button>
    `;
};

window.toggleAuto = () => {
    aprobacionAutomatica = !aprobacionAutomatica;
    window.mostrarPanelAdmin();
    const estado = aprobacionAutomatica ? "ACTIVADO" : "DESACTIVADO";
    console.log(`Sistema de Aprobación Automática: ${estado}`);
};

window.ejecutarRecargaDirecta = () => {
    const telf = document.getElementById('rec-telf').value;
    const monto = parseFloat(document.getElementById('rec-monto').value);
    if(!telf || !monto) return alert("❌ Datos incompletos");
    
    alert(`🚀 Operación Exitosa\n\nSe han cargado ${monto} Bs al socio ${telf}`);
    saldoBs -= monto; // Se descuenta de tu saldo maestro
    window.mostrarPanelAdmin();
};
