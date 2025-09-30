import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta para enviar email
app.post('/send-email', async (req, res) => {
  const { nombre, apellido, email, asunto, mensaje } = req.body;

  console.log('Solicitud recibida:', req.body); // log de los datos entrantes

  if (!nombre || !apellido || !email || !mensaje) {
    console.warn('Faltan campos obligatorios');
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  try {
    console.log('Configurando transporter de Nodemailer...');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    console.log('Enviando correo...');
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL,
      subject: asunto || 'Nuevo mensaje del formulario',
      text: `De: ${nombre} ${apellido} <${email}>\n\n${mensaje}`,
    });

    console.log('Correo enviado correctamente');
    res.status(200).json({ message: 'Correo enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar correo:', error);
    res.status(500).json({ message: 'Error al enviar el correo' });
  }
});

// Servidor escuchando
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
