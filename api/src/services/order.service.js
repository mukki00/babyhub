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

  async markOrderShipped(id) {
    const updated = await orderRepository.markShipped(id);
    if (!updated) throw new ApiError(404, 'Order not found');
    return orderRepository.findById(id);
  },

  async setOrderDelivered(id, delivered) {
    if (typeof delivered !== 'boolean') {
      throw new ApiError(400, 'delivered must be a boolean');
    }
    const updated = await orderRepository.setDelivered(id, delivered);
    if (!updated) throw new ApiError(404, 'Order not found');
    return orderRepository.findById(id);
  },

  async setOrderPaid(id, paid) {
    if (typeof paid !== 'boolean') {
      throw new ApiError(400, 'paid must be a boolean');
    }
    const updated = await orderRepository.setPaid(id, paid);
    if (!updated) throw new ApiError(404, 'Active order not found');
    return orderRepository.findById(id);
  },

  async markOrderReturned(id) {
    const order = await orderRepository.findById(id);
    if (!order) throw new ApiError(404, 'Order not found');
    if (order.status?.toUpperCase() !== 'SHIPPED' || Number(order.delivered) !== 1) {
      throw new ApiError(409, 'Only delivered shipped orders can be returned');
    }
    const updated = await orderRepository.markReturned(id);
    if (!updated) throw new ApiError(409, 'Order can no longer be returned');
    return orderRepository.findById(id);
  },

  async setOrderReceived(id, received) {
    if (typeof received !== 'boolean') {
      throw new ApiError(400, 'received must be a boolean');
    }
    const order = await orderRepository.findById(id);
    if (!order) throw new ApiError(404, 'Order not found');
    if (order.status?.toUpperCase() !== 'RETURNED') {
      throw new ApiError(409, 'Only returned orders can be marked received');
    }
    const updated = await orderRepository.setReceived(id, received);
    if (!updated) throw new ApiError(409, 'Order can no longer be updated');
    return orderRepository.findById(id);
  },

  async reshipReturnedOrder(id) {
    const order = await orderRepository.findById(id);
    if (!order) throw new ApiError(404, 'Order not found');
    if (order.status?.toUpperCase() !== 'RETURNED' || Number(order.received) !== 1) {
      throw new ApiError(409, 'Only received returned orders can be shipped again');
    }
    const updated = await orderRepository.reshipReturned(id);
    if (!updated) throw new ApiError(409, 'Order can no longer be shipped again');
    return orderRepository.findById(id);
  },

  async refundReturnedOrder(id) {
    const order = await orderRepository.findById(id);
    if (!order) throw new ApiError(404, 'Order not found');
    if (order.status?.toUpperCase() !== 'RETURNED' || Number(order.received) !== 1) {
      throw new ApiError(409, 'Only received returned orders can be refunded');
    }
    const updated = await orderRepository.refundReturned(id);
    if (!updated) throw new ApiError(409, 'Order can no longer be refunded');
    return orderRepository.findById(id);
  },
};

module.exports = orderService;
