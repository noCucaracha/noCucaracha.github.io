
let textHovered=(id)=>{
  document.getElementById(id).style.color = "lightgreen";
  document.getElementById(id).addEventListener("mousedown",function(e){
    e.preventDefault();
    document.getElementById(id).style.color = "lightblue";
  });
  document.getElementById(id).addEventListener("mouseout",function(e){
    e.preventDefault();
    document.getElementById(id).style.color = "white";
  });
  
}


let mouseDown = false;
let nodeClassName;
let targetID=null;
let targetSelected = false;
function setStartFinish(){
  for(let row = 0; row <bheight; row++){
    for (let column = 0; column < bwidth; column++){
    let mynode = document.getElementById(`row${row}_column${column}`);
    if (mynode.className ==="nodeStart"||mynode.className === "nodeFinish"){
    mynode.addEventListener("mousedown",function(e){
      e.preventDefault();
      mouseDown = true;
      targetID = mynode.id;
      nodeClassName = mynode.className;
      targetSelected = true;
      console.log("Mouse down: ",mouseDown,"ID: ", targetID,"Target is selected:", targetSelected);
    });
    mynode.addEventListener("mouseup",function(e){
      e.preventDefault();

      targetSelected = false;
      mouseDown = false;
    })
    }
    else if(mynode.className==="node"){
      
        mynode.addEventListener("mousedown", function(e){
          e.preventDefault();
          mouseDown = true;
        });
    
        mynode.addEventListener("mouseover",function(e){
          if(targetSelected===false){
            if (mouseDown === true)
            makeWall(e.target.id);
          }
            
          
        },false);
      
      
        mynode.addEventListener("mouseup",function(e){
          e.preventDefault();
          mouseDown = false;
          targetSelected = false;
          console.log("target is selected: ",targetSelected);
        });
    
     
        
    mynode.addEventListener("mouseover", function(event){
      event.preventDefault();
      if(targetSelected===true){
        mynode.addEventListener("mouseup",function(event){
          
          event.preventDefault();
      
          
          let sourceIdString = mynode.id.split("_"), targetIdString = targetID.split("_");
          switch (nodeClassName){
            case "nodeStart":
              startRow = parseInt(sourceIdString[0].slice(3));
              startCol = parseInt(sourceIdString[1].slice(6));
              let startNode = innerGrid[startRow][startCol];
              startNode.nodeState = nodeClassName;
              startNode.isVisited = true;
              startNode.gScore = 0;
              startNode.previousNode = null;
              
              startNode.distance = 0;
              
             break;
            case "nodeFinish":
              endRow = parseInt(sourceIdString[0].slice(3));
              endCol = parseInt(sourceIdString[1].slice(6));
             innerGrid[endRow][endCol].nodeState = nodeClassName;
             
             break;
            default:
              throw "Not a start or finish node.";

          }
        
         let row = parseInt(targetIdString[0].slice(3));
         let col = parseInt(targetIdString[1].slice(6));
         let thisNode = innerGrid[row][col];
          thisNode.nodeState = "node";
          thisNode.distance = Infinity;
          thisNode.isVisited = false;
          thisNode.fScore = Infinity;
          thisNode.gScore = Infinity;
          thisNode.previousNode = null;
          document.getElementById(targetID).className = "node";
          mynode.className = nodeClassName;
          console.log("Changed", nodeClassName, "from", targetID, "to", mynode.id);
        
          
          targetSelected=false;
          mouseDown = false;
          targetID = null;
          updateInnerGrid();
          setStartFinish();
        });
      }
    },false);
  
  }
} 
}

}






function updateInnerGrid(){

 let classGrid = createClassGrid();
  startNode = classGrid.startNode;
  endNode = classGrid.endNode;
  innerGrid.endNode = endNode;
  innerGrid.startNode = startNode;

}












