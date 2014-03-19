// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj) {
  var finalString = '';
  
  // if Array
  if (_.isArray(obj)) {
  	finalString += '[';
  	_.each(obj, function (element, index, list) {
   		if ((_.isUndefined(element)) || (_.isFunction(element))) {
  			finalString += 'null';
    	} else {
    		finalString += stringifyJSON(element);
    	}
    	if (index !== list.length - 1) {
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
    // Slice off the last comma in string added if object has elements
 		if (objElements) {
      finalString = finalString.slice(0,finalString.length-1);
    }
  	finalString += '}';
  } 

  // if String
  else if (_.isString(obj)) {
  	finalString += '"';
  	  // escape characters like " and \
		for (var i = 0; i < obj.length; i += 1) {
			if (obj[i] === '"' || obj[i] === '\\') {
				finalString += '\\' + obj[i];
			}
			else {
				finalString += obj[i];
			}
		}
		finalString += '"';
	}
  
  // if Boolean
  else if (_.isBoolean(obj)) {
  	if (obj) {
  		finalString += 'true';
  	} else {
  		finalString += 'false';
  	}
  } 

  // if Null, NaN or infinity
  else if (_.isNull(obj) || _.isNaN(obj) || obj === Infinity || obj === -Infinity) {
  	finalString += 'null';
  } 

  // if Undefined, or function, do nothing, return undefined
  else if (_.isUndefined(obj) || _.isFunction(obj)) {
  	return undefined
  }

  // if anything else (number?)
  	else {
  	finalString += obj.toString();
  }

  return finalString;
};
