module.exports = {
  extends: [
    './eslint_configs/defaults.json',
    './eslint_configs/es6.json',
    './eslint_configs/node.json'
  ],

  rules: {
    'new-cap': 1,
    'no-underscore-dangle': 0
  }
};
