export function getDate(date: string): string {
  const tempDate = new Date(date);
  const a = tempDate.toLocaleDateString("en-us", {
    day: "numeric",
    month: "long"
  });
  return `${a}th`;
}
