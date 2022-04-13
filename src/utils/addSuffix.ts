export default function addSuffix(day: string) {
  if (day.startsWith("0")) {
    //removing the zero e.g. 04 -> 4
    day = day[1];
  }
  if (day.length === 2 && day[0] === "1") {
    //if the number is 2 digits & the first number is 1 - the number should end with 'th'
    return day + "th";
  } else {
    //else the number should end with either (st, nd, rd, th) depending on what it ends with
    return day.endsWith("1")
      ? day + "st"
      : day.endsWith("2")
      ? day + "nd"
      : day.endsWith("3")
      ? day + "rd"
      : day + "th";
  }
}

//make this a codewars kata
