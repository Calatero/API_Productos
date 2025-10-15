const faker = require('faker');

function generateProducts(limit = 10) {
  const fakeProducts = [];
  for (let index = 0; index < limit; index++) {
    fakeProducts.push({
      id: index + 1,
      image: faker.image.imageUrl(),
      productName: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseInt(faker.commerce.price(), 10),
      stock: faker.datatype.number({ min: 0, max: 100 }),
      categoryId: faker.datatype.number({ min: 1, max: 10 }),
      brandId: faker.datatype.number({ min: 1, max: 10 })
    });
  }
  return fakeProducts;
}

function generateBrands(limit = 10) {
  const fakeBrands = [];
  for (let index = 0; index < limit; index++) {
    fakeBrands.push({
      id: index + 1,
      brandName: faker.company.companyName(),
      description: faker.company.catchPhrase(),
      active: faker.datatype.boolean()
    });
  }
  return fakeBrands;
}

function generateCategories(limit = 10){
  const fakeCategories = [];
  for(let index = 0; index < limit; index++){
    fakeCategories.push({
      id: index + 1,
      categoryName: faker.commerce.department(),
      description: faker.commerce.productDescription(),
      active: faker.datatype.boolean()
    });
  };
  return fakeCategories;
};

function generateUsers(limit = 10){
  const fakeUsers = [];
  for(let index = 0; index < limit; index++){
    fakeUsers.push({
      id: index + 1,
      name: faker.name.findName(),
      username: faker.internet.userName(),
      password: faker.internet.password()
    });
  };
  return fakeUsers;
};

const db = {
  products: generateProducts(10),
  brands: generateBrands(10),
  categories: generateCategories(10),
  users: generateUsers(10)
};

module.exports = db;
