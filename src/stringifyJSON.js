// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj) {
  var finalString = '';
  if (Array.isArray(obj)) {
  	finalString += '[';
  	_.each(obj, function (element, index, list) {
    	finalString += stringifyJSON(element) + (index !== list.length - 1) ? ',';
  	});
  	finalString += ']';
  } else if (!(obj.length)) {
  	finalString += '{';
  	var objElements = false;
  	_.each(obj, function (propVal, prop, object) {
  		objElements = true;
  		finalString += stringifyJSON(prop) + ':' + stringifyJSON(propVal) + ',';
  	});
  	if (objElements) finalString = finalString.slice(0,finalString.length-2);
  	finalString += '}';
  } else if (_.isString(obj)) {
  	finalString += '"' + obj + '"';
  } else {
  	finalString += obj.toString();
  }

  return finalString;
};
