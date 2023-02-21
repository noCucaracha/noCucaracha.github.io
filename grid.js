class Node {
    constructor(id, nodeState, row, column) {
        this.id = id;
        this.nodeState = nodeState;
        this.row = row;
        this.column = column;
       let isObstacle = false;
       let isCurrentNode = false;
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
            if(row===rand1&&column===rand2&&hasStart===false&&nodeState!="nodeFinish"){
                nodeState="nodeStart";
                hasStart=true;
               
                nodeContent = "S";
                
            }
            else if (row===rand3&&column===rand4&&hasFinish===false&&nodeState!="nodeStart"){
                nodeState="nodeFinish";
                hasFinish=true; 
              
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
if(!(node.className=="nodeStart"&&node.className=="nodeFinish")){
  node.className = "Obstacle";
}
if (!node.className == "node"){
    node.className = "node";
}
   
}


function PlaceRandWall(){
    for(let i = 0; i <10;i++){
        let row = Math.abs(getRandInt(bheight));
        let col = Math.abs(getRandInt(bwidth));
        let thisNode = document.getElementById(`row${row}_column${col}`);
        if(counter<(bheight+bwidth)){
            if(thisNode.className!="nodeStart"&&thisNode.className!="nodeFinish"){
            thisNode.className = "Obstacle";
            counter++;
            }
    }
}
}