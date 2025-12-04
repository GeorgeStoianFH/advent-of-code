import { readFileSync } from 'fs';

export const readMatrixFromFile = (path: string): string[][] => {
  const content = readFileSync(path, 'utf8');

  return content
    .trim()
    .split(/\r?\n/)
    .filter((line: string) => line.trim().length > 0)
    .map((line) => line.trim().split(''));
};
