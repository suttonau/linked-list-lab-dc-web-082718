// What is a LinkedList?
// A linked list is a linear collection of data elements, whose order is not given by their physical placement in memory.
// Instead, each element points to the next.
// It is a data structure consisting of a collection of nodes which together represent a sequence.
//
// The example in this lab is Deli Cashiers-
// There are a list of cashiers who have to tell each other when someone from corporate is in the store to be on your best behavior.
// This is the plan they currently have: Alexandra is the greeter so she is the first person to spot the corporate officer,
// and then if she is not available then Kirstin will spot them, followed by Juliet, then Timmy and finally Jacob in that sequence.
//
// Alexandra -> Kirstin -> Juliet -> Timmy -> Jacob
//
// ** We would like to structure each node as a javascript object, so each node will look like the following:
//   `{name: 'Alexandra', next: 'addressOfNextPerson'}`
//
// ** The collection of nodes should also be stored as a Javascript object.
//    The keys of the object will represent each node's address.
//    That address can be anything as long as the value of next points to that address.
//    For now, we'll just have the keys be a random string of digits.
//    The key next of each node points to the next node's address.
//
//   let collection = {
//       rnadnm: {name: 'ferris', next: 'masjdrandm'},
//       masjdrandm: {name: 'sloane', next: 'ntrandm'},
//       ntrandm: {name: 'cameron', next: null},
//   }

//Takes in a node and returns the individual's name
getName = node => {
  return node.name;
};

// Takes in a node, and returns the next node. We need to provide that function our collection of nodes also as an argument.
function next(node, collection) {
  let nextNode = node.next;
  return collection[nextNode];
}

//Takes in the linkedList, and the collection of nodes, and returns the head node of the list (i.e. Alexandra)
function headNode(linkedList, collection) {
  return collection[linkedList];
}

// Passes in an index returns the node at that index. Linked-list needs a pointer to the head of the list.
function nodeAt(index, linkedList, collection) {
  let currentNode = headNode(linkedList, collection);
  for (let i = 0; i < index; i++) {
    currentNode = collection[currentNode.next];
  }
  return currentNode;
}

//takes index, collection, and linkedList args and returns the address of the node at that said address
function addressAt(index, linkedList, collection) {
  if (index === 0) {
    return linkedList;
  } else {
    //only way i can figure out how to access address is node.next
    let node = nodeAt(index - 1, linkedList, collection);
    return node.next;
  }
}

//takes in a node, collection, and linkedlist and returns the index of the provided node
function indexAt(node, collection, linkedListAttr) {
  let currentNode = headNode(linkedListAttr, collection);
  let i = 0;
  while (currentNode != node) {
    currentNode = next(currentNode, collection);
    i++;
  }
  return i;
}

//sets the next property of the given node address
function insertNodeAt(index, address, linkedList, collection) {
  // node before current node, and node after the current node
  let previousNode = nodeAt(index - 1, linkedList, collection);
  let nextNode = nodeAt(index, linkedList, collection);

  let previousNodeIndex = indexAt(previousNode, collection, linkedList);
  let nextNodeIndex = indexAt(nextNode, collection, linkedList);

  let previousNodeAddy = addressAt(previousNode, linkedList, collection);
  let nextNodeAddy = addressAt(nextNode, linkedList, collection);

  previousNode.next = address;
  let currentNode = collection[address];
  currentNode.next = nextNodeAddy;
}

//set the next property of the previous node to the deleted node
//should delete the node at the provided index, while maintaining order of other nodes
function deleteNodeAt(index, linkedList, collection) {
  let previousNode = nodeAt(index - 1, linkedList, collection);
  let deleteNode = collection[linkedList];

  for (let i = 0; i < index; i++) {
    previousNode = deleteNode;
    deleteNode = collection[deleteNode.next];
  }
  let deleteNodeIndex = indexAt(deleteNode, collection, linkedList);
  let deletesNode = addressAt(deleteNodeIndex + 1, linkedList, collection);
  previousNode.next = deletesNode;
}
