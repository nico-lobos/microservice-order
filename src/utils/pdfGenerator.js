const PDFDocument = require("pdfkit");
const fs = require("fs");

exports.generateOrderPDF = (order, filePath) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);
    doc.fontSize(20).text("Detalles del Pedido", { align: "center" });
    doc.moveDown();

    doc.fontSize(14).text(`ID del Pedido: ${order._id}`);
    doc.text(`Usuario: ${order.userId}`);
    doc.text(`Fecha: ${new Date(order.createdAt).toLocaleString()}`);
    doc.moveDown();

    doc.text("Productos:", { underline: true });
    order.products.forEach((product, index) => {
      doc.text(
        `${index + 1}. Producto ID: ${product.productId}, Cantidad: ${product.quantity}`
      );
    });

    doc.end();

    stream.on("finish", () => resolve(filePath));
    stream.on("error", reject);
  });
};
