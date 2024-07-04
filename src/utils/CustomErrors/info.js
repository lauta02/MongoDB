exports.generateUserErrorInfo = (user) => {
    return `Incomplete or invalid properties for user:
        List of required properties:
        * first_name: should be a string, received: ${typeof user.first_name}
        * last_name: should be a string, received: ${typeof user.last_name}
        * email: should be a string, received: ${typeof user.email}`;
}

exports.generateProductErrorInfo = (product) => {
    return `Incomplete or invalid properties for product:
        List of required properties:
        * code: should be a string, received: ${typeof product.code}
        * title: should be a string, received: ${typeof product.title}
        * price: should be a number, received: ${typeof product.price}
        * stock: should be a number, received: ${typeof product.stock}`;
}