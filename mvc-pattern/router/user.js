const express = require("express");
const {
  handleGetAllUsers,
  handleCreateUser,
  handleGetUserById,
  deleteUserById,
} = require("../controller/user");

const router = express.Router();

router.get("/", handleGetAllUsers);

router.post("/", handleCreateUser);

router.route("/:id").get(handleGetUserById).delete(deleteUserById);

module.exports = router;
