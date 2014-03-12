// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function (json) {
  var jText = json;
  var jProd;

  var makeArray = function (text, finalProd) {
  	return [].push(parseJSON(text));
  }

  var makeString = function (text, finalProd) {
  	return text;
  }

  for (var i = 0; i < json.length; i++) {
  	// if Array:
  	if (json[i] === '[') {
  		var endArr = json.indexOf(']', i);
  		jProd += makeArray(json.slice(i + 1, endArr));
  		i = endArr;
  	}

  	// if Object:

  	// if String:
  	if (json[i] === '"') {
  		var endArr = json.indexOf('"', i+1);
  		jProd += makeString(json.slice(i + 1, endArr), jProd);
  	}

  	// if Boolean:
  	if (json.slice(i,i+4) === 'true') {
  		jProd += true;
  	}

  	if (json.slice(i,i+5) === 'false') {
  		jProd += false;
  	}

  }

};
