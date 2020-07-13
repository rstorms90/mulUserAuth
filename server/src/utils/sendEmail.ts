import nodemailer from 'nodemailer';

export async function sendEmail(email: string, url: string) {
  const account = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: account.user, // generated ethereal user
      pass: account.pass, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: 'Mitigating Police Brutality', // Subject line
    text: 'Hello world?', // plain text body
    html: `<a href="${url}" title="User e-mail confirmation link.">${url}</a>`, // html body
  });

  console.log('Message sent: %s', info.messageId);

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}
