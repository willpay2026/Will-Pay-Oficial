/**
 * WILL-PAY - MÓDULO ADMINISTRATIVO (MAESTRO)
 * Propiedad exclusiva de: Wilfredo Donquiz
 */

const ModuloAdmin = {
    balanceComisiones: 0.00,
    tasaPorTransaccion: 1.50, // Lo que ganas tú por cada aprobación (ajustable)
    pagosPendientes: [],

    // 1. Inicia la vista del panel maestro
    init: function() {
        this.renderizar();
    },

    // 2. Dibuja el panel en la pantalla
    renderizar: function() {
        const contenedor = document.getElementById('render-admin');
        contenedor.innerHTML = `
            <div style="text-align: center; margin-bottom: 15px;">
                <span style="font-size: 0.8rem; color: #888;">BALANCE ACUMULADO</span><br>
                <span id="display-comision" style="font-size: 2rem; color: #00ff00; font-weight: bold;">
                    $${this.balanceComisiones.toFixed(2)}
                </span>
            </div>
            
            <div id="lista-notificaciones" style="background: #000; padding: 10px; border-radius: 8px; min-height: 50px;">
                <p style="font-size: 0.8rem; color: #555; text-align: center;" id="msg-vacio">
                    No hay pagos pendientes por aprobar
                </p>
            </div>
        `;
    },

    // 3. Recibe la señal del módulo de pagos
    recibirNotificacion: function(referencia) {
        this.pagosPendientes.push(referencia);
        this.actualizarLista();
    },

    // 4. Muestra los pagos que están esperando por tu "OK"
    actualizarLista: function() {
        const lista = document.getElementById('lista-notificaciones');
        const msgVacio = document.getElementById('msg-vacio');
        
        if (msgVacio) msgVacio.remove();

        // Creamos la alerta visual del pago entrante
        const ticket = document.createElement('div');
        ticket.style = "background:#222; margin: 5px 0; padding: 10px; border-radius: 5px; display: flex; justify-content: space-between; align-items: center; border-left: 3px solid #00ff00;";
        ticket.innerHTML = `
            <span style="font-size: 0.9rem;">Ref: <b>${this.pagosPendientes[this.pagosPendientes.length - 1]}</b></span>
            <button onclick="ModuloAdmin.aprobarPago('${this.pagosPendientes[this.pagosPendientes.length - 1]}', this)" 
                    style="background:#00ff00; color:#000; border:none; padding:5px 10px; border-radius:3px; cursor:pointer; font-weight:bold;">
                APROBAR
            </button>
        `;
        lista.appendChild(ticket);
    },

    // 5. Acción final: Sumas dinero y "quemas" la referencia
    aprobarPago: function(ref, boton) {
        // Sumamos la comisión al legado
        this.balanceComisiones += this.tasaPorTransaccion;
        
        // Actualizamos el display de dinero
        document.getElementById('display-comision').innerText = `$${this.balanceComisiones.toFixed(2)}`;
        
        // Efecto visual: Eliminamos el ticket aprobado
        boton.parentElement.innerHTML = `<span style="color:#00ff00; font-size: 0.8rem;">✅ Ref ${ref} Aprobada</span>`;
        
        console.log(`Comisión registrada: +$${this.tasaPorTransaccion}. Total: $${this.balanceComisiones}`);
    }
};

// Arrancamos el panel maestro
ModuloAdmin.init();
