const faker = require('faker');
const data = require('../extras/dataStore');

class brandsService{
  constructor(){
    this.brands = data.brands;
    this.generate();
  }

  generate(){
    const limit = 10;
    for(let index = 0; index < limit; index++){
      this.brands.push({
        id: index + 1,
        brandName: faker.company.companyName(),
        description: faker.company.catchPhrase(),
        active: faker.datatype.boolean()
      })
    }
  }

  create(brandName, description, active){
    const newBrand = {
      id: this.brands.length + 1,
      brandName,
      description,
      active
    }
    this.brands.push(newBrand);
    return newBrand;
  }

  getAll(){
    return this.brands;
  }

  getById(id){
    const brand = this.brands.find(b => b.id == id);
    if(brand){
      return brand;
    }else{
      return "No hay marca registrada con ese id.";
    }
  }

  update(id, brandName, description, active){
    const index = this.brands.findIndex(item => item.id == id);
    if(index == -1){
      throw new Error('Brand Not Found');
    }
    const brand = this.brands[index];

    const updatedBrand = {
      ...brand,
      brandName: brandName ?? brand.brandName,
      description: description ?? brand.description,
      active: active ?? brand.active
    };

    this.brands[index] = updatedBrand;

    return updatedBrand;
  }

  delete(id){
    const hasProducts = data.products.some(p => p.brandId == id);
    if(hasProducts){
      return "No puede eliminar esta marca porque tiene productos asociados."
    }
    const brandDelete = this.brands.findIndex(b => b.id == id);
    this.brands.splice(brandDelete, 1);
    return "Marca eliminada";
  }
}

module.exports = new brandsService();
