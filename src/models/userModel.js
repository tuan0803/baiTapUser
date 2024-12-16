const db = require('../config/db');


async function getAllUsers() {
  const [rows] = await db.query
  ('SELECT * FROM users');
  return rows;
}

// find userID
async function getUser(userMSV){
  const allUsers = await getAllUsers();
  return new Promise((resolve) => {
    const user = allUsers.find((user) => user.msv === userMSV)
    resolve(user);
  })
 }


// Add user

async function addUser (user) {
  const { name, msv, birth, class: className } = user;
  const date = new Date(birth);
  try {
    const [result] = await db.query(
      'INSERT INTO users (name, msv, birth, class) VALUES (?, ?, ?, ?)',
      [name, msv, date, className] 
    );
    return result;
  } catch (error) {
      console.error('Error inserting user:', error);
      throw error;
    }
}

// Delete user

async function deleteUser(userMSV){
  try {
    await getUser(userMSV);
    await db.execute(
      `DELETE FROM users 
      WHERE msv = ?`,
      [userMSV]
    );
    return result;
  } catch (error) {
      console.log(error);
      throw error;
  }
}

module.exports = { getAllUsers, getUser, addUser, deleteUser };
