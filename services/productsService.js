const serviceBrands = require('../services/brandsService');
const serviceCategories = require('../services/categoriesService');
const productModel = require('../models/Product');
const mongoose = require('mongoose');

class productsService{
  constructor(){}

  async create(image, productName, description, price, stock, categoryId, brandId){
    if (!mongoose.Types.ObjectId.isValid(brandId)) {
      throw new Error('El ID de la marca no tiene un formato válido.');
    }
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      throw new Error('El ID de la categoría no tiene un formato válido.');
    }
    const brandExist = await serviceBrands.getById(brandId);
    if(!brandExist){
      return "No existe una marca registrada con ese id";
    }

    const categoryExist = await serviceCategories.getById(categoryId);
    if(!categoryExist){
      return "No existe una categoria registrada con ese id";
    }

    const newProduct = new productModel({
      image,
      productName,
      description,
      price,
      stock,
      categoryId,
      brandId
    });
    await newProduct.save();
    return newProduct;
  }

  async getAll(){
    const products = await productModel.find();
    return products;
  }

  async getById(id){
    const product = await productModel.findById(id);
    if(product == null){
      throw new Error("No hay producto con ese Id.");
    }
    return product;
  }

  async getProductsByCategoryId(id){
    const productsByCategory = this.products.filter(p => p.categoryId == id);
    if(productsByCategory.length > 0){
      return productsByCategory;
    }else{
      throw new Error("No hay productos registrados con el id de esa categoria");
    }
  }

  async getProductsByBrandId(id){
    const productsByBrand = this.products.filter(p => p.brandId == id);
    if(productsByBrand.length > 0){
      return productsByBrand;
    }else{
      throw new Error("No hay productos registrados con el id de esa marca");
    }
  }

  async update(id, changes){
    const index = await productModel.findById(id);
    if(index === -1){
      throw new Error('Product Not Found');
    }

    if (!mongoose.Types.ObjectId.isValid(brandId)) {
      throw new Error('El ID de la marca no tiene un formato válido.');
    }
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      throw new Error('El ID de la categoría no tiene un formato válido.');
    }

    const brandExist = await serviceBrands.getById(brandId);
    if(typeof brandExist === "string"){
      return "No existe una marca registrada con ese id";
    }

    const categoryExist = await serviceCategories.getById(categoryId);
    if(typeof categoryExist === "string"){
      return "No existe una categoria registrada con ese id";
    }

    const updateProduct = await productModel.findByIdAndUpdate(id, changes, { new: true });

    this.products[index] = updateProduct;

    return updateProduct;
  }

  async delete(id){
    const product = await productModel.findById(id);
    if(!product){
      throw new Error('Product Not Found');
    };

    await productModel.findByIdAndDelete(id);
    return { message: "Producto eliminada" };
  }
}

module.exports = new productsService();




/*
1. Procesar Solicitudes. Permiten manupular las solicitudes de entrada anstes de que lleguen a los manejadores de rutas (endpoints).
2. Respuesta: Pueden modificar las respuestas antes de que envien de vuelta al cliente.
3. Encadenar tareas: Permiten encadenar una serie de funciones que se ejecutan en orden, cada una de las cuales puede realizar una tarea especifica.
4. Control de flujo: Permite determinar si se debe continuar con el siguiente
*/
