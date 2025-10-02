import nodemailer from 'nodemailer';
import type { IncomingMessage, ServerResponse } from 'http';

// Definimos un tipo para la request body esperada
interface ContactFormBody {
  nombre: string;
  apellido: string;
  email: string;
  asunto?: string;
  mensaje: string;
}

// Creamos tipos para la request y response, usando la interfaz anterior
interface VercelRequest extends IncomingMessage {
  body: ContactFormBody;
}

interface VercelResponse extends ServerResponse {
  status: (code: number) => VercelResponse & { json: (data: any) => void };
  json: (data: any) => void;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('--- Llamada al API /send-email ---');
  console.log('Método recibido:', req.method);
  console.log('Cuerpo recibido:', req.body);

  if (req.method !== 'POST') {
    console.warn('Método no permitido');
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { nombre, apellido, email, asunto, mensaje } = req.body;

  if (!nombre || !apellido || !email || !mensaje) {
    console.warn('Faltan campos obligatorios:', { nombre, apellido, email, mensaje });
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  try {
    console.log('Configurando transporter de Nodemailer...');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true si usas 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    console.log('Enviando correo a:', process.env.CONTACT_EMAIL);
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL,
      subject: asunto || 'Nuevo mensaje del formulario',
      text: `De: ${nombre} ${apellido} <${email}>\n\n${mensaje}`,
    });

    console.log('Correo enviado correctamente');
    res.status(200).json({ message: 'Correo enviado correctamente' });
  } catch (error) {
    console.error('Error enviando correo:', error);
    res.status(500).json({ message: 'Error al enviar el correo' });
  }
}
