const { Client } = require('pg');
const express = require('express');
const app = express();
app.use(express.json());

// LA LLAVE QUE ME PASASTE
const connectionString = 'postgresql://willpay_db_user:746J7SWXHVCv07Ttl6AE5dIk68Ex6jWN@dpg-d6ea0e5m5p6s73dhh1a0-a.oregon-postgres.render.com/willpay_db?ssl=true';

const client = new Client({ connectionString });
client.connect();

// CREAR LA TABLA DEL LEGADO (Si no existe)
const setupDB = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS socios_oficiales (
            id SERIAL PRIMARY KEY,
            nombre TEXT NOT NULL,
            telefono TEXT UNIQUE NOT NULL,
            pin TEXT NOT NULL,
            saldo DECIMAL(15,2) DEFAULT 0.00,
            rol TEXT DEFAULT 'SOCIO',
            fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    await client.query(query);
    console.log("Caja fuerte 'socios_oficiales' lista.");
};
setupDB();

// RUTA PARA EL LOGIN REAL
app.post('/login', async (req, res) => {
    const { user, pin } = req.body;
    const result = await client.query('SELECT * FROM socios_oficiales WHERE telefono = $1 AND pin = $2', [user, pin]);
    
    if (result.rows.length > 0) {
        res.json({ success: true, usuario: result.rows[0] });
    } else {
        res.json({ success: false, message: "Datos incorrectos o ADN no registrado" });
    }
});

app.listen(process.env.PORT || 3000, () => console.log("Will-Pay operando en el puerto 3000"));
