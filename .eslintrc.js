module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      pragma: 'h',
      version: 'detect',
    },
    preact: {
      pragma: 'h',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:preact/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: [
    "build/"
  ],
  plugins: ['preact', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    // Add custom rules here
  },
};