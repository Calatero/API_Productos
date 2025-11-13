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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('El ID de la categoría no tiene un formato válido.');
    }
    const productsByCategory = await productModel.find({ categoryId: id });
    if(productsByCategory.length > 0){
      return productsByCategory;
    }else{
      throw new Error("No hay productos registrados con el id de esa categoria");
    }
  }

  async getProductsByBrandId(id){
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('El ID de la marca no tiene un formato válido.');
    }
    const productsByBrand = await productModel.find({ brandId: id });
    if(productsByBrand.length > 0){
      return productsByBrand;
    }else{
      throw new Error("No hay productos registrados con el id de esa marca");
    }
  }

  async update(id, changes) {
    const product = await productModel.findById(id);
    if (!product) {
        throw new Error('Product Not Found');
    }
    if (changes.brandId) {
        if (!mongoose.Types.ObjectId.isValid(changes.brandId)) {
            throw new Error('El ID de la marca no tiene un formato válido.');
        }
        const brandExist = await serviceBrands.getById(changes.brandId);
        if (!brandExist) {
            throw new Error("No existe una marca registrada con ese id");
        }
    }
    if (changes.categoryId) {
        if (!mongoose.Types.ObjectId.isValid(changes.categoryId)) {
            throw new Error('El ID de la categoría no tiene un formato válido.');
        }
        const categoryExist = await serviceCategories.getById(changes.categoryId);
        if (!categoryExist) {
            throw new Error("No existe una categoria registrada con ese id");
        }
    }
    const updatedProduct = await productModel.findByIdAndUpdate(
        id,
        changes,
        { new: true }
    );
    return updatedProduct;
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
