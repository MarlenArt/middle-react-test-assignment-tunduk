export const parseExperience = (expStr: string): number => {
  const cleaned = expStr?.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) || 0;
};
