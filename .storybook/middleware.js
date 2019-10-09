const express = require("express");

const expressMiddleWare = router => {
  router.use("/static", express.static("./src/app/static"));
};

module.exports = expressMiddleWare;
