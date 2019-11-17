export const TableHeaderConstants = {
  desktop: [
    {
      key: "kingdom",
      header: "kingdom",
      lineKey: "kingdomName",
      width: "20%"
    },
    {
      key: "phylum",
      header: "phylum",
      width: "20%"
    },
    {
      key: "class",
      header: "class",
      width: "20%"
    },
    {
      key: "link",
      header: "link",
      link: {
        href: "/collections",
        filterKey: "collections"
      },
      type: "link",
      width: "20%"
    }
  ],
  tablet: [
    {
      key: "kingdom",
      header: "kingdom",
      lineKey: "kingdomName",
      width: "30%"
    },
    {
      key: "class",
      header: "class",
      width: "30%"
    },
    {
      key: "link",
      header: "link",
      link: {
        href: "/collections",
        filterKey: "collections"
      },
      type: "link",
      width: "30%"
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
