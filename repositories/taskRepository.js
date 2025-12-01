const { models } = require('../db');
const { Task: TaskModel } = models;

exports.create = async (taskData) => {
  return await TaskModel.create(taskData);
};

exports.findAll = async () => {
  return await TaskModel.findAll({ include: 'user' });
};

exports.findAndCountAllByPage = async (offset, limit) => {
  const { rows, count } = await TaskModel.findAndCountAll({
    limit: limit,
    offset: offset,
    include: 'user'
  });
  return { tasks: rows, count };
};

exports.findById = async (id) => {
  return await TaskModel.findByPk(id);
};

exports.deleteById = async (id) => {
  const task = await TaskModel.findByPk(id);
  if (!task) {
    return 0; // Nem találtunk ilyen feladatot
  }
  await task.destroy();
  return 1; // Sikeres törlés
};