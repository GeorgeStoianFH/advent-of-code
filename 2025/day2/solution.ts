const input = '';

const isNumberComposedOfRepeatedBlocks = (
  number: number,
  repeatCount: number
): boolean => {
  const stringNumber = String(number);
  const numberOfDigits = stringNumber.length;

  if (numberOfDigits % repeatCount !== 0) {
    return false;
  }

  const blockLength = numberOfDigits / repeatCount;
  const block = stringNumber.slice(0, blockLength);
  const candidate = block.repeat(repeatCount);

  return candidate === stringNumber;
};

const solutionProblemOne = (input: string): number => {
  let sum = 0;
  const intervals = input.split(',');

  intervals.forEach((interval) => {
    const [start, end] = interval.split('-');

    for (let number = parseInt(start); number <= parseInt(end); number++) {
      if (isNumberComposedOfRepeatedBlocks(number, 2)) {
        sum += number;
      }
    }
  });

  return sum;
};

const solutionProblemTwo = (input: string): number => {
  let sum = 0;
  const intervals = input.split(',');

  intervals.forEach((interval) => {
    const [start, end] = interval.split('-');

    for (let number = parseInt(start); number <= parseInt(end); number++) {
      const numberOfDigits = String(number).length;

      for (let repeatCount = 2; repeatCount <= numberOfDigits; repeatCount++) {
        if (isNumberComposedOfRepeatedBlocks(number, repeatCount)) {
          sum += number;
          break;
        }
      }
    }
  });

  return sum;
};

console.log('Solution problem one:', solutionProblemOne(input));
console.log('Solution problem two:', solutionProblemTwo(input));
