// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function (className, nodes, nList) {
  var NodeList = [];

  if (nList) {
  	NodeList = nList;
  }

  if (!nodes) {
  	nodes = document.body;
  }

  _.each(nodes.childNodes, function (element) {	
  	_.each(element.classList, function (propVal, prop) {
  		if (propVal == className) {
  			NodeList.push(element);
  		}
  	});

  	if (element.childNodes) {
  		getElementsByClassName(className, element, NodeList);
  	}
  	
  });

  return NodeList;

};
