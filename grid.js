
//Initialize global variables to be called;
let obstacleCount = 0;  //count for total obstacles randomly generated, user selected obstacle won't count;
let innerGrid; //the 2d array grid to be used for pushing node objects;

var gheight=document.getElementById("container").offsetHeight;  //take the horizontal and vertical pixels of
var gwidth=document.getElementById("container").offsetWidth;    //the browser and make them be the factors of height
var bheight=Math.ceil(gheight/25);                              //and width of the grid to be displayed.
var bwidth=Math.ceil(gwidth/25);

let startRow, startCol, endRow, endCol; //locate positions for start and end nodes to be tracked in algorithms.
let isStart;    // boolean variables determining whether the start and finish node exist.
let isFinish; 
let mygrid;   //actual HTML grid to be displayed. 
let startNode, endNode;  //Object nodes.


class Node {
    constructor(id, nodeState, row, column) {
        this.id = id;
        this.nodeState = nodeState;
        this.row = row;
        this.column = column;
       this.isVisited = false;
      this.distance = Infinity;
      this.previousNode = null;
      

    }
};



class grid {
  constructor(startNode,endNode){
  this.startNode = startNode;
  this.endNode = endNode;
  this.shortestPath = []; 
  }
}

//get a random integer no bigger than cap;
function getRandInt(cap){
   return Math.floor(Math.random() * cap);
}



function gridGen(){
    obstacleCount = 0;
    innerGrid=[];
    
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
                newNode.isVisited=true;
                
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

    let createClassGrid=()=>{
      let startNode = innerGrid[startRow][startCol];
      let endNode = innerGrid[endRow][endCol];
      let classGrid = new grid(startNode,endNode);  
      return classGrid;  
    }
    classGrid = createClassGrid();
    endNode = classGrid.endNode;

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
    if(obstacleCount<maxcount){
        if(thisNode.className!="nodeStart"&&thisNode.className!="nodeFinish"){
        thisNode.className = "Obstacle";
        innerGrid[row][col].nodeState = "Obstacle";
        console.log("Change nodeState: innerGrid",row,col,"to",innerGrid[row][col].nodeState);
        obstacleCount++;
        }
        
    }

}
if(obstacleCount>=maxcount){
  console.log("Max random obstacle count reached: ",maxcount);
  return window.alert("Max random obstacle count reached.");
}
}



function aStar(){



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
        default: 
          throw "Please select an algorithm."
          
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
          getNodesInShortestPathOrder();

          break;
        default: 
          dijkstras(); //testing;
            //window.alert ("No Algorithm Selected"); 
            throw "No Algorithm Selected"; 
               

    }
   
}



function getNodes(innerGrid){
  let unvisited=[];
  for(let row = 0; row <bheight; row++){
    for (let column = 0; column < bwidth; column++){
      unvisited.push(innerGrid[row][column]);
    }
  }
  return unvisited;
}



function dijkstras(){
  
  let visitedNodes =[];
  let shortestNode;
  
  
  let unvisited = getNodes(innerGrid);
  
 
  while (!!unvisited.length){
    
   
    sortUnvisited(unvisited);

    shortestNode = unvisited.shift();
    if (shortestNode.nodeState==="Obstacle")continue;
    if(shortestNode.distance===Infinity) return visitedNodes;
    shortestNode.isVisited = true;
    visitedNodes.push(shortestNode);
    if (shortestNode === endNode)return visitedNodes;
    updateUnvisitedNeighbors(shortestNode, innerGrid);
   
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

}


function sortUnvisited(unvisitedNodes){
  unvisitedNodes.sort((a,b)=> a.distance - b.distance);
}

function updateUnvisitedNeighbors(node,innerGrid) {
  
  let unvisitedNeighbors = getUnvisitedNeighbors(node, innerGrid);
  
  for (let neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
  
}

function getUnvisitedNeighbors(node, innerGrid) {
  let neighbors = [];
  let row = node.row;
  let col = node.column;
 
  if (row > 0) neighbors.push(innerGrid[row - 1][col]);
  if (row < bheight - 1) neighbors.push(innerGrid[row + 1][col]);
  if (col > 0) neighbors.push(innerGrid[row][col - 1]);
  if (col < bwidth - 1) neighbors.push(innerGrid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
  
}

let i; //shortestPath index obstacleCount;
let shortestPath = []; 

function getNodesInShortestPathOrder() {
 
 
  let currentNode = endNode;
  i = 0;
  while (currentNode != null) {
    shortestPath.push(currentNode);
    currentNode = currentNode.previousNode;
  }
  console.log(shortestPath);

  setInterval(() => {
    vP(shortestPath)
  }, 100);
}


function clearBoard(){
  shortestPath=[];
  gridGen();
}

function vP(shortestPath){
  
    if(i<shortestPath.length){
      let row = shortestPath[i].row;
      let col = shortestPath[i].column;
      i++;
      let pathNode = document.getElementById(`row${row}_column${col}`);
        if(!(pathNode.className=="nodeFinish"||pathNode.className=="nodeStart"))
        pathNode.className = "nodePath";
      
    }
   
}
 
   




