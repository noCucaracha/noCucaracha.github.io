

export function aStar(){
  let allNodes = getNodes(innerGrid);
  let openNodes, closedNodes=[];
  let currentNode;
  openNodes = [innerGrid.startNode];
  while(!!openNodes==[]){
  currentNode = (openNodes.sort((a,b)=>a.gScore,b.gScore)).shift();
  closedNodes.push(currentNode);
  if(currentNode===allNodes.endNode)


  }
  

}

function getFscore(gScore,){

}