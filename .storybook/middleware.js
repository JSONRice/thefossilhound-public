const express = require("express");

const expressMiddleWare = router => {
  router.use("/", express.static("./src/app/public"));
};

module.exports = expressMiddleWare;
