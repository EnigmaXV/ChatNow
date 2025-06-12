const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getMessages,
  deleteMessage,
  getContacts,
} = require("../controllers/messageControllers");
const upload = require("../middlewares/uploadMiddleware");
const protect = require("../middlewares/authMiddleware");

router.route("/send/:id").post(protect, upload.single("image"), sendMessage);
router.route("/getMessages/:id").get(protect, getMessages);
router.route("/delete/:id").delete(protect, deleteMessage);
router.route("/getContacts").get(protect, getContacts);

module.exports = router;
