function copyObject(obj) {
	return Object.assign({}, obj);	
}

function copyDeepObject(obj) {
	return Object.assign({}, JSON.parse(JSON.stringify(obj)));
}

function copyArrayObject(arrayObj) {
	return arrayObj.concat();	
}