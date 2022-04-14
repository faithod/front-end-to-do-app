import { formatDate } from "../utils/formatDate";

test("extracts and formats the month and day from the input date string in format YYYY-MM-DDT23:00:00.000Z", () => {
  expect(formatDate("2022-04-04T23:00:00.000Z")).toBeDefined();
  expect(formatDate("2022-04-01T23:00:00.000Z")).toStrictEqual("1st Apr");
  expect(formatDate("2022-04-22T23:00:00.000Z")).toStrictEqual("22nd Apr");
  expect(formatDate("2022-05-30T23:00:00.000Z")).toStrictEqual("30th May");
  expect(formatDate("2022-06-27T23:00:00.000Z")).toStrictEqual("27th June");
});
