const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find({});
  res.json(allDbUsers);
}

async function handleCreateUser(req, res) {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender
  )
    return res.status(400).json({ response: "invalid request" });

  const result = await User.create({
    id: body.id,
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
  });

  console.log(" User Created " + result);

  return res.status(201).json({ response: "user created" });
}

async function handleGetUserById(req, res) {
  const id = req.params.id;
  const userById = await User.findById({ _id: id });

  if (!userById)
    res.status(404).send("No such user found"); // Send error if no match
  else res.json(userById);
}

async function deleteUserById(req, res) {
  const id = req.params.id;
  await User.deleteOne({ _id: id });
  res.json({ response: "Success" });
}

module.exports = {
  deleteUserById,
  handleGetAllUsers,
  handleCreateUser,
  handleGetUserById,
};
