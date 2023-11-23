const express = require("express");
const multer = require("multer")
const upload = multer({dest:"uploads"});
const {getAll, post, getByID, deleteById, putById} = require("../controller/controller");
// const { getUser } = require("../contoller");
const router = express.Router();

router.get("/todo", getAll);

router.get("/todo/:id", getByID);
// .delete("/user/:id", getUser)

router.post("/todo", post);

router.put("/todo/:id", putById);

router.delete("/todo/:id", deleteById);

//картинки

router.get("/img", upload.single("filedata"), getAllImg)

router.get("/img/:id", upload.single("filedata"), getImgById)

router.post("/img", upload.single("filedata"), postImg)

router.put("/img/:id", upload.single("filedata"), putImgById)

router.delete("/img/:id", upload.single("filedata"), deleteImgById)


module.exports = router;