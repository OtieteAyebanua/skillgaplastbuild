export const formatMoney = (money: number): { left: string; right: string } => {
  const [integer, decimal] = money.toFixed(2).split(".");
  const left = Number(integer).toLocaleString(); // adds commas
  const right = decimal;
  return { left, right };
};