export function getNumOfNeighbouringBombs(bombCells) {
  let result = [];
  for (let i = 0; i < 100; i++) {
    if (bombCells.indexOf(i) === -1) {
      result[i] = 0;
      if (i % 10 !== 0) {
        if (bombCells.indexOf(i - 11) !== -1) result[i]++;
        if (bombCells.indexOf(i - 1) !== -1) result[i]++;
        if (bombCells.indexOf(i + 9) !== -1) result[i]++;
      }
      if (bombCells.indexOf(i - 10) !== -1) result[i]++;
      if (bombCells.indexOf(i + 10) !== -1) result[i]++;
      if (i % 10 !== 9) {
        if (bombCells.indexOf(i - 9) !== -1) result[i]++;
        if (bombCells.indexOf(i + 1) !== -1) result[i]++;
        if (bombCells.indexOf(i + 11) !== -1) result[i]++;
      }
    } else
      result[i] = "B";
  }
  return result;
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
