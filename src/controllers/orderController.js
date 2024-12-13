const Order = require("../models/orderModel");
const { generateOrderPDF } = require("../utils/pdfGenerator");
const { sendOrderEmail } = require("../utils/emailSender");

exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.approveOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) return res.status(404).json({ message: "Pedido no encontrado" });

    order.status = "approved";
    await order.save();

    const pdfPath = `./order-${order._id}.pdf`;
    await generateOrderPDF(order, pdfPath);

    await sendOrderEmail(req.body.email, pdfPath);
    res.status(200).json({ message: "Pedido aprobado y PDF enviado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
