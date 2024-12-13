const nodemailer = require("nodemailer");

exports.sendOrderEmail = async (email, pdfPath) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Cambia si usas otro proveedor
    auth: {
      user: process.env.EMAIL_USER, // Correo emisor
      pass: process.env.EMAIL_PASS, // Contraseña del correo
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Tu pedido ha sido aprobado",
    text: "Adjuntamos el detalle de tu pedido.",
    attachments: [{ filename: "pedido.pdf", path: pdfPath }],
  };

  await transporter.sendMail(mailOptions);
};
