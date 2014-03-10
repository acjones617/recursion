// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj) {
  var finalString = '';
  // if Array
  if (_.isArray(obj)) {
  	finalString += '[';
  	_.each(obj, function (element, index, list) {
    	finalString += stringifyJSON(element);
    	if (index != list.length - 1) {
    		finalString += ',';
    	}
  	});
  	finalString += ']';
  }
  
  // if Object
  else if (_.isObject(obj)) {
  	finalString += '{';
  	var objElements = false;
  	_.each(obj, function (propVal, prop, object) {
  		if (!(_.isUndefined(propVal)) && !(_.isFunction(propVal))) {
  			finalString += stringifyJSON(prop) + ':' + stringifyJSON(propVal) + ',';
				objElements = true;  	
  		}
  	});
 		if (objElements) finalString = finalString.slice(0,finalString.length-1);
  		finalString += '}';
  } 

  // if String
  else if (_.isString(obj)) {
  	finalString += '"' + obj + '"';
  } 

  // if Boolean
  else if (_.isBoolean(obj)) {
  	if (obj) {
  		finalString += 'true';
  	} else {
  		finalString += 'false';
  	}
  } 

  // if Null
  else if (_.isNull(obj)) {
  	finalString += 'null';
  } 

  // if Undefined, or function, do nothing, return false
  else if (_.isUndefined(obj) || _.isFunction(obj)) {

  }

  // if anything else (number?)
  	else {
  	finalString += obj.toString();
  }

  return finalString;
};
