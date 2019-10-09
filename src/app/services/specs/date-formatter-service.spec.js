import { getGraphQLDate, getMonthOptions } from "../date-formatter-service";

// Format of a Date object is: new Date(year, month, day, hours, minutes, seconds, milliseconds)
describe("date-formatter-service", () => {
  const NODE_ICU_DATA = process.env;

  beforeAll(() => {
    jest.resetModules(); // do not delete
    process.env = { ...NODE_ICU_DATA };
    delete process.env.NODE_ENV;
  });

  afterAll(() => {
    process.env = NODE_ICU_DATA;
  });

  it("Should return a date of the form year (numeric) month (2-digit) day (2-digit) i.e. 2019-01-01", () => {
    const targetDate = new Date(2019, 0, 1);
    const graphQLDate = getGraphQLDate(targetDate);
    expect(graphQLDate).toEqual("2019-01-01");
  });

  it("Should return short months options", () => {
    let months = getMonthOptions();
    expect(months).toEqual([
      { key: 1, value: "January" },
      { key: 2, value: "February" },
      { key: 3, value: "March" },
      { key: 4, value: "April" },
      { key: 5, value: "May" },
      { key: 6, value: "June" },
      { key: 7, value: "July" },
      { key: 8, value: "August" },
      { key: 9, value: "September" },
      { key: 10, value: "October" },
      { key: 11, value: "November" },
      { key: 12, value: "December" }
    ]);
  });
});
