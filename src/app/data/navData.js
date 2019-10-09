const navData = [
  {
    label: "Home",
    dropdown: [
      {
        label: "LEADER & CLERK RESOURCES",
        link: "/"
      },
      {
        label: "LDS.ORG",
        link: "https://lds.org/"
      }
    ]
  },
  {
    label: "Overview",
    feature: "OVERVIEW",
    dropdown: [
      {
        label: "Expense Summary",
        link: "/overview/expense-summary",
        optionalLink: "/income-expense-consolidated",
        feature: "OVERVIEW_INCOME_EXPENSE_SUMMARY"
      },
      {
        label: "Expense Details",
        link: "/overview/expense-details",
        feature: "OVERVIEW_INCOME_EXPENSE_DETAIL"
      }
    ]
  },
  {
    label: "Donations",
    link: "/donations",
    feature: "DONATIONS_BATCHES_SUMMARY"
  },
  {
    label: "Expenses",
    feature: "EXPENSES",
    link: "/expenses"
  },
  {
    label: "Transfers",
    link: "/transfers",
    feature: "TRANSFERS"
  },
  {
    label: "Participants",
    link: "/participants",
    feature: "PARTICIPANT"
  },
  {
    label: "Tithing Settlement",
    link: "/tithing-settlement",
    feature: "TITHING_SETTLEMENT"
  },
  {
    label: "Reports",
    feature: "REPORTS",
    dropdown: [
      {
        label: "Action Items",
        link: "/reports/action-items",
        feature: "REPORTS_ACTION_ITEMS"
      },
      {
        label: "Bank Supplies",
        link: "/reports/bank-supplies",
        feature: "REPORTS_BANK_SUPPLIES"
      },
      {
        label: "Budget",
        link: "/reports/budget",
        feature: "REPORTS_BUDGET"
      },
      {
        label: "Donations",
        link: "/reports/donations",
        feature: "REPORTS_DONATIONS"
      },
      {
        label: "Financial Statements",
        link: "/reports/financial-statements",
        feature: "REPORTS_FINANCIAL_STATEMENTS"
      },
      {
        label: "Payment Cards",
        link: "/reports/payment-cards",
        instrumentIds: [9, 12],
        feature: "REPORTS_PAYMENT_CARDS"
      }
    ]
  },
  {
    label: "Help",
    dropdown: [
      {
        label: "Help Center",
        link: "/help/help-center"
      },
      {
        label: "Financial Training Lessons",
        link: "/help/consolidated-financial-statement"
      },
      {
        label: "Donor Statements",
        context: "/reports/donations",
        link: "/help/donor-statement"
      },
      {
        label: "Unit Financial Statements",
        context: "/reports/financial-statements",
        link: "/help/unit-financial-statement"
      },
      {
        label: "Consolidated Financial Statements",
        orgTypeIds: [5, 6],
        context: "/reports/financial-statements",
        link: "/help/consolidated-financial-statement"
      }
    ]
  }
];

export default navData;
