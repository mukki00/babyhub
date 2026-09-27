const orderService = require('../services/order.service');
const asyncHandler = require('../utils/asyncHandler');

const orderController = {
  create: asyncHandler(async (req, res) => {
    const order = await orderService.createOrder(req.body);
    res.status(201).json(order);
  }),

  list: asyncHandler(async (req, res) => {
    const orders = await orderService.listOrders();
    res.json(orders);
  }),

  getById: asyncHandler(async (req, res) => {
    const order = await orderService.getOrder(req.params.id);
    res.json(order);
  }),

  markShipped: asyncHandler(async (req, res) => {
    const order = await orderService.markOrderShipped(req.params.id);
    res.json(order);
  }),

  setDelivered: asyncHandler(async (req, res) => {
    const order = await orderService.setOrderDelivered(req.params.id, req.body.delivered);
    res.json(order);
  }),
};

module.exports = orderController;
