import { readMatrixFromFile } from '../../utilities/readMatrix';

const input = readMatrixFromFile('./input.txt', { skipSplittingRows: true });

const solutionProblemOne = () => {
  const ranges: [number, number][] = [];
  let freshIngredients = 0;

  for (const row of input) {
    if (row.includes('-')) {
      const [start, end] = row.split('-');
      ranges.push([parseInt(start), parseInt(end)]);
    } else {
      const num = parseInt(row);
      if (ranges.some(([start, end]) => num >= start && num <= end)) {
        freshIngredients++;
      }
    }
  }

  return freshIngredients;
};

const solutionProblemTwo = () => {
  const ranges: [number, number][] = [];

  for (const row of input) {
    if (row.includes('-')) {
      const [start, end] = row.split('-');
      ranges.push([parseInt(start), parseInt(end)]);
    }
  }

  ranges.sort((a, b) => a[0] - b[0]);

  const merged: [number, number][] = [];

  for (const [start, end] of ranges) {
    const last = merged[merged.length - 1];

    if (!last || start > last[1]) {
      merged.push([start, end]);
    } else {
      last[1] = Math.max(last[1], end);
    }
  }

  let freshIngredients = 0;
  for (const [start, end] of merged) {
    freshIngredients += end - start + 1;
  }

  return freshIngredients;
};

console.log(solutionProblemOne());
console.log(solutionProblemTwo());
