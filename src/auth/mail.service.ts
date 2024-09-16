import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) { }

  sendMail(verificationCode: string, username: string, from: string, to: string) {
    const htmlMessage = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                  color: #333;
              }
              .email-container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              .email-header {
                  background-color: #4CAF50;
                  color: #ffffff;
                  padding: 20px;
                  text-align: center;
                  border-top-left-radius: 8px;
                  border-top-right-radius: 8px;
              }
              .email-body {
                  padding: 30px;
              }
              .email-body p {
                  line-height: 1.6;
              }
              .verification-code {
                  font-size: 20px;
                  font-weight: bold;
                  color: #4CAF50;
                  margin: 20px 0;
                  text-align: center;
              }
              .email-footer {
                  background-color: #f4f4f4;
                  padding: 20px;
                  text-align: center;
                  font-size: 12px;
                  color: #999;
                  border-bottom-left-radius: 8px;
                  border-bottom-right-radius: 8px;
              }
          </style>
      </head>
      <body>
          <div class="email-container">
              <div class="email-header">
                  <h1>Bienvenue sur [Nom du site]</h1>
              </div>
              <div class="email-body">
                  <p>Bonjour <strong>${username}</strong>,</p>
                  <p>Merci de vous être inscrit(e) sur <strong>[Nom du site]</strong>. Pour finaliser votre inscription et activer votre compte, veuillez confirmer votre adresse email en cliquant sur ce lien :</p>
                  <div class="verification-code">${verificationCode}</div>
                  <p>Entrez ce code dans les 3 prochaines heures pour valider votre compte. Si vous n'avez pas initié cette demande, veuillez ignorer cet email.</p>
                  <p>Nous sommes ravis de vous accueillir et avons hâte de vous offrir la meilleure expérience possible sur notre plateforme.</p>
              </div>
              <div class="email-footer">
                  <p>Cordialement,</p>
                  <p>L'équipe de [Nom du site]</p>
                  <p>team@dashboard.com</p>
              </div>
          </div>
      </body>
      </html>
    `;

    this.mailService.sendMail({
      from: `Équipe <${from}>`,
      to: to,
      subject: 'Confirmez votre inscription sur dashboard',
      html: htmlMessage
    });
  }


  sendResetCode(verificationCode, from, to, username) {
    const htmlMessage = `
    <!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Réinitialisation de mot de passe</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #0056b3;
            text-align: center;
        }
        p {
            font-size: 16px;
            line-height: 1.5;
        }
        .code {
            font-size: 24px;
            font-weight: bold;
            color: #0056b3;
            text-align: center;
            margin: 20px 0;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #999;
        }
        a {
            color: #0056b3;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Réinitialisation de mot de passe</h1>
        <p>Bonjour, ${username}</p>
        <p>Vous avez demandé la réinitialisation de votre mot de passe. Utilisez le code ci-dessous pour compléter la procédure de réinitialisation :</p>
        <div class="code">${verificationCode}</div>
        <p>Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email.</p>
        <p>Merci de votre confiance,</p>
        <p>L'équipe Support</p>
        <div class="footer">
            <p>Vous avez des questions ? <a href="mailto:support@votresite.com">Contactez-nous</a></p>
        </div>
    </div>
</body>
</html>
    `

    this.mailService.sendMail({
      from: `Équipe <${from}>`,
      to: to,
      subject: 'Réinitialisation de mot de passe',
      html: htmlMessage
    });
  }
}
