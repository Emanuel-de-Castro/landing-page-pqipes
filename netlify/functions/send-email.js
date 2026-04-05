// Arquivo: netlify/functions/send-email.js

import nodemailer from 'nodemailer';

export async function handler(event) {
  // 1. Permite apenas requisições POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Método não permitido' };
  }

  try {
    const dados = JSON.parse(event.body);

    // 2. 📬 Configuração do transporte (SMTP)
    // Lembre-se de configurar as variáveis de ambiente no painel do Netlify
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Altere para o seu provedor (ex: smtp.gmail.com)
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // Variável de ambiente
        pass: process.env.EMAIL_PASS  // Variável de ambiente
      }
    });

    // 3. Opções do e-mail
    const mailOptions = {
      from: `"Contato Site" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_DESTINO, // Para onde o e-mail será enviado
      subject: `Site Parque dos Ipes Cipo`,
      text: `Nome: ${dados.nome}\nEmail: ${dados.email}\nTelefone: ${dados.telefone}`
    };

    // 4. Envia o e-mail
    await transporter.sendMail(mailOptions);
    return { statusCode: 200, body: JSON.stringify({ sucesso: true }) };

  } catch (erro) {
    console.error('Erro ao enviar e-mail:', erro);
    return { statusCode: 500, body: JSON.stringify({ erro: 'Falha ao enviar e-mail.' }) };
  }
}