import { parseDateAsUTC } from "../utils";

describe("Test parseDateAsUTZ", () => {
  const dateWithZ = "2023-07-26T06:30:00Z";

  test("Date without time zone extension is interpreted as UTZ", () => {
    const dateWithout = "2023-07-26T06:30:00";
    const date = parseDateAsUTC(dateWithout);
    expect(date).toEqual(new Date(dateWithZ));
  });

  test("Date with Z", () => {
    const date = parseDateAsUTC(dateWithZ);
    expect(date).toEqual(new Date(dateWithZ));
  });

  test("Date with time zone plus 0", () => {
    const dateWithPlus = "2023-07-26T06:30:00+00:00";
    const date = parseDateAsUTC(dateWithPlus);
    expect(date).toEqual(new Date(dateWithZ));
  });

  test("Date with time zone plus 4", () => {
    const dateWithPlus = "2023-07-26T10:30:00+04:00";
    const date = parseDateAsUTC(dateWithPlus);
    expect(date).toEqual(new Date(dateWithZ));
  });

  test("Date with time zone minus 0", () => {
    const dateWithMinus = "2023-07-26T06:30:00-00:00";
    const date = parseDateAsUTC(dateWithMinus);
    expect(date).toEqual(new Date(dateWithZ));
  });

  test("Date with time zone minus 4", () => {
    const dateWithMinus = "2023-07-26T02:30:00-04:00";
    const date = parseDateAsUTC(dateWithMinus);
    expect(date).toEqual(new Date(dateWithZ));
  });
});
