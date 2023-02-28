


class Node {
    constructor(id, nodeState, row, column) {
        this.id = id;
        this.nodeState = nodeState;
        this.row = row;
        this.column = column;
       this.isVisited;
      this.distance = Infinity;
      this.previousNode = null;

    }
};



function getRandInt(cap){
   return Math.floor(Math.random() * cap);
}

let counter = 0;
let innerGrid = [];
var gheight=document.getElementById("container").offsetHeight;
var gwidth=document.getElementById("container").offsetWidth;
var bheight=Math.ceil(gheight/25);
var bwidth=Math.ceil(gwidth/25);

let startRow, startCol, endRow, endCol;
let isStart;
let isFinish;

function gridGen(){
    counter = 0;
    let hasStart = false, hasFinish = false;
    let rand1 = Math.abs(getRandInt(bheight));
    let rand2 = Math.abs(getRandInt(bwidth));
    let rand3 = Math.abs(getRandInt(bheight));
    let rand4 = Math.abs(getRandInt(bwidth));
    
    let tableHTML ="<tbody>";

    for(let row=0; row<bheight; row++){
        let currentRow = [];
       let currentRowHTML=`<tr id="row${row}">`;
        for(let column = 0; column<bwidth; column++){
       
            let nodeContent = " ";
            let nodeID = `${row}-${column}`, nodeState="node";
            let newNode = new Node(nodeID, nodeState, row, column);
            newNode.isVisited = false;
            newNode.previousNode = null;
            newNode.distance = Infinity;
            if(row===rand1&&column===rand2&&hasStart===false&&nodeState!="nodeFinish"){
                newNode.nodeState="nodeStart";
                nodeState="nodeStart";
                hasStart=true;
                startRow = row;
                startCol = column;
                nodeContent = "S";
                newNode.distance = 0;
                
            }
            else if (row===rand3&&column===rand4&&hasFinish===false&&nodeState!="nodeStart"){
                newNode.nodeState="nodeFinish";
                nodeState="nodeFinish";
                hasFinish=true; 
                endRow = row;
                endCol = column;
                nodeContent = "F";

            
            }
        
            currentRow.push(newNode);
            currentRowHTML+=`<td id="row${row}_column${column}" class="${nodeState}" onclick="makeWall(id)">${nodeContent}</td>`;
        }
        innerGrid.push(currentRow);
        tableHTML+=`${currentRowHTML}</tr>`;
    }

    

    tableHTML+="</tbody>";
    let mygrid = document.getElementById("mygrid");
    mygrid.innerHTML=tableHTML;
}


gridGen();



function makeWall (id){
  let node = document.getElementById(id);
  let nodeString = id.split("_");
  let rowString = nodeString[0];
  let colString = nodeString[1];
  let row = parseInt(rowString.slice(3));
  let col = parseInt(colString.slice(6));


  if(node.className === "node"){
    node.className = "Obstacle";
    innerGrid[row][col].nodeState = "Obstacle";
    console.log("Change nodeState: innerGrid",row,col,"to",innerGrid[row][col].nodeState);

  }
  else {
    if(node.className === "Obstacle"){
      node.className = "node";
      innerGrid[row][col].nodeState = "node";
    console.log("Change nodeState: innerGrid",row,col,"to",innerGrid[row][col].nodeState);
    }
  }
     
}


let maxcount = 2*(bheight+bwidth)
function PlaceRandWall(){
  for(let i = 0; i <10;i++){
    let row = Math.abs(getRandInt(bheight));
    let col = Math.abs(getRandInt(bwidth));
    let thisNode = document.getElementById(`row${row}_column${col}`);
    if(counter<maxcount){
        if(thisNode.className!="nodeStart"&&thisNode.className!="nodeFinish"){
        thisNode.className = "Obstacle";
        innerGrid[row][col].nodeState = "Obstacle";
        console.log("Change nodeState: innerGrid",row,col,"to",innerGrid[row][col].nodeState);
        counter++;
        }
        
    }

}
if(counter>=maxcount){
  console.log("Max random obstacle count reached: ",maxcount);
  return window.alert("Max random obstacle count reached.");
}
}



