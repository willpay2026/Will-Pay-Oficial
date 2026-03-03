// Módulo de ADN Digital Will-Pay - PROPIEDAD DE WILFREDO DONQUIZ
window.iniciarRegistroADN = () => {
    // Apuntamos al contenedor correcto del Index
    const panel = document.getElementById('content-box');
    
    panel.innerHTML = `
        <div style="animation: fadeIn 0.5s; padding: 10px;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h2 style="color: var(--gold); margin: 0; font-size: 1.4rem; letter-spacing: 2px;">ADN DIGITAL</h2>
                <p style="color: #555; font-size: 0.6rem; letter-spacing: 3px; text-transform: uppercase;">Registro de Usuario Bancario</p>
            </div>

            <div style="background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 25px; padding: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                
                <div style="max-height: 60vh; overflow-y: auto; padding-right: 5px;">
                    
                    <label style="color: #444; font-size: 0.6rem; font-weight: bold; margin-left: 5px;">NOMBRE COMPLETO / RAZÓN SOCIAL</label>
                    <input type="text" id="reg-nombre" placeholder="Ej: Wilfredo Donquiz" style="width:100%; padding:15px; margin: 8px 0 20px 0; background:#000; border:1px solid #222; color:#fff; border-radius:15px; text-align: left; font-size: 0.9rem;">

                    <label style="color: #444; font-size: 0.6rem; font-weight: bold; margin-left: 5px;">CÉDULA / RIF (SOLO NÚMEROS)</label>
                    <input type="number" id="reg-cedula" placeholder="Ej: 13496133" style="width:100%; padding:15px; margin: 8px 0 20px 0; background:#000; border:1px solid #222; color:#fff; border-radius:15px; text-align: left; font-size: 0.9rem;">

                    <label style="color: var(--gold); font-size: 0.6rem; font-weight: bold; margin-left: 5px;">MODALIDAD DE CUENTA</label>
                    <select id="reg-tipo" onchange="window.verificarActividad()" style="width:100%; padding:15px; margin: 8px 0 20px 0; background:#000; border:1px solid var(--gold); color:#fff; border-radius:15px; font-family: 'Lexend'; outline: none;">
                        <option value="normal">Usuario Normal (Tasa 1.5%)</option>
                        <option value="negocio">Actividad Económica (Tasa 5.0%)</option>
                    </select>

                    <div id="aviso-negocio" style="display: none; background: rgba(255, 207, 64, 0.05); padding: 15px; border-radius: 15px; border: 1px solid rgba(255,207,64,0.2); margin-bottom: 20px;">
                        <p style="color: var(--gold); font-size: 0.65rem; line-height: 1.5; margin: 0; text-align: center;">
                            <b>💎 LIBRO DE VIDA DIGITAL:</b> Al ser Socio Comercial, tendrás un historial certificado de cada cobro, ideal para tu control y sustento legal.
                        </p>
                    </div>

                    <div id="seccion-negocio" style="display: none; margin-bottom: 20px;">
                        <label style="color: #444; font-size: 0.6rem; font-weight: bold; margin-left: 5px;">RAMA DE ACTIVIDAD</label>
                        <select id="reg-actividad" style="width:100%; padding:15px; margin: 8px 0; background:#000; border:1px solid #222; color:#fff; border-radius:15px; font-family: 'Lexend'; outline: none;">
                            <optgroup label="Transporte / Delivery">
                                <option>Transporte Urbano</option><option>Mototaxis</option><option>Taxis</option>
                            </optgroup>
                            <optgroup label="Venta de Alimentos">
                                <option>Bodegas</option><option>Comida rápida</option>
                            </optgroup>
                            <optgroup label="Otros">
                                <option>Salud y Belleza</option><option>Servicios Técnicos</option>
                            </optgroup>
                        </select>
                    </div>

                    <label style="color: #444; font-size: 0.6rem; font-weight: bold; margin-left: 5px;">PIN DE SEGURIDAD (6 DÍGITOS)</label>
                    <input type="password" id="reg-pin" maxlength="6" placeholder="••••••" style="width:100%; padding:15px; margin: 8px 0; background:#000; border:1px solid #222; color:var(--gold); border-radius:15px; text-align:center; font-size: 1.2rem; letter-spacing: 5px;">
                </div>

                <button onclick="window.finalizarADN()" class="btn-gold" style="margin-top: 10px;">
                    GENERAR MI ADN DIGITAL
                </button>
            </div>
            
            <p onclick="location.reload()" style="color: #333; font-size: 0.7rem; text-align: center; margin-top: 20px; cursor: pointer;">Volver al Inicio</p>
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
    
    if(!cedula || !nombre) return alert("❌ Jefe, faltan datos críticos para el ADN.");

    const dnaID = `WP-DNA-${cedula}-${Math.floor(Math.random() * 900) + 100}`;
    
    alert(`🎯 ADN DIGITAL GENERADO\n\nSocio: ${nombre}\nID ADN: ${dnaID}\n\nSu solicitud ha sido enviada a Wilfredo Donquiz para aprobación.`);
    
    location.reload();
};
