class GraphNode {

  constructor() {
    nodeList = [];
  }

  function add(location) {
    this.location = location;
    // Will be empty for all passengers

    if (!addressExists(location)) {
      nodeList.push(location);
    }
    
    return this;
  }

  function addressExists(address) {
    var bool = false;

    for (var i = 0; i < nodeList.length && !bool; i++) {
      if (nodeList[i].location == address) {
        bool = true;
      }
    }

    return bool;
  }

  function getAddresses() {
    return nodeList;
  }
}
