export const parseString = (str) => {
  if (!str || typeof str !== 'string') return undefined;

  const trimmedStr = str.trim();

  if (trimmedStr === '') return undefined;

  return str;
};
