import { getGraphQLDate } from "../services/date-formatter-service";

export const currentYearClicked = () => {
  let currentYear = new Date().getFullYear();
  let currentYearFromDate = new Date(currentYear, 0, 1);
  let currentYearToDate = new Date(currentYear, 11, 31);

  return {
    input: {
      dateFrom: getGraphQLDate(currentYearFromDate),
      dateTo: getGraphQLDate(currentYearToDate)
    }
  };
};

export const previousYearClicked = () => {
  let currentYear = new Date().getFullYear();
  let currentYearFromDate = new Date(currentYear - 1, 0, 1);
  let currentYearToDate = new Date(currentYear - 1, 11, 31);

  return {
    input: {
      dateFrom: getGraphQLDate(currentYearFromDate),
      dateTo: getGraphQLDate(currentYearToDate)
    }
  };
};

export const applyCustomDateSubmitted = state => {
  // Grab whatever was already set on the store (must have some data):
  let fromMonth = state.fromMonth;
  let toMonth = state.toMonth;
  let year = state.year;

  // Make sure we have all the required fields (should have some defaults anyways):
  if (fromMonth && toMonth && year) {
    let fromDate = new Date(year, fromMonth - 1, 1);
    let toDate = new Date(year, toMonth, 0);

    return {
      input: {
        dateFrom: getGraphQLDate(fromDate),
        dateTo: getGraphQLDate(toDate)
      }
    };
  }
};

export const getDateTypeLabel = dateType => {
  switch (dateType) {
    case "previous":
      return "label.previous.year";
    case "custom":
      return "label.custom.date";
    case "current":
    default:
      return "label.current.year";
  }
};

export const datePickerDropdownOptions = [
  {
    value: "label.current.year",
    key: "label.current.year"
  },
  {
    value: "label.previous.year",
    key: "label.previous.year"
  },
  {
    value: "label.custom.date",
    key: "label.custom.date"
  }
];

export const retentionYearsOptions = retentionYears => {
  let year = new Date().getFullYear();
  let years = [];
  while (years.length <= retentionYears) {
    years.push({
      key: year,
      value: year.toString()
    });
    year = year - 1;
  }
  return years;
};
