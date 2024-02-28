const Product = require('../dao/models/Products');

class ProductManager {
  async getProducts(limit, page, sort, query) {
    try {
      const pageSize = limit || 10;
      const pageNumber = page || 1;
      const skip = (pageNumber - 1) * pageSize;
      const sortOptions = {};
      if (sort) {
        sortOptions['price'] = sort === 'asc' ? 1 : -1;
      }

      const filter = {};
      
      const products = await Product.find(filter)
                                    .limit(pageSize)
                                    .skip(skip)
                                    .sort(sortOptions);
      
      const totalCount = await Product.countDocuments(filter);
      const totalPages = Math.ceil(totalCount / pageSize);
      const hasNextPage = pageNumber < totalPages;
      const hasPrevPage = pageNumber > 1;

      const nextPage = hasNextPage ? pageNumber + 1 : null;
      const prevPage = hasPrevPage ? pageNumber - 1 : null;

      const prevLink = hasPrevPage ? `/products?limit=${pageSize}&page=${prevPage}` : null;
      const nextLink = hasNextPage ? `/products?limit=${pageSize}&page=${nextPage}` : null;

      return {
        status: 'success',
        payload: products,
        totalPages,
        prevPage,
        nextPage,
        page: pageNumber,
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