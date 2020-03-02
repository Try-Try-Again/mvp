module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
  },
  plugins: [
    'react',
    //"react-hooks",
  ],
  rules: {
    "react/jsx-filename-extension": [0],
    "import/extensions": "off",
    // "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    // "react-hooks/exhaustive-deps": "warn",// Checks effect dependencies
  },
};
