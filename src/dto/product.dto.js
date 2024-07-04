class ProductDTO {
    constructor(productData) {
        this.productTitle = productData.title;
        this.productDescription = productData.description;
        this.productThumbnails = productData.thumbnails;
        this.productCategory = productData.category;
        this.productPrice = productData.price;
        this.productStock = productData.stock;
        this.productCode = productData.code;
        this.productStatus = productData.status;
        this.productOwner = productData.owner;
        this.productCreatedAt = productData.createdAt;
    }
}

module.exports = ProductDTO;