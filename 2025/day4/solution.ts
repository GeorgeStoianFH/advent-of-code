import { readMatrixFromFile } from '../../utilities/readMatrix';

const input = readMatrixFromFile('./input.txt');

const NEIGHBOUR_POSITIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];
const ROLL = '@';
const FREE_SPACE = '.';

const countMovableRolls = (
  input: string[][],
  options: { removeValidRolls?: boolean } = {}
) => {
  let movableRolls = 0;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      let neighbourRolls = 0;

      if (input[i][j] === ROLL) {
        NEIGHBOUR_POSITIONS.forEach(([neighbourRow, neighbourColumn]) => {
          const neighbourRowIndex = i + neighbourRow;
          const neighbourColumnIndex = j + neighbourColumn;

          try {
            if (input[neighbourRowIndex][neighbourColumnIndex] === ROLL) {
              neighbourRolls++;
            }
          } catch {
            // too lazy to filter out of bounds indexes
          }
        });

        if (neighbourRolls < 4) {
          movableRolls++;

          if (options.removeValidRolls) {
            input[i][j] = FREE_SPACE;
          }
        }
      }
    }
  }

  return movableRolls;
};

const solutionProblemOne = (): number => countMovableRolls(input);

const solutionProblemTwo = (): number => {
  let movableRolls = 0;
  let removedRollsOnLastPass = true;

  while (removedRollsOnLastPass) {
    const currentPassMovableRolls = countMovableRolls(input, {
      removeValidRolls: true,
    });
    removedRollsOnLastPass = currentPassMovableRolls !== 0;
    movableRolls += currentPassMovableRolls;
  }

  return movableRolls;
};

console.log('Solution problem one:', solutionProblemOne());
console.log('Solution problem two:', solutionProblemTwo());
