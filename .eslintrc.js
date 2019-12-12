module.exports = {
  env: {
    es6: true,
    browser: true,
    jest: true,
  },
  extends: ['plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
}
