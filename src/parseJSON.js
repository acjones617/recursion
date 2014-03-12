// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function (json) {
  var jText = json;
  var jProd;

  var makeArray = function (text, finalProd) {
  	return finalProd + [].push(parseJSON(text));
  }

  for (var i = 0; i < json.length; i++) {
  	// if Array:
  	if (json[i] = '[') {
  		var endArr = json.indexOf(']', i);
  		jProd = makeArray(json.slice(i + 1, endArr), jProd);
  		i = endArr;
  	}

  	// if Object:

  }

};
