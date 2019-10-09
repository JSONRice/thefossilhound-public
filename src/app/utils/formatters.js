// region cached values
import { getLocale } from "./initialization";
// endregion

// region Numbers & Currency

/**
 * @param {Number}  val
 * @param {String}  currencyCode (defaults to USD)
 * @param {Object}  [options]
 * @param {String}  [options.locale=getLocale()]
 * @param {Boolean} [options.negativeParens=false]
 * @param {Object}  [options.formatterOptions]
 *
 * @returns {?String}
 */
export function formatCurrencyWithSymbol(
  val,
  currencyCode = "USD",
  { locale, negativeParens, ...formatterOptions } = {}
) {
  if (Number.isNaN(val) || val == null) {
    return null;
  }

  const finalLocale = locale ? locale : getLocale();

  const formatter = new Intl.NumberFormat(finalLocale, {
    ...formatterOptions,

    style: "currency",
    currency: currencyCode
  });

  return _formatNumberWithNegativeParens(negativeParens, val, formatter.format(negativeParens ? Math.abs(val) : val));
}

/**
 * Round algorithm for the percentage spent.
 *
 * If no value has been provided or the percent spent is not a number return null else if
 * number is between 99 and 100 then just round down to 99 else perform a whole integer round.
 *
 * @param percentSpent
 * @returns {*}
 */
export function roundPercentSpent(percentSpent) {
  if (percentSpent === 0) {
    return percentSpent;
  }

  return !percentSpent || typeof percentSpent !== "number"
    ? null
    : percentSpent > 99 && percentSpent < 100
    ? 99
    : percentSpent < 0
    ? 0
    : Math.round(percentSpent);
}

export function formatCurrency(val, currencyCode, { locale, negativeParens, ...formatterOptions } = {}) {
  if (Number.isNaN(val) || val == null) {
    return null;
  }

  const finalLocale = locale ? locale : getLocale();

  const formatter = new Intl.NumberFormat(finalLocale, {
    ...formatterOptions,

    style: "currency",
    currency: currencyCode,
    currencyDisplay: "code"
  });

  return _formatNumberWithNegativeParens(
    negativeParens,
    val,
    formatter
      .format(negativeParens ? Math.abs(val) : val)
      .replace(currencyCode, "")
      .trim()
  );
}

/**
 * @param {!(Function|Number)} val - The value to format
 * @param {Object}             [options] - @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
 * @param {?String}            [options.locale]
 * @param {?Boolean}           [options.negativeParens = false]
 * @param {?Boolean}           [options.treatNullAsZero = false]
 *
 * @returns {String}
 */
export function formatNumber(val, { locale, negativeParens, treatNullAsZero, ...formatterOptions } = {}) {
  if (treatNullAsZero && val === null) {
    val = 0;
  } else if (Number.isNaN(val) || val == null) {
    return null;
  }

  const finalLocale = locale ? locale : getLocale();

  const formatter = new Intl.NumberFormat(finalLocale, formatterOptions);

  return _formatNumberWithNegativeParens(negativeParens, val, formatter.format(negativeParens ? Math.abs(val) : val));
}

/** @private */
function _formatNumberWithNegativeParens(negativeParens, val, formattedVal) {
  return negativeParens && val < 0 ? `(${formattedVal})` : formattedVal;
}

/**
 * @param {!(Function|Number)} val - The value to format
 * @param {Object}             [options] - @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
 * @param {?String}            [options.locale]
 * @param {?Boolean}           [options.negativeParens = false]
 * @param {?Boolean}           [options.treatNullAsZero = false]
 *
 * @returns {?String}
 */
export function formatPercent(val, options) {
  return formatNumber(val, { ...options, style: "percent" });
}

// endregion

// region dates

export function formatDate(date, local = getLocale()) {
  if (typeof date === "string") {
    if (date.match(/^\d\d\d\d-\d\d-\d\d$/)) {
      date = date.substr(0, 4) + "/" + date.substr(5, 2) + "/" + date.substr(8, 2);
    } else if (date.match(/\d\d\d\d-\d\d-\d\d.*/)) {
      // do nothing, already a timestamp
    } else {
      console.log("Received a string date not in format yyyy-mm-dd");
      return date;
    }
    date = new Date(date);
  }

  let day = "",
    month = "",
    year = "";
  Intl.DateTimeFormat(local, {
    day: "2-digit",
    month: "short",
    year: "numeric"
  })
    .formatToParts(date)
    .map(({ type, value }) => {
      return { [type]: value };
    })
    .forEach(p => {
      // There's just one key to check
      let k = Object.keys(p)[0];
      switch (k) {
        case "day":
          day = p[k];
          break;
        case "month":
          month = p[k];
          break;
        case "year":
          year = p[k];
          break;
      }
    });

  return `${day} ${month} ${year}`;
}

// endregion
