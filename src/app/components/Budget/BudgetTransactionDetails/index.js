import { financialTransactionTypes } from "../../../utils/constants";
import { hasAccess } from "../../../services/security-service";

export { DesktopHeader } from "./DesktopHeader";
export { MobileHeader } from "./MobileHeader";
export { DesktopRow } from "./DesktopRow";
export { MobileRow } from "./MobileRow";

export function getBudgetTransactionLink(row) {
  let link = {
    hasAccess: false,
    url: "",
    hook: {}
  };
  switch (row.transactionTypeId) {
    case financialTransactionTypes.DONATION:
      link.hasAccess = hasAccess("DONATIONS_BATCH_DETAIL");
      link.url = `/#/donations/detail`;
      link.hook.donationBatchId = row.transactionId;
      link.hook.forceReload = "Y";
      break;
    case financialTransactionTypes.DONATION_ADJUSTMENT:
      link.hasAccess = hasAccess("DONATIONS_BATCH_DETAIL");
      link.url = `/#/donations/donation`;
      link.hook.donationAdjustmentId = row.transactionId;
      break;
    case financialTransactionTypes.DISBURSEMENT:
      link.hasAccess = hasAccess("EXPENSES_EXPENSE_DETAIL");
      link.url = `/#/expenses/detail`;
      link.hook.disbursementId = row.transactionId;
      break;
    case financialTransactionTypes.DISBURSEMENT_ADJUSTMENT:
      link.hasAccess = hasAccess("EXPENSES_EXPENSE_DETAIL");
      link.url = `/#/expenses/detail`;
      link.hook.disbursementAdjustmentId = row.transactionId;
      break;
    case financialTransactionTypes.TRANSFERS:
      link.hasAccess = hasAccess("TRANSFERS");
      link.url = `/#/transfers/detail`;
      link.hook.transferId = row.transactionId;
      link.hook.loadSingleTransfer = true;
      break;
    case financialTransactionTypes.TELLER_ENTRY:
      link.hasAccess = hasAccess("TRANSFERS");
      link.url = `/#/transfers/detail`;
      link.hook.tellerEntryBatchId = row.transactionId;
  }
  if (row.categoryName === row.subcategoryName) {
    link.hook.catOrSubcatType = "cat";
    link.hook.catOrSubcat = row.categoryId;
  } else {
    link.hook.catOrSubcatType = "subcat";
    link.hook.catOrSubcat = row.subcategoryId;
  }
  if (row.unitSubcategoryId) {
    link.hook.unitSubcat = row.unitSubcategoryId;
  }
  return link;
}
