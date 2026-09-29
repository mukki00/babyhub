const productRepository = require('../repositories/product.repository');
const categoryRepository = require('../repositories/category.repository');
const imageService = require('./image.service');
const ApiError = require('../utils/ApiError');

async function validateCategorySelection(categoryId, subCategoryId) {
  const parsedCategoryId = Number(categoryId);
  const parsedSubCategoryId = Number(subCategoryId);
  if (!Number.isSafeInteger(parsedCategoryId) || parsedCategoryId <= 0 ||
      !Number.isSafeInteger(parsedSubCategoryId) || parsedSubCategoryId <= 0) {
    throw new ApiError(400, 'Product category and subcategory are required');
  }
  if (!await categoryRepository.hasSubCategory(parsedCategoryId, parsedSubCategoryId)) {
    throw new ApiError(400, 'The selected subcategory does not belong to the selected category');
  }
  return { categoryId: parsedCategoryId, subCategoryId: parsedSubCategoryId };
}

const productService = {
  async listProducts() {
    return productRepository.findAll();
  },

  async getProduct(id) {
    const product = await productRepository.findById(id);
    if (!product) throw new ApiError(404, 'Product not found');
    return product;
  },

  async createProduct({ name, description, price, category_id, sub_category_id }, imageFile) {
    if (!name || price == null) {
      throw new ApiError(400, 'name and price are required');
    }
    const { categoryId, subCategoryId } = await validateCategorySelection(category_id, sub_category_id);

    let imageUrl = null;
    let imagePublicId = null;
    if (imageFile) {
      const uploaded = await imageService.uploadImage(imageFile);
      imageUrl = uploaded.url;
      imagePublicId = uploaded.publicId;
    }

    const id = await productRepository.create({
      name,
      description,
      price,
      categoryId,
      subCategoryId,
      imageUrl,
      imagePublicId,
    });
    return productRepository.findById(id);
  },

  async updateProduct(id, { name, description, price, category_id, sub_category_id }, imageFile) {
    const existing = await productRepository.findById(id);
    if (!existing) throw new ApiError(404, 'Product not found');
    const { categoryId, subCategoryId } = await validateCategorySelection(
      category_id ?? existing.category_id,
      sub_category_id ?? existing.sub_category_id
    );

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
      categoryId,
      subCategoryId,
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
