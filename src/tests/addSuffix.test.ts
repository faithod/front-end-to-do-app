import { addSuffix } from "../utils/addSuffix";

test("addSuffix returns a string plus its suffix, formatting the day of a date", () => {
  expect(addSuffix("1")).toBeDefined();
  expect(addSuffix("1")).toStrictEqual("1st");
  expect(addSuffix("2")).toStrictEqual("2nd");
  expect(addSuffix("3")).toStrictEqual("3rd");
  expect(addSuffix("4")).toStrictEqual("4th");

  expect(addSuffix("10")).toStrictEqual("10th");
  expect(addSuffix("11")).toStrictEqual("11th");
  expect(addSuffix("22")).toStrictEqual("22nd");
  expect(addSuffix("29")).toStrictEqual("29th");
});
