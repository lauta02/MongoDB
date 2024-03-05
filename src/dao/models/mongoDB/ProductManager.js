const Product = require('../models/Products');

class ProductManager {
  async getProducts(limit = 10, page = 1, sort, query) {
    try {
      const skip = (page - 1) * limit;
      const sortOptions = {};
      if (sort) {
        sortOptions['price'] = sort === 'asc' ? 1 : -1;
      }

      const filter = {};
      
      const products = await Product.find(filter)
                                    .limit(limit)
                                    .skip(skip)
                                    .sort(sortOptions);
      
      const totalCount = await Product.countDocuments(filter);
      const totalPages = Math.ceil(totalCount / limit);
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;

      const nextPage = hasNextPage ? page + 1 : null;
      const prevPage = hasPrevPage ? page - 1 : null;

      const prevLink = hasPrevPage ? `/products?limit=${limit}&page=${prevPage}` : null;
      const nextLink = hasNextPage ? `/products?limit=${limit}&page=${nextPage}` : null;

      return {
        status: 'success',
        payload: products,
        totalPages,
        prevPage,
        nextPage,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink,
        nextLink
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductManager;