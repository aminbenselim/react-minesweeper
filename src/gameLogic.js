/**
 * 
 * @param {number} cellNum the number of the cell you want to check its neighbours
 */
export function getNeighbouringCells(cellNum) {
  let result = [];
  if (cellNum % 10 === 0) {
    result = result.concat([
      cellNum + 1,
      cellNum + 10,
      cellNum + 11,
      cellNum - 10,
      cellNum - 9
    ]);
  } else if (cellNum % 10 === 9) {
    result = result.concat([
      cellNum - 1,
      cellNum - 10,
      cellNum - 11,
      cellNum + 10,
      cellNum + 9
    ]);
  } else {
    result = result.concat([
      cellNum + 1,
      cellNum + 11,
      cellNum - 1,
      cellNum - 10,
      cellNum - 11,
      cellNum + 10,
      cellNum + 9,
      cellNum - 9
    ]);
  }
  return result.filter(val => val < 100 && val > 0);
}
export function getNumOfNeighbouringBombs(bombCells, neighbouringCells, i) {
  if (bombCells.indexOf(i) !== -1)
    return "B";
  else {
    let result = neighbouringCells.reduce(
      (acc, neighbour, ind) => {
        if (bombCells.indexOf(neighbour) !== -1) {
          return acc + 1;
        } else
          return acc;
      },
      0
    );
    return result;
  }
}
export function getRandomBombCells() {
  let bombCells = [];
  for (let i = 0; i < 20; i++) {
    let rnd = Math.floor(Math.random() * 100);
    while (bombCells.indexOf(rnd) !== -1)
      rnd = Math.floor(Math.random() * 100);
    bombCells.push(rnd);
  }
  return bombCells;
}

export function revealNeighbours(ind, neighbours, values) {
  let revealed = [];
  let visited = [];
  function recurse(ind, neighbours, values) {
    if (values[ind] === "B") {
    } else if ((visited.indexOf(ind) === -1) && values[ind] === 0) {
      visited.push(ind);
      if (revealed.indexOf(ind) === -1) revealed.push(ind);
      let neighs = neighbours[ind];
      for (let j = 0; j < neighs.length; j++) {
        recurse(neighs[j], neighbours, values);
      }
    } else {
      if (revealed.indexOf(ind) === -1) revealed.push(ind);
    }
    return revealed;
  }
  revealed = recurse(ind, neighbours, values);
  return revealed;
}
/*export function endGame(val) {
  if (val === "B") return true;
  else return false;
}*/
