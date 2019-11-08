import { getLocale } from "../utils/initialization";

/**
 * Format date for GraphQL/Apollo queries
 * This is just the default date with the timestamp stripped off. Nothing fancy.
 *
 * @param date
 * @returns {string}
 */
export function getGraphQLDate(date) {
  let day, month, year;
  day = month = year = "";

  Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  })
    .formatToParts(new Date(date))
    .map(({ type, value }) => {
      return { [type]: value };
    })
    .forEach(part => {
      // There's just one key to check
      let key = Object.keys(part)[0];
      switch (key) {
        case "day":
          day = part[key];
          break;
        case "month":
          month = part[key];
          break;
        case "year":
          year = part[key];
          break;
      }
    });

  return `${year}-${month}-${day}`;
}

// When you create a Javascript Date object from a string it adjust it for the local timezone.
// So "2019-04-03" will become Tue Apr 02 2019 18:00:00 GMT-0600 (Mountain Daylight Time)
// This function creates the Javascript Date correctly from strings in a "yyyy-mm-DD" format
export function getDateFromGraphQLDateString(date) {
  return new Date(date.split("-").join("/"));
}

/**
 * Given a date return the month in two digit format.
 *
 * For example January which starts at zero would convert to '01'
 *
 * @param date
 * @returns {string}
 */
export function getTwoDigitMonth(date) {
  let month = date.getMonth() + 1;
  return month < 10 ? "0" + month : "" + month;
}

/**
 * Return a list of key-value pairs for each month. See specs.
 *
 * @returns {Array}
 */
export function getMonthOptions() {
  let format = new Intl.DateTimeFormat(getLocale(), { month: "long" });
  let options = [];
  for (let month = 0; month < 12; month++) {
    // arbitrarily pick 2 <month> 2000... picked the second so we don't have timezone issues
    let date = new Date(2000, month, 2, 0, 0, 0);
    options.push({ key: month + 1, value: format.format(date) });
  }
  return options;
}
