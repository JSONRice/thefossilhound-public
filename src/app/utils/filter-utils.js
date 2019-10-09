export const extractFilterOptions = (data = [], key, sortKey) => {
  // Reduce the multi-dimensional data object (map)
  let results = data.reduce((acc, curr) => {
    if (!acc[curr[key]] && curr[key]) {
      acc[curr[key]] = curr[key];
    }

    let lines = [];
    if (curr.lines) {
      lines = curr.lines.reduce((acc, curr) => {
        if (!acc[curr[key]] && curr[key]) {
          acc[curr[key]] = curr[key];
        }
        return acc;
      }, {});
    }

    // Merge the flattened lines back into the accumulated object
    return {
      ...acc,
      ...lines
    };
  }, {});

  let listWithSort = Object.keys(results).map(r => ({
    key: r,
    value: results[r],
    sort: sortKey ? data.find(item => item[key] === r)[sortKey] : results[r].toLowerCase()
  }));

  listWithSort.sort((a, b) => (a.sort > b.sort ? 1 : b.sort > a.sort ? -1 : 0));

  return listWithSort;
};

export const extractFlattenedFilterOptions = (data = [], key) => {
  let results = data.reduce((acc, curr) => {
    if (!acc[curr[key]] && curr[key]) {
      acc[curr[key]] = curr[key];
    }
    return acc;
  }, {});

  return Object.keys(results).map(r => ({ key: r, value: results[r] }));
};

/**
 * This function is for the budget page records where each record has a lines array that by default is empty but can
 * have objects representing unit subcategories. This function can and should be used in other locations where similar
 * this schema (array of objects where each object has an array of lines) is present to format the data for filtering.
 *
 * @param data (array of objects where each object has an array of lines)
 * @returns {Array}
 */
export const flatten = data => {
  let flattened = [];

  data.forEach(record => {
    if (record.lines && Array.isArray(record.lines) && record.lines.length > 0) {
      record.lines.forEach(line => {
        flattened.push(line);
      });
    }

    let { lines, ...recordWithoutLines } = record;

    flattened.push(recordWithoutLines);
  });
  return flattened;
};

export const compare = (obj1, obj2) => {
  if (obj1.sort < b.sort) {
    return -1;
  }
  if (obj1.sort > obj2.sort) {
    return 1;
  }
};
