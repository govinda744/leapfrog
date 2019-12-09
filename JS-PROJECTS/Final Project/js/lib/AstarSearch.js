class AstarSearch {
  static resetGrid(grid) {
    for (let rowGrid of grid) {
      for (let gridCell of rowGrid) {
        gridCell.functionalDistance = 0;
        gridCell.heuristicDistance = 0;
        gridCell.gFunctionDistance = 0;
        gridCell.visited = false;
        gridCell.closed = false;
        gridCell.parent = null;
      }
    }
  }

  static findPath(grid, startNode, endNode) {
    AstarSearch.resetGrid(grid);

    let openList = [];
    openList.push(startNode);

    while (openList.length > 0) {
      var indexOfLowFunctionalDistance = 0;
      for (let i = 0; i < openList.length; i++) {
        if (
          openList[i].functionalDistance <
          openList[indexOfLowFunctionalDistance]
        ) {
          indexOfLowFunctionalDistance = i;
        }
      }

      let currentNode = openList[indexOfLowFunctionalDistance];

      if (currentNode.equals(endNode)) {
        let current = currentNode;
        var path = [];
        while (current.parent) {
          path.push(current);
          current = current.parent;
        }

        return path.reverse();
      }
      openList.splice(indexOfLowFunctionalDistance, 1);
      currentNode.closed = true;

      let neighbours = AstarSearch.neighbours(grid, currentNode);

      for (let i = 0; i < neighbours.length; i++) {
        let neighbour = neighbours[i];

        if (neighbour.closed || neighbour.isWall()) {
          continue;
        }

        let gScore = currentNode.gFunctionDistance + 1;
        let gScoreIsBest = false;

        if (!neighbour.visited) {
          gScoreIsBest = true;
          neighbour.heuristicDistance = AstarSearch.heuristic(
            neighbour,
            endNode
          );
          neighbour.visited = true;
          openList.push(neighbour);
        } else if (gScore < neighbour.gFunctionDistance) {
          gScoreIsBest = true;
        }

        if (gScoreIsBest) {
          neighbour.parent = currentNode;
          neighbour.gFunctionDistance = gScore;
          neighbour.functionalDistance =
            neighbour.gFunctionDistance + neighbour.heuristicDistance;
        }
      }
    }

    return [];
  }

  static heuristic(sNode, dNode) {
    return Math.max(
      Math.abs(sNode.beginX - dNode.beginX),
      Math.abs(sNode.beginY - dNode.beginY)
    );
  }

  static neighbours(grid, node) {
    let returnArray = [];
    let x = node.beginX / 50;
    let y = node.beginY / 50;

    if (grid[x - 1] && grid[x - 1][y]) {
      returnArray.push(grid[x - 1][y]);
    }

    if (grid[x + 1] && grid[x + 1][y]) {
      returnArray.push(grid[x + 1][y]);
    }

    if (grid[x] && grid[x][y - 1]) {
      returnArray.push(grid[x][y - 1]);
    }

    if (grid[x] && grid[x][y + 1]) {
      returnArray.push(grid[x][y + 1]);
    }

    // diagonal neighbours

    // if (grid[x - 1] && grid[x - 1][y - 1]) {
    //   returnArray.push(grid[x - 1][y - 1]);
    // }

    // if (grid[x + 1] && grid[x + 1][y - 1]) {
    //   returnArray.push(grid[x + 1][y - 1]);
    // }

    // if (grid[x - 1] && grid[x - 1][y + 1]) {
    //   returnArray.push(grid[x - 1][y + 1]);
    // }

    // if (grid[x + 1] && grid[x + 1][y + 1]) {
    //   returnArray.push(grid[x + 1][y + 1]);
    // }

    return returnArray;
  }
}
