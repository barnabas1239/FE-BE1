const { models } = require('../db');
const { User: UserModel } = models;

exports.create = async (userData) => {
  return await UserModel.create(userData);
};

exports.findAll = async () => {
  return await UserModel.findAll();
};

exports.findById = async (id) => {
  return await UserModel.findByPk(id);
};

exports.deleteById = async (id) => {
  const user = await UserModel.findByPk(id);
  if (!user) {
    return 0; // Nem találtunk ilyen felhasználót
  }
  await user.destroy();
  return 1; // Sikeres törlés
};