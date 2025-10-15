const faker = require('faker');
const data = require('../extras/dataStore');

class usersService{
  constructor(){
    this.users = data.users;
    this.generate();
  }

  generate(){
    const limit = 10;
    for(let index = 0; index < limit; index++){
      this.users.push({
        id: index + 1,
        name: faker.name.findName(),
        username: faker.internet.userName(),
        password: faker.internet.password()
      })
    }
  }

  create(name, username, password){
    const newUser = {
      id: this.users.length + 1,
      name,
      username,
      password
    }
    this.users.push(newUser);
    return newUser;
  }

  getAll(){
    return this.users;
  }

  getById(id){
    const user = this.users.find(u => u.id == id);
    if(user){
      return user;
    }else{
      return "No hay usuario registrado con ese id";
    }
  }

  update(id, name, username, password){
    const index = this.users.findIndex(item => item.id == id);
    if(index == -1){
      throw new Error('User Not Found');
    }
    const user = this.users[index];

    const updateUser = {
      ...user,
      name: name ?? user.name,
      username: username ?? user.username,
      password: password ?? user.password
    };

    this.users[index] = updateUser;

    return updateUser;
  }

  delete(id){
    const userDelete = this.users.findIndex(u => u.id == id);
    this.users.splice(userDelete, 1);
    return "Usuario eliminado";
  }
}

module.exports = new usersService();
