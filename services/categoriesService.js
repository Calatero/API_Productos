const faker = require('faker');
const data = require('../extras/dataStore');

class categoriesService{
  constructor(){
    this.categories = data.categories;
    this.generate();
  }

  generate(){
    const limit = 10;
      for(let index = 0; index < limit; index++){
        this.categories.push({
          id: index + 1,
          categoryName: faker.commerce.department(),
          description: faker.commerce.productDescription(),
          active: faker.datatype.boolean()
        })
      }
  }

  create(categoryName, description, active){
    const newCategory = {
      id: this.categories.length + 1,
      categoryName,
      description,
      active
    }
    this.categories.push(newCategory);
    return newCategory;
  }

  getAll(){
    return this.categories;
  }

  getById(id){
    const category = this.categories.find(c => c.id == id);
    if(category){
      return category;
    }else{
      return "No hay categoria registrada con ese id";
    }
  }

  update(id, categoryName, description, active){
    const index = this.categories.findIndex(item => item.id == id);
    if(index == -1){
      throw new Error('Category Not Found');
    }
    const category = this.categories[index];

    const updateCategory = {
      ...category,
      categoryName: categoryName ?? category.categoryName,
      description: description ?? category.description,
      active: active ?? category.active
    };

    this.categories[index] = updateCategory;
    return updateCategory;
  }

  delete(id){
    const hasProducts = data.products.some(p => p.categoryId == id);
    if(hasProducts){
      return "No puede eliminar esta categoria porque tiene productos asociados."
    }
    const categoryDelete = this.categories.findIndex(c => c.id == id);
    this.categories.splice(categoryDelete, 1);
    return "Categoria eliminada";
  }
}

module.exports = new categoriesService();
