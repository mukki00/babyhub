const productRepository = require('../repositories/product.repository');
const imageService = require('./image.service');
const ApiError = require('../utils/ApiError');

const productService = {
  async listProducts() {
    return productRepository.findAll();
  },

  async getProduct(id) {
    const product = await productRepository.findById(id);
    if (!product) throw new ApiError(404, 'Product not found');
    return product;
  },

  async createProduct({ name, description, price }, imageFile) {
    if (!name || price == null) {
      throw new ApiError(400, 'name and price are required');
    }

    let imageUrl = null;
    let imagePublicId = null;
    if (imageFile) {
      const uploaded = await imageService.uploadImage(imageFile);
      imageUrl = uploaded.url;
      imagePublicId = uploaded.publicId;
    }

    const id = await productRepository.create({ name, description, price, imageUrl, imagePublicId });
    return productRepository.findById(id);
  },

  async updateProduct(id, { name, description, price }, imageFile) {
    const existing = await productRepository.findById(id);
    if (!existing) throw new ApiError(404, 'Product not found');

    let imageUrl = existing.image_url;
    let imagePublicId = existing.image_public_id;

    if (imageFile) {
      if (imagePublicId) await imageService.deleteImage(imagePublicId);
      const uploaded = await imageService.uploadImage(imageFile);
      imageUrl = uploaded.url;
      imagePublicId = uploaded.publicId;
    }

    await productRepository.update(id, {
      name: name ?? existing.name,
      description: description ?? existing.description,
      price: price ?? existing.price,
      imageUrl,
      imagePublicId,
    });

    return productRepository.findById(id);
  },

  async deleteProduct(id) {
    const existing = await productRepository.findById(id);
    if (!existing) throw new ApiError(404, 'Product not found');

    const imagePublicId = existing.image_public_id;
    if (imagePublicId) await imageService.deleteImage(imagePublicId);

    await productRepository.remove(id);
  },
};

module.exports = productService;
