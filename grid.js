


class Node {
    constructor(id, nodeState, row, column) {
        this.id = id;
        this.nodeState = nodeState;
        this.row = row;
        this.column = column;
       let isVisited = false;
       let distance = Infinity;

    }
};



function getRandInt(cap){
   return Math.floor(Math.random() * cap);
}

let counter = 0;
const innerGrid = [];
var gheight=document.getElementById("container").offsetHeight;
var gwidth=document.getElementById("container").offsetWidth;
var bheight=Math.ceil(gheight/25);
var bwidth=Math.ceil(gwidth/25);

let startNode, endNode;
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
    let pos = 0;
    for(let row=0; row<bheight; row++){
        let currentRow = [];
       let currentRowHTML=`<tr id="row${row}">`;
        for(let column = 0; column<bwidth; column++){
            pos++;
            let nodeContent = " ";
            let nodeID = `${row}-${column}`, nodeState="node";
            let newNode = new Node(nodeID, nodeState, row, column);
            if(row===rand1&&column===rand2&&hasStart===false&&nodeState!="nodeFinish"){
                nodeState="nodeStart";
                hasStart=true;
                isStart=pos;
                nodeContent = "S";
                
            }
            else if (row===rand3&&column===rand4&&hasFinish===false&&nodeState!="nodeStart"){
                nodeState="nodeFinish";
                hasFinish=true; 
                isFinish=pos;
                nodeContent = "F";

            
            }
            innerGrid.push(newNode);
            currentRow.push(newNode);
            currentRowHTML+=`<td id="row${row}_column${column}" class="${nodeState}" onclick="makeWall(id)">${nodeContent}</td>`;
        }
        
        tableHTML+=`${currentRowHTML}</tr>`;
    }

    

    tableHTML+="</tbody>";
    let mygrid = document.getElementById("mygrid");
    mygrid.innerHTML=tableHTML;
}


gridGen();



function makeWall (id){
  let node = document.getElementById(id);
  if(node.className == "node"){
    node.className = "Obstacle";
  }
  else {
      node.className = "node";
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
            counter++;
            }
    }
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
            
            break;
        case "dijkstras":
          dijkstras(innerGrid,innerGrid[isStart],innerGrid[isFinish]);
            break;
        default: 
            window.alert ("No Algorithm Selected"); 
            throw "No Algorithm Selected"; 
               

    }
   
}


//grid: innerGrid; start: pos start; end: pos end.
let dijkstras=(innerGrid, isStart, isFinish)=>{
  let distances = {};
  distances[isFinish] = "Infinity";
  distances = Object.assign(distances,innerGrid[isStart]);
  let parents = {isFinish: null};
  for (let child in innerGrid[isStart]){
    parents[child] = isStart;
  }

  let visited = [];
  let thisNode = nodeShortestDistance(distances, visited);
  while (thisNode){
    let distance = distances[thisNode];
    let children = innerGrid[thisNode];
    for(let child in children){
      if(String(child)===String(isStart)){
        continue;
      }
      else{
        let newDistance = distance + children [child];
        if(!distances[child]||distances[child]>newDistance){
          distances[child]=newDistance;
          parents[child]=thisNode;
        }
      }
    }
    visited.push(thisNode);
    thisNode = nodeShortestDistance(distance,visited);
  }

  let shortestPath = [isFinish];
  let parent = parents[isFinish];
  while (parent){
    shortestPath.push(parent);
    parent = parents[parent];
  }
  shortestPath.reverse();

}

let nodeShortestDistance=(distance, visited)=>{
  let isShortest = null;
  for(let thisNode in distance){
    let isShortestCurrentNode = (isShortest === null) || (distance[thisNode]<distance[isShortest]);
    if(isShortestCurrentNode && !visited.includes(thisNode)){
      isShortest = thisNode;
    }
  }
  return isShortest;
}

console.log(dijkstras(innerGrid,isStart,isFinish))