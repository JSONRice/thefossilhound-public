export const TableHeaderConstants = {
  desktop: [
    {
      key: "kingdom",
      header: "kingdom",
      lineKey: "kingdomName",
      width: "25%"
    },
    {
      key: "phylum",
      header: "phylum",
      width: "25%"
    },
    {
      key: "class",
      header: "class",
      width: "25%"
    },
    {
      key: "link",
      header: "link",
      link: {
        href: "/collections",
        filterKey: "collections"
      },
      type: "link",
      width: "25%"
    }
  ],
  tablet: [
    {
      key: "kingdom",
      header: "kingdom",
      lineKey: "kingdomName",
      width: "33.3333%"
    },
    {
      key: "class",
      header: "class",
      width: "33.3333%"
    },
    {
      key: "link",
      header: "link",
      link: {
        href: "/collections",
        filterKey: "collections"
      },
      type: "link",
      width: "33.3333%"
    }
  ],
  mobile: [
    { key: "class", header: "class", width: "66.5%" },
    {
      key: "link",
      header: "link",
      link: { href: "/collections", filterKey: "collections" },
      type: "link",
      width: "26.5%"
    }
  ]
};
