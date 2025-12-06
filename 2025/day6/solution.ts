import { readMatrixFromFile } from '../../utilities/readMatrix';

const solutionProblemOne = () => {
  const input = readMatrixFromFile('./input.txt', {
    splitBy: ' ',
    cleanExtraWhitespace: true,
  });

  let total = 0;

  for (let col = 0; col < input[0]!.length; col++) {
    let columnSumTotal = 0;
    let columnMultiplicationTotal = 1;

    for (let row = 0; row < input.length - 1; row++) {
      const value = input[row][col];

      if (input[input.length - 1][col] === '*') {
        columnMultiplicationTotal *= parseInt(value);
      } else {
        columnSumTotal += parseInt(value);
      }
    }

    total +=
      input[input.length - 1][col] === '*'
        ? columnMultiplicationTotal
        : columnSumTotal;
  }

  return total;
};

const getColumnTotal = (columnValues: number[], isMultiplication: boolean) => {
  if (isMultiplication) {
    return columnValues.reduce((acc, curr) => acc * curr, 1);
  }

  return columnValues.reduce((acc, curr) => acc + curr, 0);
};

const solutionProblemTwo = () => {
  const input = readMatrixFromFile('./input.txt', {
    skipSplittingRows: true,
    cleanExtraWhitespace: false,
  });

  let total = 0;
  let columnValues: number[] = [];
  let isMultiplicationColumn = false;

  for (let col = 0; col < input[0]!.length; col++) {
    let columnNumber = '';

    for (let row = 0; row < input.length; row++) {
      const value = input[row][col];

      if (value === '*') {
        isMultiplicationColumn = true;
      } else if (value && value !== '+') {
        columnNumber += value.trim();
      }
    }

    if (!columnNumber) {
      total += getColumnTotal(columnValues, isMultiplicationColumn);

      columnValues = [];
      isMultiplicationColumn = false;
    } else {
      columnValues.push(parseInt(columnNumber));
    }
  }

  total += getColumnTotal(columnValues, isMultiplicationColumn);

  return total;
};

console.log('Solution problem one:', solutionProblemOne());
console.log('Solution problem two:', solutionProblemTwo());
