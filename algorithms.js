let closedNodes;

export function aStar(){
 
  let openNodes;
  closedNodes=[];
  let currentNode;
  openNodes = [innerGrid.startNode];
  while(!!openNodes==[]){
    currentNode = (openNodes.sort((a,b)=>a.gScore,b.gScore)).shift();
    closedNodes.push(currentNode);
    if(currentNode===innerGrid.endNode){
      return closedNodes;
    }
    else{
      let neighbors = getNeighbors(currentNode);
      for (let neighbor in neighbors){
        let newGScore = currentNode.gScore + getNeighborDistance(currentNode,neighbor);
        if(newGScore<neighbor.gScore){
          neighbor.gScore = newGScore;
          neighbor.fScore = getFscore(neighbor,endNode);
          if(openNodes.includes(neighbor)===false)
          openNodes.add(neighbor);
        }
      }
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
  

}
function getNeighbors(node){
  let neighbors = [];
  let row = node.row, col = node.column;

  if (row > 0) neighbors.push(innerGrid[row - 1][col]);
  if (row < bheight - 1) neighbors.push(innerGrid[row + 1][col]);
  if (col > 0) neighbors.push(innerGrid[row][col - 1]);
  if (col < bwidth - 1) neighbors.push(innerGrid[row][col + 1]);

//diagonal nodes:
  if(row>1&&col<bwidth-1)
  neighbors.push(innerGrid[row-1][col+1]);
  if(row>1&&col>1)
  neighbors.push(innerGrid[row-1][col-1]);
  if(row<bheight-1&&col<bwidth-1)
  neighbors.push(innerGrid[row+1][col+1]);
  if(row<bheight-1&&col>1)
  neighbors.push(innerGrid[row+1][col-1]);

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
  console.log("H distance to end:",distanceToEnd," Score:",fScore);
  return fScore;
} 


getFscore(startNode,endNode);

