var tasks = require('./tasks');
/*tasks.getTask(1).then(task => {
	console.log(task);
});*/

/*tasks.completeTask( 7 ).then(task => {
	console.log('success!');
	console.log(task);
}).catch(err => {

	console.log('err:');
	console.log(err);
});
*/

 async function asyncFoo(p) {
	return 12+p;
};

var index=require('./index.js');
index.getTask({}, {}).then(res => {
	console.log(res);
});
