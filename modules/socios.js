/**
 * WILL-PAY - MÓDULO DE GESTIÓN DE SOCIOS
 * Propiedad de: Wilfredo Donquiz
 */

const ModuloSocios = {
    // 1. Configuración de la reserva mágica
    maxSocios: 5,
    sociosActuales: [], // Lista de socios activos

    // 2. Inicia la vista de socios
    init: function() {
        this.renderizar();
    },

    // 3. Dibuja el estado de los cupos en el panel
    renderizar: function() {
        const contenedor = document.getElementById('render-socios');
        const cuposDisponibles = this.maxSocios - this.sociosActuales.length;

        contenedor.innerHTML = `
            <div style="text-align: center; padding: 10px; background: #000; border-radius: 8px; border: 1px dashed var(--gold);">
                <p style="margin: 0; font-size: 0.9rem;">Cupos Reservados para Socios:</p>
                <span style="font-size: 1.5rem; color: var(--gold); font-weight: bold;">
                    ${cuposDisponibles} de ${this.maxSocios}
                </span>
                <p style="font-size: 0.7rem; color: #666; margin-top: 5px;">
                    Espacios protegidos por Wilfredo Donquiz para expansión estratégica.
                </p>
            </div>
            <div id="lista-socios-activos" style="margin-top: 10px;">
                </div>
        `;
    },

    // 4. Función para agregar un socio (Solo tú la activas)
    activarNuevoSocio: function(nombre) {
        if (this.sociosActuales.length < this.maxSocios) {
            this.sociosActuales.push(nombre);
            this.renderizar(); // Actualiza la vista
            console.log(`✅ Socio ${nombre} activado. Legado expandiéndose.`);
        } else {
            alert("❌ No hay más cupos disponibles. Los 5 espacios reservados están llenos.");
        }
    }
};

// Arrancamos el módulo de socios
ModuloSocios.init();
