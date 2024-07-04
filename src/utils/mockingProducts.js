const faker = require('faker');

const generateProduct = () => {
    return {
        _id: faker.datatype.uuid(),
        title: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        thumbnails: [faker.image.imageUrl(), faker.image.imageUrl(), faker.image.imageUrl()],
        category: faker.commerce.department(),
        price: faker.datatype.number({ min: 10, max: 1000, precision: 0.01 }),
        stock: faker.datatype.number({ min: 0, max: 100 }),
        status: faker.random.boolean(),
    };
};

exports.mockingProducts = () => {
    let products = [];

    for (let i = 0; i < 100; i++) {
        products.push(generateProduct());
    }

    return products;
};