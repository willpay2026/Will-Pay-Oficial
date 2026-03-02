/**
 * WILL-PAY - MÓDULO ADMINISTRATIVO (MAESTRO)
 * Nivel de Seguridad: Bloqueado por Clave para Wilfredo Donquiz
 */

const ModuloAdmin = {
    balanceComisiones: 0.00,
    tasaPorTransaccion: 1.50, // Tu ganancia por cada clic en "Aprobar"
    pagosPendientes: [],
    claveMaestra: "Willy2026", // <--- TU CLAVE SECRETA (Cámbiala cuando quieras)

    init: function() {
        this.renderizarBloqueado();
    },

    // 1. Muestra el panel con candado (Lo que verá el público)
    renderizarBloqueado: function() {
        const contenedor = document.getElementById('render-admin');
        contenedor.innerHTML = `
            <div id="admin-lock" style="text-align: center; padding: 20px; border: 1px solid #333; border-radius: 8px;">
                <p style="color: var(--gold); font-weight: bold;">🔒 OFICINA PRIVADA</p>
                <input type="password" id="pass-admin" placeholder="Introduce clave" 
                       style="width:100%; padding:10px; margin-bottom:10px; border-radius:5px; border:1px solid #444; background:#111; color:#fff;">
                <button onclick="ModuloAdmin.desbloquear()" 
                        style="width:100%; background:var(--gold); border:none; padding:10px; border-radius:5px; font-weight:bold; cursor:pointer;">
                    ENTRAR AL PANEL
                </button>
            </div>
            <div id="admin-content" style="display:none;"></div>
        `;
    },

    // 2. Verifica la identidad del dueño
    desbloquear: function() {
        const pass = document.getElementById('pass-admin').value;
        if (pass === this.claveMaestra) {
            document.getElementById('admin-lock').style.display = 'none';
            document.getElementById('admin-content').style.display = 'block';
            this.mostrarPanelReal();
        } else {
            alert("❌ Acceso denegado. Solo el dueño Wilfredo puede entrar.");
        }
    },

    // 3. Tu panel real con el dinero (Solo aparece tras la clave)
    mostrarPanelReal: function() {
        const content = document.getElementById('admin-content');
        content.innerHTML = `
            <div style="text-align: center; margin-bottom: 15px; background: #000; padding: 15px; border-radius: 10px; border: 1px solid #00ff00;">
                <span style="font-size: 0.8rem; color: #888;">MIS COMISIONES (LEGADO)</span><br>
                <span id="display-comision" style="font-size: 2.2rem; color: #00ff00; font-weight: bold;">
                    $${this.balanceComisiones.toFixed(2)}
                </span>
            </div>
            <div id="lista-notificaciones" style="background: #111; padding: 10px; border-radius: 8px;">
                <p style="font-size: 0.8rem; color: #555; text-align: center;" id="msg-vacio">
                    Esperando reportes de usuarios...
                </p>
            </div>
        `;
        // Recarga los pagos si alguien reportó mientras estaba bloqueado
        if(this.pagosPendientes.length > 0) {
            this.pagosPendientes.forEach(ref => this.dibujarTicket(ref));
        }
    },

    recibirNotificacion: function(referencia) {
        this.pagosPendientes.push(referencia);
        if(document.getElementById('lista-notificaciones')) {
            this.dibujarTicket(referencia);
        }
    },

    dibujarTicket: function(ref) {
        const lista = document.getElementById('lista-notificaciones');
        const msgVacio = document.getElementById('msg-vacio');
        if (msgVacio) msgVacio.remove();

        const ticket = document.createElement('div');
        ticket.style = "background:#222; margin: 8px 0; padding: 12px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; border-left: 4px solid #00ff00;";
        ticket.innerHTML = `
            <span style="font-size: 0.9rem;">Ref: <b>${ref}</b></span>
            <button onclick="ModuloAdmin.aprobarPago('${ref}', this)" 
                    style="background:#00ff00; color:#000; border:none; padding:6px 12px; border-radius:4px; cursor:pointer; font-weight:bold;">
                APROBAR $
            </button>
        `;
        lista.appendChild(ticket);
    },

    aprobarPago: function(ref, boton) {
        this.balanceComisiones += this.tasaPorTransaccion;
        document.getElementById('display-comision').innerText = `$${this.balanceComisiones.toFixed(2)}`;
        boton.parentElement.innerHTML = `<span style="color:#00ff00; font-size: 0.8rem; font-weight:bold;">✅ PAGO APROBADO (+$${this.tasaPorTransaccion})</span>`;
    }
};

// Arrancamos el sistema de seguridad
ModuloAdmin.init();
