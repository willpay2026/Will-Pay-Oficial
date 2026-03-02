// Módulo de ADN Digital Will-Pay - Versión Auditoría Total
const iniciarRegistroADN = () => {
    const panel = document.getElementById('login-panel');
    
    panel.innerHTML = `
        <div class="login-card" style="max-width: 450px; text-align: left; border: 2px solid #ffcf40;">
            <h2 style="color: #ffcf40; text-align: center; font-size: 1.2rem;">Registro de Usuario Bancario</h2>
            <p style="text-align: center; color: #888; font-size: 0.7rem; margin-bottom: 20px;">GENERACIÓN DE ADN DIGITAL</p>

            <div style="max-height: 450px; overflow-y: auto; padding-right: 10px;">
                <label style="color: #fff; font-size: 0.8rem;">Nombre Completo (Como en Cédula)</label>
                <input type="text" id="reg-nombre" placeholder="Ej: Wilfredo Donquiz" style="width:100%; padding:12px; margin: 8px 0; background:#111; border:1px solid #333; color:#fff; border-radius:8px;">

                <label style="color: #fff; font-size: 0.8rem;">Cédula / RIF</label>
                <input type="number" id="reg-cedula" placeholder="Ej: 13496133" style="width:100%; padding:12px; margin: 8px 0; background:#111; border:1px solid #333; color:#fff; border-radius:8px;">

                <label style="color: #fff; font-size: 0.8rem;">Teléfono</label>
                <input type="tel" id="reg-telefono" placeholder="Ej: 04126602555" style="width:100%; padding:12px; margin: 8px 0; background:#111; border:1px solid #333; color:#fff; border-radius:8px;">

                <label style="color: #ffcf40; font-size: 0.8rem; font-weight: bold;">Modalidad de Cuenta</label>
                <select id="reg-tipo" onchange="verificarActividad()" style="width:100%; padding:12px; margin: 8px 0; background:#111; border:1px solid #ffcf40; color:#fff; border-radius:8px;">
                    <option value="normal">Usuario Normal (Personal)</option>
                    <option value="negocio">Actividad Económica / Negocio</option>
                </select>

                <div id="seccion-negocio" style="display: none; background: #0a0a0a; padding: 15px; border-radius: 10px; margin-top: 10px; border: 1px dashed #ffcf40;">
                    <label style="color: #fff; font-size: 0.8rem;">Nombre del Establecimiento / Firma</label>
                    <input type="text" id="reg-comercio" placeholder="Ej: Inversiones Donquiz C.A." style="width:100%; padding:12px; margin: 8px 0; background:#111; border:1px solid #333; color:#fff; border-radius:8px;">
                    
                    <label style="color: #fff; font-size: 0.8rem;">Rama de Actividad Económica</label>
                    <select id="reg-actividad" style="width:100%; padding:12px; margin: 8px 0; background:#111; border:1px solid #333; color:#fff; border-radius:8px;">
                        <optgroup label="Transporte / Delivery">
                            <option>Transporte Urbano</option>
                            <option>Transporte Extra Urbano</option>
                            <option>Transporte Independiente</option>
                            <option>Mototaxis</option>
                            <option>Taxis</option>
                            <option>Transporte escolar</option>
                            <option>Fletes</option>
                        </optgroup>
                        <optgroup label="Venta de Alimentos">
                            <option>Bodegas</option>
                            <option>Charcuterías</option>
                            <option>Comida rápida</option>
                            <option>Repostería</option>
                        </optgroup>
                        <optgroup label="Salud y Belleza">
                            <option>Peluquerías</option>
                            <option>Barberías</option>
                            <option>Manicuristas</option>
                        </optgroup>
                        <optgroup label="Servicios Técnicos">
                            <option>Mecánicos</option>
                            <option>Electricistas</option>
                            <option>Técnicos de refrigeración</option>
                            <option>Electrónica</option>
                        </optgroup>
                        <optgroup label="Profesional Independiente">
                            <option>Abogados</option>
                            <option>Contadores</option>
                            <option>Diseñadores</option>
                        </optgroup>
                    </select>
                </div>

                <label style="color: #ffcf40; font-size: 0.8rem; margin-top: 15px; display: block;">Crea tu PIN de Seguridad (6 números)</label>
                <input type="password" id="reg-pin" maxlength="6" placeholder="••••••" style="width:100%; padding:12px; margin: 8px 0; background:#111; border:1px solid #333; color:#fff; border-radius:8px; text-align:center;">

                <label style="color: #fff; font-size: 0.8rem;">Foto de Cédula / RIF</label>
                <input type="file" id="reg-foto-cedula" style="width:100%; margin: 10px 0; color: #888; font-size: 0.7rem;">
                
                <label style="color: #fff; font-size: 0.8rem;">Foto Selfie con Cédula</label>
                <input type="file" id="reg-foto-selfie" style="width:100%; margin: 10px 0; color: #888; font-size: 0.7rem;">
            </div>

            <button onclick="finalizarADN()" class="btn-gold" style="width:100%; background:#ffcf40; color:#000; border:none; padding:18px; border-radius:12px; font-weight:bold; margin-top:20px; cursor:pointer;">
                GENERAR MI ADN DIGITAL
            </button>
        </div>
    `;
};

// Función para mostrar/ocultar campos de negocio
window.verificarActividad = () => {
    const tipo = document.getElementById('reg-tipo').value;
    const seccionNegocio = document.getElementById('seccion-negocio');
    seccionNegocio.style.display = (tipo === 'negocio') ? 'block' : 'none';
};

window.finalizarADN = () => {
    const nombre = document.getElementById('reg-nombre').value;
    const cedula = document.getElementById('reg-cedula').value;
    const tipo = document.getElementById('reg-tipo').value;
    const actividad = document.getElementById('reg-actividad').value;
    
    if(!cedula || !nombre) return alert("❌ Jefe, faltan datos críticos para el ADN Digital.");

    const dnaID = `WP-DNA-${cedula}-${Math.floor(Math.random() * 900) + 100}`;
    const msjExtra = (tipo === 'negocio') ? `\nActividad: ${actividad}` : "";
    
    alert(`🎯 ADN DIGITAL GENERADO\n\nSocio: ${nombre}${msjExtra}\nID ADN: ${dnaID}\n\nEspere la aprobación de Wilfredo Donquiz.`);
    location.reload();
};
