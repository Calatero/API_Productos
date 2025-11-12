const faker = require('faker');
const data = require('../extras/dataStore');
const userModel = require('../models/User');

class usersService{
  constructor(){}

  async create(name, username, password){
    const newUser = new userModel({
      name,
      username,
      password
    });
    
    await newUser.save();
    return newUser;
  }

  async getAll(){
    const users = await userModel.find();
    return users;
  }

  async getById(id){
    const user = await userModel.findById(id);
    if(user == null){
      throw new Error("No hay usuario registrada con ese id.");
    }
    return user;
  }

  async update(id, changes){
    const user = await userModel.findById(id);
    if(!user){
      throw new Error('User Not Found');
    }

    const updateUser = await userModel.findByIdAndUpdate(id, changes, { new: true });
    return updateUser;
  }

  async delete(id){
    const user = await userModel.findById(id);
    if(!user){
      throw new Error('User Not Found');
    }
    await userModel.findByIdAndDelete(id);
    return { message: "Usuario eliminado" };
  }
}

module.exports = new usersService();
