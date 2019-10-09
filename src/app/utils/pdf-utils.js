import { get } from "@lds/universal-env";

const { CREDENTIALS } = get();
const credentials = CREDENTIALS ? JSON.parse(CREDENTIALS) : null;

/**
 * Opens a PDF in a new window (tab)
 *
 * Example url:
 *
 * `${credentials.endpoint}/pdf/budget-summary-report?orgId=12345&beginDate=201901&endDate=201902`,
 *
 * @param orgId
 * @param beginDate
 * @param endDate
 */
export const loadBudgetSummaryPdf = (
  orgId = "",
  beginMonth = "",
  endMonth = "",
  year = "",
  subCatId = "",
  unitSubCatId = ""
) => {
  window.open(
    `${
      credentials.endpoint
    }/pdf/budget-summary-report?orgId=${orgId}&beginMonth=${beginMonth}&endMonth=${endMonth}&year=${year}&subCatId=${subCatId}&unitSubCatId=${unitSubCatId}`,
    "_blank"
  );
};

/**
 * Opens a PDF in a new window (tab)
 *
 * Example url:
 *
 * `${credentials.endpoint}/pdf/budget-detail-report?orgId=12345&beginDate=201901&endDate=201902&subCatId=25&unitSubCatId=870036`
 *
 * @param orgId
 * @param beginDate
 * @param endDate
 * @param subCatId
 * @param unitSubCatId
 */
export const loadBudgetDetailPdf = (
  orgId = "",
  beginMonth = "",
  endMonth = "",
  year = "",
  subCatId = "",
  unitSubCatId = ""
) => {
  window.open(
    `${
      credentials.endpoint
    }/pdf/budget-detail-report?orgId=${orgId}&beginMonth=${beginMonth}&endMonth=${endMonth}&year=${year}&subCatId=${subCatId}&unitSubCatId=${unitSubCatId}`,
    "_blank"
  );
};
