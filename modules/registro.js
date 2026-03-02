// Módulo de ADN Digital Will-Pay
const iniciarRegistroADN = () => {
    // Buscamos el panel principal para cambiar el contenido
    const panel = document.getElementById('login-panel');
    
    panel.innerHTML = `
        <div class="login-card" style="max-width: 450px; text-align: left; border: 2px solid #ffcf40;">
            <h2 style="color: #ffcf40; text-align: center; font-size: 1.2rem;">Registro de Usuario Bancario</h2>
            <p style="text-align: center; color: #888; font-size: 0.7rem; margin-bottom: 20px;">GENERACIÓN DE ADN DIGITAL</p>

            <div style="max-height: 400px; overflow-y: auto; padding-right: 10px;">
                <label style="color: #fff; font-size: 0.8rem;">Nombre Completo (Como en Cédula)</label>
                <input type="text" id="reg-nombre" placeholder="Ej: Wilyanny Donquiz" style="width:100%; padding:12px; margin: 8px 0; background:#111; border:1px solid #333; color:#fff; border-radius:8px;">

                <label style="color: #fff; font-size: 0.8rem;">Cédula / RIF</label>
                <input type="number" id="reg-cedula" placeholder="Ej: 34127225" style="width:100%; padding:12px; margin: 8px 0; background:#111; border:1px solid #333; color:#fff; border-radius:8px;">

                <label style="color: #fff; font-size: 0.8rem;">Teléfono</label>
                <input type="tel" id="reg-telefono" placeholder="Ej: 04121055694" style="width:100%; padding:12px; margin: 8px 0; background:#111; border:1px solid #333; color:#fff; border-radius:8px;">

                <label style="color: #fff; font-size: 0.8rem;">Tipo de Usuario / Actividad</label>
                <select id="reg-tipo" style="width:100%; padding:12px; margin: 8px 0; background:#111; border:1px solid #333; color:#fff; border-radius:8px;">
                    <option>Usuario Particular (Pasajero/Cliente)</option>
                    <option>Socio Conductor</option>
                    <option>Comercio Aliado</option>
                </select>

                <label style="color: #ffcf40; font-size: 0.8rem;">Crea tu PIN de Seguridad (6 números)</label>
                <input type="password" id="reg-pin" maxlength="6" placeholder="••••••" style="width:100%; padding:12px; margin: 8px 0; background:#111; border:1px solid #333; color:#fff; border-radius:8px; text-align:center;">

                <label style="color: #fff; font-size: 0.8rem;">Foto de Cédula (Auditoría Visual)</label>
                <input type="file" id="reg-foto-cedula" style="width:100%; margin: 10px 0; color: #888; font-size: 0.7rem;">
                
                <label style="color: #fff; font-size: 0.8rem;">Foto Selfie (Verificación)</label>
                <input type="file" id="reg-foto-selfie" style="width:100%; margin: 10px 0; color: #888; font-size: 0.7rem;">
            </div>

            <button onclick="finalizarADN()" style="width:100%; background:#ffcf40; color:#000; border:none; padding:18px; border-radius:12px; font-weight:bold; margin-top:20px; cursor:pointer;">
                FINALIZAR REGISTRO Y GENERAR EXPEDIENTE
            </button>
        </div>
    `;
};

window.finalizarADN = () => {
    const cedula = document.getElementById('reg-cedula').value;
    const nombre = document.getElementById('reg-nombre').value;
    
    if(!cedula || !nombre) return alert("❌ Jefe, no podemos generar ADN sin Nombre o Cédula.");

    // Generamos el Correlativo de ADN
    const dnaID = `WP-DNA-${cedula}-${Math.floor(Math.random() * 900) + 100}`;
    
    alert(`🎯 EXPEDIENTE GENERADO\n\nSocio: ${nombre}\nID ADN: ${dnaID}\n\nEstado: Esperando aprobación de Wilfredo Donquiz.`);
    location.reload();
};
