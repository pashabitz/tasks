

const tasks = require('./tasks.js');

var validateId = function validateId(event) {
	
		if (!event.queryStringParameters || isNaN(event.queryStringParameters.id)) {
			throw { userMessage: 'Missing id parameter', statusCode: 400 };
		}
};

var catchErrorRespond = function catchErrorRespond(err) {
	var response = {};
	response.statusCode = 'statusCode' in err ? err.statusCode : 500;
	response.body = 'userMessage' in err ? err.userMessage : 'Unexpected error';
	return response;
};

var entityResolve = function entityResolve(entity) {

	if (entity) {
		return {
			'statusCode': 200,
			'body': JSON.stringify(entity)
		}
	} else {
		return {
			statusCode: 404,
			body: 'Task not found'
		}
	}
};
exports.getTask = async (event, context) => {
	let response;
	try {
		validateId(event);

	await tasks.getTask(event.queryStringParameters.id).then(task => {
			response = entityResolve(task);
		}).catch(err => {
			response = catchErrorRespond(err);
		});
	} catch(err) {
		return catchErrorRespond(err);
	}
    return response;
};
exports.completeTask = async (event, context) => {
	let response;
	try {
		var body = getRequestBodyFromJson(event);
		if (!body || isNaN(body.id)) {
			return { statusCode: 400, message: 'Missing task id' };
		}

		await tasks.completeTask(body.id).then(task => {
			response = entityResolve(task);
		}).catch(err => {
			response = catchErrorRespond(err);
		});;
	} catch (err) {
		return catchErrorRespond(err);
	}
	return response;
};

var getRequestBodyFromJson = function getRequestBodyFromJson(event) {
	if (!event.body) {
		throw { statusCode: 400, userMessage: 'Invalid request' };
	}
	let body;
	try {
		return JSON.parse(event.body);
	} catch(x) {
		throw { statusCode: 400, userMessage: 'Invalid request' };
	}

};

exports.createTask = async (event, context) => {
	let response;
	try {
		var body = getRequestBodyFromJson(event);
		if (!body.name) {
			return { statusCode: 400, body: 'Missing task name' };
		}
		
		await tasks.createTask({ name: body.name }).then(task => {
			response = {
				statusCode: 200,
				body: JSON.stringify(task)
			};

		}).catch(err => {
			response = {
				statusCode: 500,
				body: JSON.stringify(err)
			};
		});
	} catch (err) {
		return catchErrorRespond(err);
	}
	return response;
};

