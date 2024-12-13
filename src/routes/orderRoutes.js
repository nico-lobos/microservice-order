const express = require("express");
const { createOrder, approveOrder, getOrders } = require("../controllers/orderController");

const router = express.Router();

router.post("/", createOrder);
router.patch("/:id/approve", approveOrder);
router.get("/", getOrders);

module.exports = router;
