export const moves = [
  [2, 1], [1, 2], [-1, 2], [-2, 1],
  [-2, -1], [-1, -2], [1, -2], [2, -1],
];

function isValid(x, y, n) {
  return x >= 0 && y >= 0 && x < n && y < n;
}

export function bfsKnight(n, src, dest) {
  const queue = [[...src, 0]];
  const visited = Array.from({ length: n }, () => Array(n).fill(false));
  const parent = Array.from({ length: n }, () => Array(n).fill(null));
  const ways = Array.from({ length: n }, () => Array(n).fill(0));

  visited[src[0]][src[1]] = true;
  ways[src[0]][src[1]] = 1;

  while (queue.length) {
    const [x, y, dist] = queue.shift();

    if (x === dest[0] && y === dest[1]) continue;

    for (let [dx, dy] of moves) {
      let nx = x + dx, ny = y + dy;
      if (isValid(nx, ny, n)) {
        if (!visited[nx][ny]) {
          visited[nx][ny] = true;
          parent[nx][ny] = [x, y];
          ways[nx][ny] = ways[x][y];
          queue.push([nx, ny, dist + 1]);
        } else if (dist + 1 === queue.find(([qx, qy]) => qx === nx && qy === ny)?.[2]) {
          ways[nx][ny] += ways[x][y];
        }
      }
    }
  }

  // Reconstruct one shortest path
  let path = [];
  let cur = dest;
  while (cur) {
    path.push(cur);
    cur = parent[cur[0]][cur[1]];
  }
  path.reverse();

  // Collect second-to-last cells
  let secondLastCells = [];
  for (let [dx, dy] of moves) {
    const x = dest[0] + dx, y = dest[1] + dy;
    if (isValid(x, y, n) && ways[x][y] > 0 && ways[dest[0]][dest[1]] > 0) {
      secondLastCells.push([x, y]);
    }
  }

  return {
    dist: path.length - 1,
    path,
    visited,
    totalWays: ways[dest[0]][dest[1]],
    secondLastCells,
  };
}
