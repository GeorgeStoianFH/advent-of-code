import { readArrayFromFile } from '../../utilities/readArray';

const input = readArrayFromFile('./input.txt');
const START_POSITION = 50;

const solutionProblemOne = () => {
  let password = 0;
  let position = START_POSITION;

  input.forEach((line) => {
    const direction = line[0];
    const steps = parseInt(line.slice(1));
    const multiplication = direction === 'R' ? 1 : -1;

    position += steps * multiplication;

    if (position % 100 === 0) {
      password++;
    }
  });

  return password;
};

const solutionProblemTwo = () => {
  let password = 0;
  let position = START_POSITION;

  input.forEach((line) => {
    const direction = line[0];
    const steps = parseInt(line.slice(1));
    const multiplication = direction === 'R' ? 1 : -1;
    const initialPosition = position;

    position += steps * multiplication;

    const numberOfFullTurns = Math.floor(steps / 100);
    const incompleteTurnSteps = multiplication * (steps % 100);

    const positionAfterIncompleteTurn = initialPosition + incompleteTurnSteps;

    if (position % 100 === 0) {
      password++;
    } else {
      password += Math.floor(Math.abs(positionAfterIncompleteTurn) / 100);
    }

    password += numberOfFullTurns;

    if (
      (initialPosition < 0 && positionAfterIncompleteTurn > 0) ||
      (initialPosition > 0 && positionAfterIncompleteTurn < 0)
    ) {
      password++;
    }

    position = position % 100;
  });

  return password;
};

console.log('Solution problem one:', solutionProblemOne());
console.log('Solution problem two:', solutionProblemTwo());
