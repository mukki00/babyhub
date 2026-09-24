const orderRepository = require('../repositories/order.repository');
const ApiError = require('../utils/ApiError');

const orderService = {
  async createOrder({ customerName, customerPhone, items, total }) {
    if (!customerName || !customerPhone || !Array.isArray(items) || items.length === 0) {
      throw new ApiError(400, 'customerName, customerPhone and items are required');
    }

    const id = await orderRepository.create({ customerName, customerPhone, items, total });
    return orderRepository.findById(id);
  },

  async listOrders() {
    return orderRepository.findAll();
  },

  async getOrder(id) {
    const order = await orderRepository.findById(id);
    if (!order) throw new ApiError(404, 'Order not found');
    return order;
  },
};

module.exports = orderService;
