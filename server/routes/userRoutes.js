const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  updateProfile,
  getUser,
  deleteAccount,
} = require("../controllers/userControllers");
const upload = require("../middlewares/uploadMiddleware");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/update").patch(upload.single("profilePicture"), updateProfile);
router.route("/getUser").get(getUser);
router.route("/delete").delete(deleteAccount);

module.exports = router;
