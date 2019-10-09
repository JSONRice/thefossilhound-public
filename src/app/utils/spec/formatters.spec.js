import { formatDate } from "../formatters";

// Format of a Date object is: new Date(year, month, day, hours, minutes, seconds, milliseconds)
describe("formatters", () => {
  const NODE_ICU_DATA = process.env;

  beforeAll(() => {
    jest.resetModules(); // do not delete
    process.env = { ...NODE_ICU_DATA };
    delete process.env.NODE_ENV;
  });

  afterAll(() => {
    process.env = NODE_ICU_DATA;
  });

  it("should return 01 Jan 2019 for 2019/01/01 date english", () => {
    expect(formatDate(new Date(2019, 0, 1))).toEqual("01 Jan 2019");
  });

  it("should return 01 Jan 2019 for 2019-01-01 english", () => {
    expect(formatDate("2019-01-01")).toEqual("01 Jan 2019");
  });
});
