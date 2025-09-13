export default function Board({ n, path, visited, src, dest, secondLastCells }) {
  return (
    <div className="inline-block">
      {/* Column headers */}
      <div className="grid" style={{ gridTemplateColumns: `3rem repeat(${n}, 3rem)` }}>
        <div className="w-12 h-12"></div>
        {Array.from({ length: n }).map((_, c) => (
          <div
            key={`col-${c}`}
            className="w-12 h-12 flex items-center justify-center font-bold text-sm"
          >
            {c}
          </div>
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: n }).map((_, r) => (
        <div key={`row-${r}`} className="grid" style={{ gridTemplateColumns: `3rem repeat(${n}, 3rem)` }}>
          {/* Row header */}
          <div className="w-12 h-12 flex items-center justify-center font-bold text-sm">
            {r}
          </div>

          {/* Cells */}
          {Array.from({ length: n }).map((_, c) => {
            let isSrc = src[0] === r && src[1] === c;
            let isDest = dest[0] === r && dest[1] === c;
            let isPath = path.some(([pr, pc]) => pr === r && pc === c);
            let isVisited = visited.some(([vr, vc]) => vr === r && vc === c);
            let isSecondLast = secondLastCells?.some(([sr, sc]) => sr === r && sc === c);

            return (
              <div
                key={`${r}-${c}`}
                className={`w-12 h-12 flex items-center justify-center border transition-all duration-200
                  ${isSrc ? "bg-green-500 text-white" 
                    : isDest ? "bg-red-500 text-white"
                    : isPath ? "bg-blue-400 text-white"
                    : isSecondLast ? "bg-purple-400 text-white animate-pulse"
                    : isVisited ? "bg-yellow-200 animate-pulse"
                    : (r + c) % 2 === 0 ? "bg-gray-200" : "bg-white"}
                `}
              >
                {isSrc ? "S" : isDest ? "D" : ""}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
