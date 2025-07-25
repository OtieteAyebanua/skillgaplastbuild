export const formatMoney = (money: number): { left: string; right: string } => {
  const [integer, decimal] = money.toFixed(2).split(".");
  const left = Number(integer).toLocaleString(); // adds commas
  const right = decimal;
  return { left, right };
};

export const generateUUID = () => {
  // Generate 9 random digits (from 000000000 to 999999999)
  const randomPart = Math.floor(Math.random() * 1_000_000_000)
    .toString()
    .padStart(9, "0");

  // Get current UTC timestamp in milliseconds
  const timestampPart = Date.now().toString();
  return `${randomPart}_${timestampPart}`;
};
