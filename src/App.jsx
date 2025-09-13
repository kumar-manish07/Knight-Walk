import { useState } from "react";
import Board from "./Board";
import { bfsKnight } from "./Logic";

export default function App() {
  const [n, setN] = useState(8);
  const [src, setSrc] = useState([0, 0]);
  const [dest, setDest] = useState([7, 7]);
  const [distance, setDistance] = useState(null);
  const [totalWays, setTotalWays] = useState(null);
  const [path, setPath] = useState([]);
  const [visited, setVisited] = useState([]);
  const [secondLastCells, setSecondLastCells] = useState([]);

  const handleSubmit = () => {
    if (src[0] >= n || src[1] >= n || dest[0] >= n || dest[1] >= n) {
      alert("Source/Destination must be within board size!");
      return;
    }

    const { dist, path, visited, totalWays, secondLastCells } = bfsKnight(n, src, dest);
    setDistance(dist);
    setTotalWays(totalWays);
    setPath(path);
    setVisited(
      visited.flatMap((row, r) =>
        row.map((val, c) => (val ? [r, c] : null)).filter(Boolean)
      )
    );
    setSecondLastCells(secondLastCells);
  };

  const handleReset = () => {
    setDistance(null);
    setTotalWays(null);
    setPath([]);
    setVisited([]);
    setSecondLastCells([]);
  };

  const handleRandom = () => {
    const rand = () => Math.floor(Math.random() * n);
    setSrc([rand(), rand()]);
    setDest([rand(), rand()]);
    handleReset();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">♞ Knight’s Walk Visualizer</h1>

      {/* Inputs */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <label className="font-medium">Board size (N):</label>
          <input
            type="number"
            min="3"
            max="20"
            value={n}
            onChange={(e) => {
              const newSize = +e.target.value;
              setN(newSize);
              setSrc([Math.min(src[0], newSize - 1), Math.min(src[1], newSize - 1)]);
              setDest([Math.min(dest[0], newSize - 1), Math.min(dest[1], newSize - 1)]);
            }}
            className="w-16 border px-1 py-1 rounded"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="font-medium">Src:</label>
          <input
            type="number"
            min="0"
            max={n - 1}
            value={src[0]}
            onChange={(e) => setSrc([+e.target.value, src[1]])}
            className="w-14 border px-1 py-1 rounded"
          />
          <input
            type="number"
            min="0"
            max={n - 1}
            value={src[1]}
            onChange={(e) => setSrc([src[0], +e.target.value])}
            className="w-14 border px-1 py-1 rounded"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="font-medium">Dest:</label>
          <input
            type="number"
            min="0"
            max={n - 1}
            value={dest[0]}
            onChange={(e) => setDest([+e.target.value, dest[1]])}
            className="w-14 border px-1 py-1 rounded"
          />
          <input
            type="number"
            min="0"
            max={n - 1}
            value={dest[1]}
            onChange={(e) => setDest([dest[0], +e.target.value])}
            className="w-14 border px-1 py-1 rounded"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Find Path
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          Reset
        </button>
        <button
          onClick={handleRandom}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          Randomize
        </button>
      </div>

      {/* Board */}
      <Board 
        n={n} 
        src={src} 
        dest={dest} 
        path={path} 
        visited={visited} 
        secondLastCells={secondLastCells} 
      />

      {/* Results */}
      {distance !== null && (
        <div className="mt-4 text-lg space-y-2 text-center">
          <p>🎯 Minimum distance: {distance}</p>
          <p>🛤️ Total Possible paths: {totalWays}</p>
        </div>
      )}
    </div>
  );
}
