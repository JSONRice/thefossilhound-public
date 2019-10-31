import PropTypes from "prop-types";

export const column = {
  key: PropTypes.string, // required => the name of the variable that will display
  header: PropTypes.oneOfType([
    PropTypes.string, // a translatable label
    PropTypes.func // a function that returns jsx for special cases, such as a tooltip for the header title
  ]), // required => the header title or cell content
  lineKey: PropTypes.string, // optional => if a line (subrow) is displayed, use this variable name instead
  link: PropTypes.shape({
    // optional =>link configuration if the column data should be a link to somewhere
    href: PropTypes.string, // the href of where the link goes
    hasAccessRole: PropTypes.string // what role should be checked if access is required to use the link
  }),
  type: PropTypes.oneOf(["link", "currency", "percent"]), // optional => sets what kind of data it is so a special component can be used to render the data, aka a Link or Amount
  width: PropTypes.string // set the width of the column (although this is technically optional, if you adjust one column width, you will probably need to do them all)
};

export const reportOptions = {
  name: PropTypes.string, // Required if using connected print button => name of the report option, also required if using handlePrintReport function in pdf-utils
  displayName: PropTypes.string, // Optional => the translatable label for a the radio option button
  hidden: PropTypes.bool, // optional => if you want a radio option hidden
  printReport: PropTypes.func // => optional => used in connected print report if each report option should have it's on onSubmit function rather than use the handlePrintReport function
};
