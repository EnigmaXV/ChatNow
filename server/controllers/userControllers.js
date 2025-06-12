const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");
const generateCookies = require("../utils/generateCookies");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isExistedUser = await User.findOne({ email });
    if (isExistedUser) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "User already exists please try to login" });
    }
    const user = await User.create({ name, email, password });
    generateCookies(user, res);
    res.status(StatusCodes.CREATED).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Please provide email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Invalid email or password" });
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Invalid email or password" });
    }
    generateCookies(user, res);
    res.status(StatusCodes.OK).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie("auth-token");
    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }
    user.name = name || user.name;
    user.email = email || user.email;

    if (req.file) {
      const res = await cloudinary.uploader.upload(req.file.path);
      user.profilePicture = res.secure_url;
    }
    await user.save();
    res.status(StatusCodes.OK).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
const getUser = async (req, res) => {
  try {
    const currentUser = User.findOne({ _id: req.user.userId }).select(
      "-password"
    );
    if (!currentUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }
    res.status(StatusCodes.OK).json({
      success: true,
      currentUser,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  updateProfile,
  getUser,
  deleteAccount,
};
