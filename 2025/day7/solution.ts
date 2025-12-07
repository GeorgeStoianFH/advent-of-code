import { readMatrixFromFile } from '../../utilities/readMatrix';

const input = readMatrixFromFile('./input.txt', { skipSplittingRows: true });

const solutionProblemOne = () => {
  const startColumn = input[0].indexOf('S');
  const beams = new Set<number>();
  let beamSplits = 0;

  beams.add(startColumn);

  for (let row = 2; row < input.length; row += 2) {
    Array.from(beams).forEach((beamColumn) => {
      if (input[row][beamColumn] === '^') {
        beamSplits++;
        beams.delete(beamColumn);
        beams.add(beamColumn - 1);
        beams.add(beamColumn + 1);
      }
    });
  }
  return beamSplits;
};

const solutionProblemTwo = () => {
  const startColumn = input[0].indexOf('S');

  let particlePathCounts = new Map<number, number>();
  particlePathCounts.set(startColumn, 1);

  for (let row = 2; row < input.length; row += 2) {
    const newParticlePathCounts = new Map<number, number>();

    for (const [column, count] of particlePathCounts) {
      if (input[row][column] === '^') {
        newParticlePathCounts.set(
          column - 1,
          (newParticlePathCounts.get(column - 1) ?? 0) + count
        );
        newParticlePathCounts.set(
          column + 1,
          (newParticlePathCounts.get(column + 1) ?? 0) + count
        );
      } else {
        newParticlePathCounts.set(
          column,
          (newParticlePathCounts.get(column) ?? 0) + count
        );
      }
    }

    particlePathCounts = newParticlePathCounts;
  }

  return Array.from(particlePathCounts.values()).reduce(
    (acc, count) => acc + count,
    0
  );
};

console.log('Solution problem one:', solutionProblemOne());
console.log('Solution problem two:', solutionProblemTwo());
