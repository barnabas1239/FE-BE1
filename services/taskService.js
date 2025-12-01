const taskRepository = require('../repositories/taskRepository');
const userRepository = require('../repositories/userRepository');

exports.createTask = async (title, description, userId) => {
  if (!title || !userId) {
    const error = new Error('A "title" és "userId" mezők kitöltése kötelező.');
    error.statusCode = 400;
    throw error;
  }

  const user = await userRepository.findById(userId);
  if (!user) {
    const error = new Error('A megadott userId-val nem található felhasználó.');
    error.statusCode = 404;
    throw error;
  }

  return await taskRepository.create({ title, description, userId });
};

exports.getAllTasks = async () => {
  return await taskRepository.findAll();
};

exports.getTasksByPage = async (page) => {
  if (isNaN(page) || page < 1) {
    const error = new Error('Érvénytelen oldalszám.');
    error.statusCode = 400;
    throw error;
  }

  const limit = 10;
  const offset = (page - 1) * limit;

  const { tasks, count } = await taskRepository.findAndCountAllByPage(offset, limit);
  return { tasks, totalItems: count, totalPages: Math.ceil(count / limit), currentPage: page };
};

exports.deleteTask = async (id) => {
  const deletedCount = await taskRepository.deleteById(id);
  if (deletedCount === 0) {
    const error = new Error('A megadott ID-val nem található feladat.');
    error.statusCode = 404;
    throw error;
  }
  return { message: `A(z) ${id} ID-jú feladat sikeresen törölve.` };
};