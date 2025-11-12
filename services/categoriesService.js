const faker = require('faker');
const data = require('../extras/dataStore');
const categoryModel = require('../models/Category');
const productModel = require('../models/Product');

class categoriesService{
  constructor(){}

  async create(categoryName, description, active){
    const newCategory = new categoryModel({
      categoryName,
      description,
      active
    });
    
    await newCategory.save();
    return newCategory;
  }

  async getAll(){
    const categories = await categoryModel.find();
    return categories;
  }

  async getById(id){
    const category = await categoryModel.findById(id);
    if(category == null){
      throw new Error("No hay categoria registrada con ese id");
    }
    return category;
  }

  async update(id, changes){
    const category = await categoryModel.findById(id);
    if(!category){
      throw new Error('Category Not Found');
    }

    const updateCategory = await categoryModel.findByIdAndUpdate(id, changes, { new: true });
    return updateCategory;
  }

  async delete(id){
    const category = await categoryModel.findById(id);
    if(!category){
      throw new Error('Category Not Found');
    }

    const productCount = await productModel.countDocuments({ categoryId: id });
    if(productCount > 0){
      return "No puede eliminar esta categoria porque tiene productos asociados."
    };

    await categoryModel.findByIdAndDelete(id);
    return { message: 'Category Deleted' };
    
        
  }
}

module.exports = new categoriesService();
