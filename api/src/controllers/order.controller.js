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

  setPaid: asyncHandler(async (req, res) => {
    const order = await orderService.setOrderPaid(req.params.id, req.body.paid);
    res.json(order);
  }),

  markReturned: asyncHandler(async (req, res) => {
    const order = await orderService.markOrderReturned(req.params.id);
    res.json(order);
  }),

  setReceived: asyncHandler(async (req, res) => {
    const order = await orderService.setOrderReceived(req.params.id, req.body.received);
    res.json(order);
  }),

  reshipReturned: asyncHandler(async (req, res) => {
    const order = await orderService.reshipReturnedOrder(req.params.id);
    res.json(order);
  }),

  refundReturned: asyncHandler(async (req, res) => {
    const order = await orderService.refundReturnedOrder(req.params.id);
    res.json(order);
  }),
};

module.exports = orderController;
