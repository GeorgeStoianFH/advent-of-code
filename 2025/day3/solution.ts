import { readMatrixFromFile } from '../../utilities/readMatrix';

const batteryPacks = readMatrixFromFile('./input.txt');

const getMaxPackJoltage = (pack: string, batteriesToUse: number) => {
  const bestSequence: string[] = [];
  let batteriesToTurnOff = pack.length - batteriesToUse;

  for (const batteryPower of pack) {
    while (
      batteriesToTurnOff &&
      bestSequence.length &&
      bestSequence.at(-1)! < batteryPower
    ) {
      bestSequence.pop();
      batteriesToTurnOff--;
    }

    bestSequence.push(batteryPower);
  }

  return Number(bestSequence.slice(0, batteriesToUse).join(''));
};

const computeMaxJoltage = (batteriesToUse: number) => {
  let sum = 0;

  batteryPacks.forEach((pack) => {
    pack.forEach((value) => {
      const maxJoltage = getMaxPackJoltage(value, batteriesToUse);
      sum += maxJoltage;
    });
  });

  return sum;
};

console.log('Solution problem one:', computeMaxJoltage(2));
console.log('Solution problem two:', computeMaxJoltage(12));
