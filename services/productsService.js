const faker = require('faker');

const data = require('../extras/dataStore');
const serviceBrands = require('../services/brandsService');
const serviceCategories = require('../services/categoriesService');

class productsService{
  constructor(){
    this.products = data.products;
    this.generate();
  }

  generate(){
    const limit = 10;
    for(let index = 0; index < limit; index++){
      this.products.push({
        id: index + 1,
        image: faker.image.imageUrl(),
        productName: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseInt(faker.commerce.price(), 10),
        stock: faker.datatype.number({ min: 0, max: 100 }),
        categoryId: faker.datatype.number({ min: 1, max: 10 }),
        brandId: faker.datatype.number({ min: 1, max: 10 })
      });
    };
  };

  create(image, productName, description, price, stock, categoryId, brandId){
    const brandExist = serviceBrands.getById(brandId);
    if(typeof brandExist === "string"){
      return "No existe una marca registrada con ese id";
    }

    const categoryExist = serviceCategories.getById(categoryId);
    if(typeof categoryExist === "string"){
      return "No existe una categoria registrada con ese id";
    }

    const newProduct = {
      id: this.products.length + 1,
      image,
      productName,
      description,
      price,
      stock,
      categoryId,
      brandId
    }
    this.products.push(newProduct);
    return newProduct;
  }

  getAll(){
    return this.products;
  }

  getById(id){
    const product = this.products.find(p => p.id == id);
    if (product) {
      return product;
    }else{
      return "No hay producto con ese Id.";
    }
  }

  getProductsByCategoryId(id){
    const productsByCategory = this.products.filter(p => p.categoryId == id);
    if(productsByCategory.length > 0){
      return productsByCategory;
    }else{
      return "No hay productos registrados con el id de esa categoria";
    }
  }

  getProductsByBrandId(id){
    const productsByBrand = this.products.filter(p => p.brandId == id);
    if(productsByBrand.length > 0){
      return productsByBrand;
    }else{
      return "No hay productos registrados con el id de esa marca";
    }
  }

  update(id, image, productName, description, price, stock, categoryId, brandId){
    const index = this.products.findIndex(item => item.id == id);
    if(index === -1){
      throw new Error('Product Not Found');
    }
    const product = this.products[index];

    const brandExist = serviceBrands.getById(brandId);
    if(typeof brandExist === "string"){
      return "No existe una marca registrada con ese id";
    }

    const categoryExist = serviceCategories.getById(categoryId);
    if(typeof categoryExist === "string"){
      return "No existe una categoria registrada con ese id";
    }

    const updateProduct = {
      ...product,
      image: image ?? product.image,
      productName: productName ?? product.productName,
      description: description ?? product.description,
      price: price ?? product.price,
      stock: stock ?? product.stock,
      categoryId: categoryId ?? product.categoryId,
      brandId: brandId ?? product.brandId
    };

    this.products[index] = updateProduct;

    return updateProduct;
  }

  delete(id){
    const productDelete = this.products.findIndex(p => p.id == id);
    this.products.splice(productDelete, 1);
    return "Producto eliminado";
  }
}

module.exports = new productsService();
