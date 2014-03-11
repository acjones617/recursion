// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function (className, nodes, nList) {
  // too easy --> return $('.'+className);
  
  // "NodeList" returned by function { 0 : HTMLNode, 1 : HTMLNode, length : 2, 
  	//prevObject : { 0 : HTMLNode, context : HTMLNode, length : 1 }, context : HTMLNode, selector : '.targetClassName' }.
 

  var NodeList = [];

  if (nList) {
  	NodeList = nList;
  }

  if (!nodes) {
  	nodes = document.body;
  }

  // You should use document.body, element.childNodes, and element.classList
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