function aStar(){



}






class PriorityQueue {
    constructor() {
      this.queue = [];
    }
  
    enqueue(element, priority) {
      const item = { element, priority };
      let added = false;
  
      // loop through the queue and add the item based on its priority
      for (let i = 0; i < this.queue.length; i++) {
        if (item.priority < this.queue[i].priority) {
          this.queue.splice(i, 0, item);
          added = true;
          break;
        }
      }
  
      // if the item has the lowest priority, add it to the end of the queue
      if (!added) {
        this.queue.push(item);
      }
    }
  
    dequeue() {
      if (this.isEmpty()) {
        return "Queue is empty";
      }
  
      return this.queue.shift();
    }
  
    front() {
      if (this.isEmpty()) {
        return "Queue is empty";
      }
  
      return this.queue[0];
    }
  
    rear() {
      if (this.isEmpty()) {
        return "Queue is empty";
      }
  
      return this.queue[this.queue.length - 1];
    }
  
    isEmpty() {
      return this.queue.length === 0;
    }
  
    printQueue() {
      let result = "";
      for (let i = 0; i < this.queue.length; i++) {
        result += `${this.queue[i].element} `;
      }
      return result;
    }
  }
  
      


let tempAlgo;
function algSelector(algorithm){
    switch(algorithm){
        case "aStar":
        tempAlgo =  "aStar"; 
        break;
        case "dijkstras":
        tempAlgo =  "dijkstras";
        break;   
        default: throw "No Algorithm Selected";
    }
}


function pfVisualizer(){
    switch(tempAlgo){
        case "":
            break;
        case "aStar":
          aStar();
            break;
        case "dijkstras":
          dijkstras();
          break;
        default: 
            window.alert ("No Algorithm Selected"); 
            throw "No Algorithm Selected"; 
               

    }
   
}




let startNode = innerGrid[startRow][startCol];
let endNode = innerGrid[endRow][endCol];

function dijkstras(){
  let visitedNodes =[];

  let unvisitedNodes = innerGrid;
 
  while (!!unvisitedNodes.length){
   
    sortUnvisited(unvisitedNodes);

   
    let shortestNode = unvisitedNodes.shift();
    if (shortestNode.nodeState==="Obstacle")continue;
    if(shortestNode.distance===Infinity) return visitedNodes;
    shortestNode.isVisited = true;
    visitedNodes.push(shortestNode);
    if (shortestNode === endNode)return visitedNodes;
    updateUnvisitedNeighbors(shortestNode, unvisitedNodes);
    console.log(shortestNode);  
  }
 
  /*let unvisitedIDs = [];
  for(let row = 0; row<bheight; row++){
    for(let col =0; col< bwidth; col++){
      let unvisitedID = `row${row}_column${col}`;
      if(!(unvisitedID==currentNodeID||unvisitedID==endID)){
        unvisitedIDs.push(unvisitedID);
      }
    }
  }
 
  while(!unvisitedIDs.length){
  




  }
*/
getNodesInShortestPathOrder(endNode);

}

function sortUnvisited(unvisitedNodes){
  unvisitedNodes.sort((a,b)=> a.distance - b.distance);
}

function updateUnvisitedNeighbors(node,grid) {
  let unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (let neighbor in unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  let neighbors = [];
  let {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid.length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !!neighbor.isVisited);
}


function getNodesInShortestPathOrder(endNode) {
  let nodesInShortestPathOrder = [];
  let currentNode = endNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  console.log(nodesInShortestPathOrder);
 
  for(let i = 0; i < nodesInShortestPathOrder.length; i++){
    let row = nodesInShortestPathOrder[i].row;
    let col = nodesInShortestPathOrder[i].column;
    let pathNode = document.getElementById(`row${row}_column${col}`);
    if(pathNode.className!=="nodeFinish")
    pathNode.className = "nodePath";
  }


}


