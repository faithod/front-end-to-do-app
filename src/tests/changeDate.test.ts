import { changeDate } from "../utils/changeDate";

test("changes the due property of the request body object and manually adds a day to the date", () => {
  expect(
    changeDate({
      content: "tidy room",
      due: "2022-04-04",
    })
  ).toBeDefined();
  expect(
    changeDate({
      content: "change bedsheets",
      due: "2022-04-01",
    })
  ).toStrictEqual({
    content: "change bedsheets",
    due: "2022-04-02",
  });
  expect(
    changeDate({
      content: "buy flash cards",
      due: "2022-06-27",
    })
  ).toStrictEqual({
    content: "buy flash cards",
    due: "2022-06-28",
  });
  expect(
    changeDate({
      content: "wash car",
      due: "2022-05-30",
    })
  ).toStrictEqual({
    content: "wash car",
    due: "2022-05-31",
  });
  expect(
    changeDate({
      content: "practice for theory test",
      due: undefined,
    })
  ).toStrictEqual({
    content: "practice for theory test",
    due: undefined,
  });
});
