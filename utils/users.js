//* Store all users
const users = [];

//* Join user to chat
const userJoin = (id, username, room) => {
  // creates user
  const user = { id, username, room };
  // adds user to user list
  users.push(user);
  return user;
};

//* Get current user
const getCurrentUser = (id) => {
  // finds user by id and return user
  return users.find((user) => user.id === id);
};

//* User leaves chat
const userLeaves = (id) => {
  const index = users.findIndex((user) => user.id === id);
  // return the user
  if (index !== -1) return users.splice(index, 1)[0];
};

//* Get room users
const getRoomUsers = (room) => {
  return users.filter((user) => user.room === room);
};

module.exports = {
  userJoin,
  getCurrentUser,
  userLeaves,
  getRoomUsers,
};
