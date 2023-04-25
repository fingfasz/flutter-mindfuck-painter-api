const express = require("express");
const router = express.Router();
const {
  createSketch,
  deleteSketch,
  getSketches,
} = require("../controllers/sketches_controller");

router.post("/create", createSketch);
router.post("/delete", deleteSketch);
router.get("/get", getSketches);

module.exports = router;
