import nodemailer from 'nodemailer';

export async function sendEmail(email: string, url: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.TRANSPORTER_EMAIL, // generated ethereal user
      pass: process.env.TRANSPORTER_PASS, // generated ethereal password
    },
  });

  const emailBody = `
    <div>
      <p>Please click link below to confirm your e-mail.</p>
      <a href="${url}">${url}</a>
    <div>
  `;

  const mailOptions = {
    from: `Mitigate Police Brutality ${process.env.TRANSPORTER_EMAIL}`, // sender address
    to: email, // list of receivers
    subject: 'Welcome to Mitigate Police Brutality', // Subject line
    html: emailBody, // html body
  };

  transporter.sendMail(mailOptions);
}
