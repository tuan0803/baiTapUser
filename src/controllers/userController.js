const userModel = require('../models/userModel');

// list user
async function getUsers(req, res) {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ error: 'List users failed' });
  }
}
// get user
async function getUserID(req, res){
    try {
        const msv = req.params.msv;
        const user = await userModel.getUser(msv)
        res.status(200).json({user})
    } catch (err) {
        res.status(404).json({err: 'Not found user'})
    }
}

// add User new
function createUser (req, res) {
    const newUser  = req.body;
  
    userModel.addUser (newUser , (err, result) => {
      if (err) {
        return res.status(400).json({ error: 'Add user new fail' });
      }
      res.status(201).json({ message: 'Add User successful', id: result.insertId });
    });
  }

//Delete User
async function deleteUser (req, res) {
    try {
      const msv = req.params.msv;
      await userModel.deleteUser (msv);
      res.status(200).json({ message: "User  deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(404).json({err: 'Not found user'})
    }
}

async function checkUserExists(req, res, next) {

    const msv = req.body.msv;
    try {
      const user = await userModel.getUser (msv);
      if (user) {
        return res.status(400).json({ error: 'MSV exists' });
      }
      next();
    } catch (error) {
      return res.status(500).json({ error: 'Error checking user existence' });
  
    }
  
}
module.exports = { getUsers, getUserID, createUser, deleteUser, checkUserExists };
