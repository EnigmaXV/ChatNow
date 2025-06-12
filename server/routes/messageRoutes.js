const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getMessages,
  deleteMessage,
  getContacts,
} = require("../controllers/messageControllers");

router.route("/send").post(sendMessage);
router.route("/getMessages").get(getMessages);
router.route("/delete").delete(deleteMessage);
router.route("/getContacts").get(getContacts);

module.exports = router;
