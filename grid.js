


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
                startRow = row;
                startCol = column;
                nodeContent = "S";
                
            }
            else if (row===rand3&&column===rand4&&hasFinish===false&&nodeState!="nodeStart"){
                nodeState="nodeFinish";
                hasFinish=true; 
                endRow = row;
                endCol = column;
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
  if(node.className === "node"){
    node.className = "Obstacle";
  }
  else {
    if(node.className === "Obstacle"){
      node.className = "node";
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
          window.alert ("A*"); 
            break;
        case "dijkstras":
          window.alert ("Dijkstra");
        break;
        default: 
            window.alert ("No Algorithm Selected"); 
            throw "No Algorithm Selected"; 
               

    }
   
}




function testing(){
  let startNode = document.getElementById(`row${startRow}_column${startCol}`);
  let endNode = document.getElementById(`row${endRow}_column${endCol}`)
  let row = startRow, col = startCol;
  let currentNodeID = startNode.id;
  let endID = endNode.id;
  let unvisitedIDs = [];
  for(let row = 0; row<bheight; row++){
    for(let col =0; col< bwidth; col++){
      let unvisitedID = `row${row}_column${col}`;
      if(!(unvisitedID==currentNodeID||unvisitedID==endID)){
        unvisitedIDs.push(unvisitedID);
      }
    }
  }
 
  
 // console.log(String(unvisitedIDs));



}

testing();

