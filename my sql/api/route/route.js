const express = require("express");
const {getAll, post, getByID, deleteById, putById} = require("../controller/controller");
// const { getUser } = require("../contoller");
const router = express.Router();

router.get("/todo", getAll);

router.get("/todo/:id", getByID);
// .delete("/user/:id", getUser)

router.post("/todo", post);

router.put("/todo/:id", putById);

router.delete("/todo/:id", deleteById);

module.exports = router;