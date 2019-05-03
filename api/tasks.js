

const Model = require('./tasks_db/models');

exports.getTask = getTask = function (id) {
	return new Promise((resolve, reject) => {
		Model.Task.findByPk(id).then(task => {
			if (task) resolve(task.dataValues); else resolve(null);
		}).catch(reject);
	});
};

exports.createTask = function(task) {
	return new Promise((resolve, reject) => {
		if (!task || typeof task.name != 'string') {
			reject('Invalid task');
			return;
		}

		if (!('status' in task)) {
			task.status = 'open';
		}

		Model.Task.create(task).then(task => {
			resolve(task.dataValues);
		}, reject);
	});
};

exports.completeTask = function(id) {
	return new Promise((resolve, reject) => {
		Model.Task.findByPk(id).then(task => {
			if (!task.dataValues || typeof task.dataValues.id != 'number' || task.dataValues.status == 'completed') {
				reject({ userMessage: 'Invalid task' });
				return;
			}

			task.status = 'completed';
			task.save().then(task => {
				resolve(task.dataValues);
			}, reject);
		}).catch(reject);
	});
};
