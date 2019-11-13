export const SpeciesTableHeaderConstants = {
  desktop: [
    {
      key: "kingdom",
      header: "kingdom",
      lineKey: "kingdomName",
      width: "12.5"
    },
    {
      key: "phylum",
      header: "phylum",
      width: "12.5"
    },
    {
      key: "class",
      header: "class",
      width: "12.5"
    },
    {
      key: "order",
      header: "order",
      width: "12.5"
    },
    {
      key: "family",
      header: "family",
      width: "12.5"
    },
    {
      key: "genus",
      header: "genus",
      width: "12.5"
    },
    {
      key: "link",
      header: "species",
      width: "12.5",
      link: {
        href: "/collections",
        filterKey: "collections"
      },
      type: "link"
    },
  ],
  tablet: [
    {
      key: "order",
      header: "order",
      width: "12.5"
    },
    {
      key: "family",
      header: "family",
      width: "12.5"
    },
    {
      key: "genus",
      header: "genus",
      width: "12.5"
    },
    {
      key: "species",
      header: "species",
      width: "12.5",
      link: {
        href: "/collections",
        filterKey: "collections"
      },
      type: "link"
    },
  ],
  mobile: [
    {
      key: "genus",
      header: "genus",
      width: "12.5"
    },
    {
      key: "species",
      header: "species",
      width: "12.5",
      link: {
        href: "/collections",
        filterKey: "collections"
      },
      type: "link"
    },
  ]
};
