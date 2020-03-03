const path = require('path');

const UserProfile = require('../../database/models/userProfile.js');

const allKeys = [
  'g', 'h', 'b', 'n', 't', 'y', '5', '6', 'f', 'j', 'v',
  'm', 'r', 'u', '4', '7', 'd', 'k', 'c', ',', 'e', 'i',
  '3', '8', 's', 'l', 'x', '.', 'w', 'o', '2', '9', 'a',
  ';', 'z', '/', 'q', 'p', '1', '0', '`', "'", '[', '-',
  ']', '=', '\\', 'G', 'H', 'B', 'N', 'T', 'Y', '%', '^',
  'F', 'J', 'V', 'M', 'R', 'U', '$', '&', 'D', 'K', 'C',
  '<', 'E', 'I', '#', '*', 'S', 'L', 'X', '>', 'W', 'O',
  '@', '(', 'A', ':', 'Z', '?', 'Q', 'P', '!', ')', '~',
  '"', '{', '_', '}', '+', '|',
];

const startDate = new Date();
const newData = allKeys.map((key, index) => (
  {
    key,
    time: 0,
    lastAttempt: new Date(startDate.getDate() + index * 1000),
    history: [1],
  }
));

// create
const create = (userIp, callback) => {
  const newProfile = new UserProfile({
    id: userIp,
    keys: newData,
  });
  newProfile.save((err, profile) => { // do a callback instead (probably)
    if (err) {
      callback(err);
    }
    callback(null, profile);
  });
};

// read
exports.find = (userIp, callback) => {
  UserProfile.findOne({ id: userIp }, (err, result) => {
    if (err) {
      callback(err);
    } else if (!result) {
      create(userIp, callback);
    } else {
      callback(null, result);
    }
  });
};

// update

// delete
// exports.remove = (userIp) => {
//   console.log('Removing User!');
//   UserProfile.findByIdAndDelete(userIp);
// };
