const userModel = require('../models/userModel');

// List user
async function getUsers(req, res) {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

// Get user by MSV
async function getUserID(req, res) {
  try {
    const msv = req.params.msv;
    const user = await userModel.getUser(msv);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching user' });
  }
}

// Add new user
async function createUser(req, res) {
  const newUser = req.body;
  try {
    const result = await userModel.addUser(newUser);
    res.status(201).json({ message: 'User added successfully', id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to add user' });
  }
}

// Delete user by MSV
async function deleteUser(req, res) {
  try {
    const msv = req.params.msv;
    const user = await userModel.getUser(msv);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await userModel.deleteUser(msv);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
}

// Check if user exists before creating
async function checkUserExists(req, res, next) {
  const msv = req.body.msv;
  try {
    const user = await userModel.getUser(msv);
    if (user) {
      return res.status(400).json({ error: 'MSV already exists' });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error checking user existence' });
  }
}

module.exports = { getUsers, getUserID, createUser, deleteUser, checkUserExists };
