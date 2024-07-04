const ProductDataTransferObject = require('../dto/product.dto')

class ProductRepositoryWrapper{
    constructor(dataAccessObject){
        this.dataAccessObject = dataAccessObject
    }

    async createNewProduct(productInfo){
        const productDTO = new ProductDataTransferObject(productInfo)
        const result = this.dataAccessObject.addProductToDatabase(productDTO)
        return result
    }

    async fetchProducts(queryParams, fetchOptions){
        const result = this.dataAccessObject.retrieveProducts(queryParams, fetchOptions)
        return result
    }

    async fetchProductById(productIdentifier){
        const result = this.dataAccessObject.retrieveProductById(productIdentifier)
        return result
    }

    async updateProductDetails(productIdentifier, updatedProductInfo){
        const result = this.dataAccessObject.modifyProduct(productIdentifier, updatedProductInfo)
        return result
    }

    async removeProduct(productIdentifier){
        const result = this.dataAccessObject.deleteProductFromDatabase(productIdentifier)
        return result
    }
}

module.exports = ProductRepositoryWrapper