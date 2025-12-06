import { readFileSync } from 'fs';

export const readMatrixFromFile = (
  path: string,
  options: { skipSplittingRows?: boolean; splitBy?: string } = {}
): string[][] => {
  const content = readFileSync(path, 'utf8');

  return content
    .trim()
    .split(/\r?\n/)
    .filter((line: string) => line.trim().length > 0)
    .map((line) =>
      options.skipSplittingRows
        ? line.trim()
        : line.trim().split(options.splitBy || '')
    );
};
