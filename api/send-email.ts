import nodemailer from 'nodemailer';
import type { Request, Response } from 'express';

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') return res.status(405).send('Método no permitido');

  const { nombre, apellido, email, asunto, mensaje } = req.body;

  if (!nombre || !apellido || !email || !mensaje)
    return res.status(400).json({ message: 'Faltan campos obligatorios' });

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL,
      subject: asunto || 'Nuevo mensaje del formulario',
      text: `De: ${nombre} ${apellido} <${email}>\n\n${mensaje}`,
    });

    res.status(200).json({ message: 'Correo enviado correctamente' });
  } catch (error) {
    console.error('Error enviando correo:', error);
    res.status(500).json({ message: 'Error al enviar el correo' });
  }
}
