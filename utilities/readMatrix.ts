import { readFileSync } from 'fs';

export const readMatrixFromFile = (
  path: string,
  options: {
    skipSplittingRows?: boolean;
    splitBy?: string;
    cleanExtraWhitespace?: boolean;
  } = {}
): string[][] => {
  const content = readFileSync(path, 'utf8');

  return content
    .trim()
    .split(/\r?\n/)
    .filter((line: string) => line.trim().length > 0)
    .map((line) =>
      options.skipSplittingRows
        ? options.cleanExtraWhitespace
          ? line.trim()
          : line
        : line
            .trim()
            .split(options.splitBy || '')
            .filter((item) =>
              options.cleanExtraWhitespace ? item.trim().length > 0 : true
            )
    );
};
