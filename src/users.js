const { data } = require('../data/db');

/**
 * Find an existsting user by email address
 *
 * @param email {String}
 *
 * @return {Promise}
 */
function findByEmail(email) {
  let user = data().users.find(user => user.email === email);

  return Promise.resolve(user || false);
}

/**
 * Register a new user
 *
 * @param name {String}
 * @param email {String}
 * @param hashedPassword {String}
 * @param username {String}
 * @param profileData {Object}
 *
 * @return {Promise}
 */
function register(name, email, hashedPassword, username = null, profileData = {}) {
  return findByEmail(email)
    .then(user => {
      // Ensure user does not already exist
      if (user !== false) {
        return Promise.reject('User already exists!');
      }

      let NOW = new Date();
      let storedUser = Object.assign({}, profileData, {
        name,
        email,
        password: hashedPassword,
        username,
        dt_created: NOW,
        dt_updated: NOW
      });

      data().users.push(storedUser);

      return Promise.resolve(storedUser);
    });
}

module.exports = {
  findByEmail,
  register,
};
