const faker = require('faker');
const data = require('../extras/dataStore');
const brandModel = require('../models/Brand');
const productModel = require('../models/Product');

class brandsService{
  constructor(){}

  async create(brandName, description, active){
    const newBrand = new brandModel({
      brandName,
      description,
      active
    });

    await newBrand.save();
    return newBrand;
  }

  async getAll(){
    const brands = await brandModel.find();
    return brands;
  };

  async getById(id){
    const brand = await brandModel.findById(id);
    if(brand == null){
      throw new Error("No hay marca registrada con ese id.");
    }
    return brand;
  }

  async update(id, changes){
    const brand = await brandModel.findById(id);
    if(!brand){
      throw new Error('Brand Not Found');
    }
    const updatedBrand = await brandModel.findByIdAndUpdate(id, changes, { new: true });
    return updatedBrand;
  }

  async delete(id){
    const brand = await brandModel.findById(id);
    if(!brand){
      throw new Error('Brand Not Found');
    };

    const productCount = await productModel.countDocuments({ brandId: id });
    if(productCount > 0){
      return "No puede eliminar esta marca porque tiene productos asociados."
    }
    
    await brandModel.findByIdAndDelete(id);
    return { message: "Marca eliminada" };
  }
}

module.exports = new brandsService();
