const userRepository = require('../repositories/userRepository');
const { Op } = require('sequelize');

exports.createUser = async (email, name) => {
  if (!email) {
    const error = new Error('Az "email" mező kitöltése kötelező.');
    error.statusCode = 400;
    throw error;
  }
  return await userRepository.create({ email, name });
};

exports.register = async (email, password, name) => {
  if (!email || !password) {
    const error = new Error('Az "email" és "password" mezők kitöltése kötelező.');
    error.statusCode = 400;
    throw error;
  }

  const existingUser = await userRepository.findOne({ where: { email: email } });
  if (existingUser) {
    const error = new Error('Ez az e-mail cím már regisztrálva van.');
    error.statusCode = 409; // Conflict
    throw error;
  }

  const newUser = await userRepository.create({ email, password, name });
  return { id: newUser.id, email: newUser.email, name: newUser.name }; // Jelszó nélkül adjuk vissza
};

exports.getAllUsers = async () => {
  return await userRepository.findAll();
};

exports.deleteUser = async (id) => {
  const deletedCount = await userRepository.deleteById(id);
  if (deletedCount === 0) {
    const error = new Error('A megadott ID-val nem található felhasználó.');
    error.statusCode = 404;
    throw error;
  }
  // A `db.js`-ben beállított `onDelete: 'SET NULL'` miatt a kapcsolódó
  // feladatok `userId`-ja automatikusan NULL-ra állítódik.
  return {
    message: `A(z) ${id} ID-jú felhasználó törölve és az összes hozzá tartozó feladat NULL-lal jelölve.`
  };
};