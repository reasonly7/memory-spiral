export const spiral = (total: number) => {
  if (total <= 0) {
    return -1;
  }

  let start = 0;
  let pow = 0;

  while (true) {
    const n = Math.floor(total / 5 ** pow);
    start = n * 5 ** pow;
    if (start !== total) {
      break;
    } else {
      pow++;
    }
  }

  return start;
};
