export const oneItem = [
  {
    label: "Donations",
    link: "#/donations",
    feature: "DONATIONS_BATCHES_SUMMARY"
  }
];

export const allItems = [
  {
    label: "Home",
    dropdown: [
      {
        label: "LEADER & CLERK RESOURCES",
        link: "https://stage.lds.org/mls/mbr/?lang=eng"
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
        link: "#/income-expense",
        optionalLink: "#/income-expense-consolidated",
        feature: "OVERVIEW_INCOME_EXPENSE_SUMMARY"
      },
      {
        label: "Expense Details",
        link: "#/income-expense/details",
        feature: "OVERVIEW_INCOME_EXPENSE_DETAIL"
      }
    ]
  },
  {
    label: "Donations",
    link: "#/donations",
    feature: "DONATIONS_BATCHES_SUMMARY"
  },
  {
    label: "Expenses",
    feature: "EXPENSES",
    link: "#/expenses"
  },
  {
    label: "Transfers",
    link: "#/transfers",
    feature: "TRANSFERS"
  },
  {
    label: "Participants",
    link: "#/participants",
    feature: "PARTICIPANT"
  },
  {
    label: "Tithing Settlement",
    link: "#/tithing-settlement",
    feature: "TITHING_SETTLEMENT"
  },
  {
    label: "Reports",
    feature: "REPORTS",
    dropdown: [
      {
        label: "Action Items",
        link: "#/reports/action_items",
        feature: "REPORTS_ACTION_ITEMS"
      },
      {
        label: "Bank Supplies",
        link: "#/reports/bank_supplies",
        feature: "REPORTS_BANK_SUPPLIES"
      },
      {
        label: "Budget",
        link: "#/reports/budget",
        feature: "REPORTS_BUDGET"
      },
      {
        label: "Donations",
        link: "#/reports/donations",
        feature: "REPORTS_DONATIONS"
      },
      {
        label: "Financial Statements",
        link: "#/reports/financial_statements",
        feature: "REPORTS_FINANCIAL_STATEMENTS"
      },
      {
        label: "Payment Cards",
        link: "#/reports/payment_cards",
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
        link: "link.help.center"
      },
      {
        label: "Financial Training Lessons",
        link: "link.help.financial.training.lessons"
      },
      {
        label: "Donor Statement",
        context: "#/reports/donations",
        link: "link.help.DON-014"
      },
      {
        label: "Unit Financial Statement",
        context: "#/reports/financial_statements",
        link: "link.help.AMR-006"
      },
      {
        label: "Consolidated Financial Statement",
        orgTypeIds: [5, 6],
        context: "#/reports/financial_statements",
        link: "link.help.AMR-007"
      }
    ]
  }
];
