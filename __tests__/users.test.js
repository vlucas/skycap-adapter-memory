const { reset, users } = require('../index');

describe('users', function () {

  afterEach(function () {
    reset();
  });

  it('should register a new user given an email and hashed password', function (done) {
    let name = 'Testy McTesterpants';
    let email = 'user@example.com';
    let hashedPassword = 'abc123';
    let profileData = {};

    users.register(name, email, hashedPassword, null, profileData)
      .then((result) => {
        expect(result).not.toBe(false);
        done();
      });
  });

  it('should find user with findByEmail after register', function (done) {
    let name = 'Testy McTesterpants';
    let email = 'user2@example.com';
    let hashedPassword = 'abc123';
    let profileData = {};

    users.register(name, email, hashedPassword, null, profileData)
      .then(() => {
        users.findByEmail(email)
          .then((result) => {
            expect(result).not.toBe(false);
            done();
          });
      });
  });

  it('should not register a user with the same email address more than once (email is unique)', function (done) {
    let name = 'Testy McTesterpants';
    let email = 'user@example.com';
    let hashedPassword = 'abc123';
    let profileData = {};

    users.register(name, email, hashedPassword, null, profileData)
      .then(() => {
        users.register(name, email, hashedPassword, null, profileData)
          .then(() => {
            expect(false).toBe(true); // intentional fail
            done();
          })
          .catch(() => {
            done();
          });
      });
  });

});
