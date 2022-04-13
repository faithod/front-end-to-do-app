import { addSuffix } from "./addSuffix";

export function formatDate(date: string): string {
  const months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [month, day] = date.slice(0, 10).split("-").slice(1); //extracting out month & day from the input string, format: YYYY-MM-DDT23:00:00.000Z
  const monthInLetters = months.find((el, i) => i === Number(month) - 1); //finding the spelt out month
  return `${addSuffix(day)} ${monthInLetters}`;
}
