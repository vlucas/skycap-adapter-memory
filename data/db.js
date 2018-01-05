let initialData = {
  users: [],
};

let _data;

/**
 * Get current data
 *
 * @return {Object}
 */
function data() {
  return _data;
}

/**
 * Reset data back to initialData
 */
function reset() {
  _data = JSON.parse(JSON.stringify(initialData));
}

reset();

module.exports = {
  data,
  reset,
};
