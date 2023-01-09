const padNumber = (number) => number.toString().padStart(2, "0");

export const formatDate = (date) => {
  const day = padNumber(date.getDate());
  const month = padNumber(date.getMonth() + 1);
  const year = padNumber(date.getFullYear());

  return `${day}/${month}/${year}`;
};