//Initialize global variables to be called;
let obstacleCount = 0;  //count used to limit maximum obstacles, user selected obstacle won't count;
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
      this.gScore = Infinity;
      this.fScore = Infinity;

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
                newNode.gScore = 0;
                newNode.distance = 0;
                newNode.isVisited=true;
                
            }
            else if (row===rand3&&column===rand4&&hasFinish===false&&nodeState!="nodeStart"){
                newNode.nodeState="nodeFinish";
                nodeState="nodeFinish";
                hasFinish=true; 
                endRow = row;
                endCol = column;

            
            }
        
            currentRow.push(newNode);
            
            currentRowHTML+=`<td id="row${row}_column${column}" class="${nodeState}" onclick="makeWall(id)" ></td>`;
        }
        innerGrid.push(currentRow);
        tableHTML+=`${currentRowHTML}</tr>`;
    }

    
    let classGrid = createClassGrid();
    startNode = classGrid.startNode;
    endNode = classGrid.endNode;

    tableHTML+="</tbody>";
    let mygrid = document.getElementById("mygrid");
    mygrid.innerHTML=tableHTML;

}

let createClassGrid=()=>{
  let startNode = innerGrid[startRow][startCol];
  let endNode = innerGrid[endRow][endCol];
  let classGrid = new grid(startNode,endNode);  
  return classGrid;  
}

