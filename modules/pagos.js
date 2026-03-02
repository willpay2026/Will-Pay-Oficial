/**
 * WILL-PAY - MÓDULO DE PAGOS
 * Propiedad de: Wilfredo Donquiz
 */

const ModuloPagos = {
    // 1. Datos blindados para la recarga
    config: {
        banco: "Banesco",
        id: "13496133",
        telefono: "04126602555",
        moneda: "Bs / USD"
    },

    // 2. Base de datos temporal de seguridad (Anti-Fraude)
    referenciasProcesadas: ["REF001", "REF002"], 

    // 3. Función para dibujar la interfaz de pago
    init: function() {
        const contenedor = document.getElementById('render-pagos');
        contenedor.innerHTML = `
            <div style="background: #000; padding: 10px; border-radius: 8px; border: 1px solid var(--gold);">
                <p style="margin: 5px 0;"><strong>Banco:</strong> ${this.config.banco}</p>
                <p style="margin: 5px 0;"><strong>Cédula:</strong> ${this.config.id}</p>
                <p style="margin: 5px 0;"><strong>Teléfono:</strong> ${this.config.telefono}</p>
            </div>
            <input type="text" id="input-ref" placeholder="N° de Referencia Bancaria" 
                   style="width:100%; margin-top:15px; padding:10px; border-radius:5px; border:none;">
            <button onclick="ModuloPagos.validarReporte()" 
                    style="width:100%; margin-top:10px; background:var(--gold); border:none; padding:10px; font-weight:bold; cursor:pointer; border-radius:5px;">
                REPORTAR PAGO
            </button>
        `;
    },

    // 4. Lógica de Validación
    validarReporte: function() {
        const input = document.getElementById('input-ref');
        const ref = input.value.trim().toUpperCase();

        if (ref === "") {
            alert("Socio, mete el número de referencia para poder procesar.");
            return;
        }

        // CHEQUEO DE SEGURIDAD
        if (this.referenciasProcesadas.includes(ref)) {
            alert("❌ ¡ALERTA! Esta referencia ya fue utilizada. Sistema bloqueado para este pago.");
        } else {
            alert("✅ Referencia recibida. Wilfredo la validará en el panel.");
            // Aquí enviamos la info al panel de Wilfredo (ModuloAdmin)
            if (typeof ModuloAdmin !== 'undefined') {
                ModuloAdmin.recibirNotificacion(ref);
            }
            input.value = "";
        }
    }
};

// Arrancamos el módulo apenas cargue el script
ModuloPagos.init();
