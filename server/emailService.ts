import sgMail from '@sendgrid/mail';

// Configurar SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

interface ContactEmailData {
  nome: string;
  email: string;
  telefone?: string;
  assunto: string;
  mensagem: string;
}

const getSubjectText = (assunto: string): string => {
  switch (assunto) {
    case 'busco-ajuda':
      return 'Busco ajuda';
    case 'quero-apoiar':
      return 'Quero apoiar';
    case 'parcerias':
      return 'Parcerias';
    case 'informacoes':
      return 'Informações gerais';
    default:
      return 'Contato';
  }
};

export async function sendContactEmail(data: ContactEmailData): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('SendGrid não configurado. Email que seria enviado:', data);
    return true; // Retorna sucesso para não quebrar o fluxo em desenvolvimento
  }

  const subjectText = getSubjectText(data.assunto);
  
  const msg = {
    to: 'institutostellas@gmail.com',
    from: {
      email: 'noreply@institutostellas.org.br',
      name: 'Site Instituto Stellas'
    },
    replyTo: data.email,
    subject: `[Site] ${subjectText} - ${data.nome}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #247B7F; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Instituto Stellas</h1>
          <p style="margin: 5px 0 0 0;">Nova mensagem do site</p>
        </div>
        
        <div style="padding: 20px; background: #f8f9fa;">
          <h2 style="color: #247B7F; margin-top: 0;">Detalhes do Contato</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #2D3748;">Nome:</td>
              <td style="padding: 8px 0;">${data.nome}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #2D3748;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #247B7F;">${data.email}</a></td>
            </tr>
            ${data.telefone ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #2D3748;">Telefone:</td>
              <td style="padding: 8px 0;">${data.telefone}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #2D3748;">Assunto:</td>
              <td style="padding: 8px 0;">${subjectText}</td>
            </tr>
          </table>
          
          <h3 style="color: #247B7F; margin: 20px 0 10px 0;">Mensagem:</h3>
          <div style="background: white; padding: 15px; border-left: 4px solid #F28A3A; border-radius: 4px;">
            ${data.mensagem.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <div style="background: #2D3748; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">Esta mensagem foi enviada através do site do Instituto Stellas</p>
          <p style="margin: 5px 0 0 0;">Para responder, utilize o email: ${data.email}</p>
        </div>
      </div>
    `,
    text: `
Nova mensagem do site Instituto Stellas

Nome: ${data.nome}
Email: ${data.email}
${data.telefone ? `Telefone: ${data.telefone}` : ''}
Assunto: ${subjectText}

Mensagem:
${data.mensagem}

---
Esta mensagem foi enviada através do site do Instituto Stellas.
Para responder, utilize o email: ${data.email}
    `
  };

  try {
    await sgMail.send(msg);
    console.log('Email enviado com sucesso para institutostellas@gmail.com');
    return true;
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return false;
  }
}

export async function sendAutoReply(recipientEmail: string, nome: string, assunto: string): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('SendGrid não configurado. Auto-resposta que seria enviada para:', recipientEmail);
    return true;
  }

  const subjectText = getSubjectText(assunto);
  
  const msg = {
    to: recipientEmail,
    from: {
      email: 'institutostellas@gmail.com',
      name: 'Instituto Stellas'
    },
    subject: `Recebemos sua mensagem - Instituto Stellas`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #247B7F; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Instituto Stellas</h1>
          <p style="margin: 5px 0 0 0;">Do trauma à transformação: um caminho possível com apoio</p>
        </div>
        
        <div style="padding: 20px;">
          <h2 style="color: #247B7F;">Olá, ${nome}!</h2>
          
          <p>Recebemos sua mensagem sobre "<strong>${subjectText}</strong>" e agradecemos por entrar em contato conosco.</p>
          
          <p>Nossa equipe analisará sua solicitação e retornará o contato em breve. O tempo de resposta pode variar de acordo com a demanda, mas nos comprometemos a responder o mais rapidamente possível.</p>
          
          ${assunto === 'busco-ajuda' ? `
          <div style="background: #FFF3CD; border: 1px solid #F28A3A; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #F28A3A; margin: 0 0 10px 0;">🚨 Emergência?</h3>
            <p style="margin: 0;"><strong>Se você está em situação de emergência, ligue:</strong></p>
            <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: bold;">📞 Central de Atendimento à Mulher: 180</p>
            <p style="margin: 5px 0 0 0;">📞 Polícia Militar: 190</p>
          </div>
          ` : ''}
          
          <p>Enquanto isso, você pode:</p>
          <ul>
            <li>Conhecer mais sobre nosso trabalho em nosso site</li>
            <li>Seguir nossas redes sociais para acompanhar nossas atividades</li>
            <li>Compartilhar nossa missão com outras pessoas que possam precisar de apoio</li>
          </ul>
          
          <p>Gratidão por confiar em nosso trabalho.</p>
          
          <p style="margin-top: 30px;">
            <strong>Equipe Instituto Stellas</strong><br>
            📧 institutostellas@gmail.com<br>
            🌐 www.institutostellas.org.br
          </p>
        </div>
        
        <div style="background: #2D3748; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">Instituto Stellas - Transformando luto em luta</p>
        </div>
      </div>
    `,
    text: `
Olá, ${nome}!

Recebemos sua mensagem sobre "${subjectText}" e agradecemos por entrar em contato conosco.

Nossa equipe analisará sua solicitação e retornará o contato em breve. O tempo de resposta pode variar de acordo com a demanda, mas nos comprometemos a responder o mais rapidamente possível.

${assunto === 'busco-ajuda' ? `
🚨 EMERGÊNCIA?
Se você está em situação de emergência, ligue:
📞 Central de Atendimento à Mulher: 180
📞 Polícia Militar: 190
` : ''}

Enquanto isso, você pode:
- Conhecer mais sobre nosso trabalho em nosso site
- Seguir nossas redes sociais para acompanhar nossas atividades
- Compartilhar nossa missão com outras pessoas que possam precisar de apoio

Gratidão por confiar em nosso trabalho.

Equipe Instituto Stellas
📧 institutostellas@gmail.com
🌐 www.institutostellas.org.br

Instituto Stellas - Transformando luto em luta
    `
  };

  try {
    await sgMail.send(msg);
    console.log('Auto-resposta enviada com sucesso para:', recipientEmail);
    return true;
  } catch (error) {
    console.error('Erro ao enviar auto-resposta:', error);
    return false;
  }
}