function makeWall (id){
  let node = document.getElementById(id);
  let nodeString = id.split("_");
  let rowString = nodeString[0];
  let colString = nodeString[1];
  let row = parseInt(rowString.slice(3));
  let col = parseInt(colString.slice(6));


  if(node.className === "node"||node.className ==="nodeVisited"||node.className==="nodePath"){
    node.className = "Obstacle";
    innerGrid[row][col].nodeState = "Obstacle";
    
    console.log("Change nodeState: innerGrid",row,col,"to",innerGrid[row][col].nodeState);
    console.log( innerGrid[row][col].gScore);
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



let tempAlgo;
function algSelector(algorithm){
  
    switch(algorithm){
        case "aStar":
        tempAlgo =  "aStar"; 
        document.getElementById("onAlgoSelect").innerHTML = "Algorithm: A*";
        document.getElementById("onAlgoSelect").style.color = "lightpink";
        break;

        case "aStarNoD":
          tempAlgo =  "aStarNoD"; 
          document.getElementById("onAlgoSelect").innerHTML = "Algorithm: A* (No Diags)";
          document.getElementById("onAlgoSelect").style.color = "lightpink";
          break;

        case "dijkstras":
        tempAlgo =  "dijkstras";
        document.getElementById("onAlgoSelect").innerHTML = "Algorithm: Dijkstra's";
        document.getElementById("onAlgoSelect").style.color = "lightpink";
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
          triggerAStar(true);
            break;
        case "aStarNoD":
          triggerAStar(false);
          break;
        case "dijkstras":
          triggerDijkstra();
          break;
        default: 
        
            window.alert ("No Algorithm Selected"); 
            throw "No Algorithm Selected"; 
               

    }
   
}

let ispaused = true;
function triggerAStar(diagonal){
  clearVisualized();

  aStar(diagonal);
 
  setStartFinish();
}
function triggerDijkstra(){
 
  clearVisualized();
  
  dijkstras();
  
  drawVisited(visitedNodes,ispaused);


  setStartFinish();
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


let visitedNodes;
function dijkstras(){
  
  visitedNodes = [];
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
  
 
}

let vdex =0;
function drawVisited(visitedNodes,ispaused){
  let vN=()=>{
    if(vdex<visitedNodes.length-1){
      let row = visitedNodes[vdex].row;
      let col = visitedNodes[vdex].column;
      vdex++;
      let visitedNodeOnGrid = document.getElementById(`row${row}_column${col}`);
      if(!(visitedNodeOnGrid.className=="nodeStart"||visitedNodeOnGrid.className=="nodeFinish"||visitedNodeOnGrid.className=="Obstacle"))
      visitedNodeOnGrid.className = "nodeVisited";
    }
    else{
      ispaused=false;
      if(!ispaused==true){
        clearInterval(animationvN);
        vdex=0;
        ispaused=true;
        displayPopUp();

        return getNodesInShortestPathOrder();
      }
      
    }
  }
  const animationvN = setInterval(() => {
    vN();
  }, 30);
  animationvN;
  

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

//shortestPath(array)'s index counter;
let i;
let shortestPath = []; 

function getNodesInShortestPathOrder() {
  
  let currentNode = endNode;
  while (currentNode != null) {
    shortestPath.push(currentNode);
    currentNode = currentNode.previousNode;
  }
  i = shortestPath.length-1;
  console.log(shortestPath);
 
    displayPopUp();
  

}





function showPath(){
 
const mypath  =  setInterval(()=>{
  vP(shortestPath);
  if(i===0){
    clearInterval(mypath);
    }
}
, 60); 


}


function displayPopUp(){
 let popUp = document.getElementById("popup");
  popUp.style.visibility="visible";
  popUp.addEventListener("click",function(){
    popUp.style.visibility="hidden";
  })
  if(shortestPath.length===2){
    document.getElementById("popDes").innerHTML = "But... Isn't that too obvious...?";
    return false;
  }
  else if(shortestPath.length===1){
    document.getElementById("popTitle").innerHTML="It seems like there isn't a path to the destination.";
    document.getElementById("popDes").innerHTML = "Try again?";
    popUp.addEventListener("click",clearBoard);
    return false;
  }
  else{
    document.getElementById("popTitle").innerHTML = "Shortest Path Found!";
    document.getElementById("popDes").innerHTML = "Click anywhere to show";
    popUp.removeEventListener("click",clearBoard);
    popUp.addEventListener("click",function(e){
      e.preventDefault();
      if (closedNodes.includes(endNode)===true)
      showPath();
    })
    return true;
    }

}





function clearBoard(){
  
  clearVisualized();
  gridGen();
  setStartFinish();
}

function clearVisualized(){
  
  for(let row = 0; row<bheight; row++){
    for(let column = 0; column <bwidth; column++){
      let node = document.getElementById(`row${row}_column${column}`);
      let objectNode = innerGrid[row][column];
      if (node.className ==="nodeVisited"||node.className === "nodePath"){
        objectNode.isVisited=false;
        objectNode.distance=Infinity;
        objectNode.previousNode=null;
        objectNode.gScore=Infinity;
        objectNode.fScore=Infinity;
        node.className = "node";
      }
      if(node.className==="nodeStart"){
        objectNode.distance=0;
        objectNode.gScore=0;
        objectNode.fScore=Infinity;
        objectNode.isVisited=true;
      }
      if(node.className==="nodeFinish"){
        objectNode.gScore=Infinity;
        objectNode.fScore=Infinity;
        objectNode.isVisited=false;
        objectNode.distance=Infinity;
        objectNode.previousNode=null;
      }
      
    }
  }
  visitedNodes=[];
  unvisited=[];
  shortestPath=[];
 
  
}

function vP(shortestPath){

 
    if(i>0){
      let row = shortestPath[i].row;
      let col = shortestPath[i].column;
      i--;
      let pathNode = document.getElementById(`row${row}_column${col}`);
        if(!(pathNode.className=="nodeFinish"||pathNode.className=="nodeStart"))
        pathNode.className = "nodePath";
    }
  
    
}
 




let openNodes, closedNodes;

function aStar(diagonal){
 
  openNodes=[];
  closedNodes=[];
  
  startNode.fScore=getFscore(startNode,endNode);

  let currentNode = null;
  openNodes.push(startNode);
  if(openNodes.length>=0){
  while(openNodes.length>0){
    currentNode = openNodes.sort(((a,b)=>a.fScore - b.fScore)).shift();
    closedNodes.push(currentNode);
    
   
    
    if(getCurrentNodeClass(currentNode)==="Obstacle") continue;

      let neighbors = getNeighbors(currentNode,diagonal);
      
      for (let i in neighbors){
        let newGScore = currentNode.gScore + getNeighborDistance(currentNode,neighbors[i]);
        if(newGScore<neighbors[i].gScore){
          neighbors[i].gScore = newGScore;
          neighbors[i].fScore = getFscore(neighbors[i],endNode);
          if(openNodes.includes(neighbors[i])===false)
          neighbors[i].previousNode=currentNode;
          openNodes.push(neighbors[i]);

        }
        
      }
      if(currentNode===endNode){
      
        console.log(closedNodes);
        
        return  drawClosed(closedNodes);
        
      }
     
    }
    if(openNodes.length===0){
      if (closedNodes.includes(endNode)===false) return drawClosed(closedNodes);
    }
   /* for each neighbour of current
        new_gscore = current.gscore + distance(current,neighbour)
        if new_gscore < neighbour.gscore
          neighbour.gscore = new_gscore
          neighbour.fscore = new_gscore + estimated_distance(neighbour， goal)
            if neighbour not in open:
            open. add(neighbour)
  */
}

  
function getCurrentNodeClass(currentNode){
  let row = currentNode.row, col = currentNode.column;
  let nodeClass = document.getElementById(`row${row}_column${col}`).className;
  return nodeClass;
}
}
function getNeighbors(node,diagonal){
  let neighbors = [];
  let row = node.row, col = node.column;

  if (row > 0) neighbors.push(innerGrid[row - 1][col]);
  if (row < bheight - 1) neighbors.push(innerGrid[row + 1][col]);
  if (col > 0) neighbors.push(innerGrid[row][col - 1]);
  if (col < bwidth - 1) neighbors.push(innerGrid[row][col + 1]);

//diagonal nodes:
if(diagonal===true){
  if(row>1&&col<bwidth-1)
  neighbors.push(innerGrid[row-1][col+1]);
  if(row>1&&col>1)
  neighbors.push(innerGrid[row-1][col-1]);
  if(row<bheight-1&&col<bwidth-1)
  neighbors.push(innerGrid[row+1][col+1]);
  if(row<bheight-1&&col>1)
  neighbors.push(innerGrid[row+1][col-1]);
}
  return neighbors;
}

function getNeighborDistance(node,neighbor){
  let distanceToNeighbor = 
  Math.sqrt(
    (Math.pow(Math.abs(parseInt(neighbor.row)-parseInt(node.row)),2))
    +
    (Math.pow(Math.abs(parseInt(neighbor.column)-parseInt(node.column)),2))
  );

  return distanceToNeighbor;
}


function getFscore(node,endNode){
  let distanceToEnd = 
    Math.sqrt(
      (Math.pow(Math.abs(parseInt(endNode.row)-parseInt(node.row)),2))
      +
      (Math.pow(Math.abs(parseInt(endNode.column)-parseInt(node.column)),2))
  );

  let fScore = node.gScore + distanceToEnd;
  
  return fScore;
} 



function drawClosed(closedNodes,ispaused){
 
  let vN=()=>{
    if(vdex<closedNodes.length-1){
      let row = closedNodes[vdex].row;
      let col = closedNodes[vdex].column;
      vdex++;
      let visitedNodeOnGrid = document.getElementById(`row${row}_column${col}`);
      if(!(visitedNodeOnGrid.className=="nodeStart"||visitedNodeOnGrid.className=="nodeFinish"||visitedNodeOnGrid.className=="Obstacle"))
      visitedNodeOnGrid.className = "nodeVisited";
    }
    else{
      ispaused=false;
      if(ispaused===false){
        clearInterval(animationvN);
        vdex=0;
        ispaused=true;

        return getNodesInShortestPathOrder();
        
      }
      
    }
  }
  const animationvN = setInterval(() => {
    vN();
  }, 30);
  animationvN;
   
}


function getAStarPath(){
  
  let currentNode = endNode;
  while(currentNode!=null){
  shortestPath.push(currentNode);
  currentNode = currentNode.previousNode;
  }
  console.log(shortestPath);
  
  for(let i=0;i<shortestPath.length-1;i++){
    let row = shortestPath[i].row;
    let col = shortestPath[i].column;
      
      let pathNode = document.getElementById(`row${row}_column${col}`);
        if(!(pathNode.className=="nodeFinish"||pathNode.className=="nodeStart"))
        pathNode.className = "nodePath";
  }

  
}









gridGen();
setStartFinish();