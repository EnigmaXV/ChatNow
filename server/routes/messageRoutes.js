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
router.route("/delete/:id").delete(protect, deleteMessage);
router.route("/contacts").get(protect, getContacts);
router.route("/:id").get(protect, getMessages);

module.exports = router;
