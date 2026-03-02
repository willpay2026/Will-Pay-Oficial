// Módulo de ADN Digital Will-Pay - Versión Segmentada
const iniciarRegistroADN = () => {
    const panel = document.getElementById('login-panel');
    
    panel.innerHTML = `
        <div class="login-card" style="max-width: 450px; text-align: left; border: 2px solid #ffcf40;">
            <h2 style="color: #ffcf40; text-align: center; font-size: 1.2rem;">Registro de Usuario Bancario</h2>
            <p style="text-align: center; color: #888; font-size: 0.7rem; margin-bottom: 20px;">GENERACIÓN DE ADN DIGITAL</p>

            <div style="max-height: 450px; overflow-y: auto; padding-right: 10px;">
                <label style="color: #fff; font-size: 0.8rem;">Nombre Completo / Razón Social</label>
                <input type="text" id="reg-nombre" placeholder="Ej: Wilfredo Donquiz" style="width:100%; padding:12px; margin: 8px 0; background:#111; border:1px solid #333; color:#fff; border-radius:8px;">

                <label style="color: #fff; font-size: 0.8rem;">Cédula / RIF</label>
                <input type="number" id="reg-cedula" placeholder="Ej: 13496133" style="width:100%; padding:12px; margin: 8px 0; background:#111; border:1px solid #333; color:#fff; border-radius:8px;">

                <label style="color: #ffcf40; font-size: 0.8rem; font-weight: bold;">Modalidad de Cuenta</label>
                <select id="reg-tipo" onchange="verificarActividad()" style="width:100%; padding:12px; margin: 8px 0; background:#111; border:1px solid #ffcf40; color:#fff; border-radius:8px;">
                    <option value="normal">Usuario Normal (Tasa 1.5%)</option>
                    <option value="negocio">Actividad Económica (Tasa 5.0%)</option>
                </select>

                <div id="aviso-negocio" style="display: none; background: rgba(255, 207, 64, 0.1); padding: 15px; border-radius: 10px; border: 1px solid var(--gold); margin: 10px 0;">
                    <p style="color: var(--gold); font-size: 0.65rem; line-height: 1.4; margin: 0;">
                        <b>💎 BENEFICIO SOCIO COMERCIAL:</b> Al usar Will-Pay para tu negocio, activas tu <b>Libro de Vida Digital</b>. 
                        Tendrás un historial certificado de cada cobro y pago, ideal para tu control administrativo 
                        y como sustento ante declaraciones de ISLR.
                    </p>
                </div>

                <div id="seccion-negocio" style="display: none; background: #0a0a0a; padding: 15px; border-radius: 10px; margin-top: 10px; border: 1px dashed #555;">
                    <label style="color: #fff; font-size: 0.8rem;">Rama de Actividad</label>
                    <select id="reg-actividad" style="width:100%; padding:12px; margin: 8px 0; background:#111; border:1px solid #333; color:#fff; border-radius:8px;">
                        <optgroup label="Transporte / Delivery">
                            <option>Transporte Urbano</option><option>Transporte Extra Urbano</option><option>Mototaxis</option><option>Taxis</option>
                        </optgroup>
                        <optgroup label="Venta de Alimentos">
                            <option>Bodegas</option><option>Comida rápida</option><option>Repostería</option>
                        </optgroup>
                        <optgroup label="Otros">
                            <option>Salud y Belleza</option><option>Servicios Técnicos</option><option>Profesional Independiente</option>
                        </optgroup>
                    </select>
                </div>

                <label style="color: #fff; font-size: 0.8rem; margin-top: 15px; display: block;">PIN de Seguridad (6 dígitos)</label>
                <input type="password" id="reg-pin" maxlength="6" placeholder="••••••" style="width:100%; padding:12px; margin: 8px 0; background:#111; border:1px solid #333; color:#fff; border-radius:8px; text-align:center;">
            </div>

            <button onclick="finalizarADN()" class="btn-gold" style="width:100%; background:#ffcf40; color:#000; border:none; padding:18px; border-radius:12px; font-weight:bold; margin-top:20px; cursor:pointer;">
                GENERAR MI ADN DIGITAL
            </button>
        </div>
    `;
};

window.verificarActividad = () => {
    const tipo = document.getElementById('reg-tipo').value;
    const seccionNegocio = document.getElementById('seccion-negocio');
    const avisoNegocio = document.getElementById('aviso-negocio');
    
    if (tipo === 'negocio') {
        seccionNegocio.style.display = 'block';
        avisoNegocio.style.display = 'block';
    } else {
        seccionNegocio.style.display = 'none';
        avisoNegocio.style.display = 'none';
    }
};

window.finalizarADN = () => {
    const cedula = document.getElementById('reg-cedula').value;
    const nombre = document.getElementById('reg-nombre').value;
    
    if(!cedula || !nombre) return alert("❌ Jefe, faltan datos críticos.");

    const dnaID = `WP-DNA-${cedula}-${Math.floor(Math.random() * 900) + 100}`;
    alert(`🎯 ADN DIGITAL GENERADO\n\nSocio: ${nombre}\nID ADN: ${dnaID}\n\nEspere la aprobación de Wilfredo Donquiz.`);
    location.reload();
};
