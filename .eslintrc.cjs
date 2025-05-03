module.exports = {
    root: true,
    env: {
      browser: true,
      node: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:prettier/recommended' // optional, if using Prettier
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ['react', 'react-hooks', 'jsx-a11y'],
    rules: {
      // Customize your rules here
      'react/prop-types': 'off', // disable prop-types if using TypeScript
      'react/react-in-jsx-scope': 'off', // for React 17+
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'prettier/prettier': ['warn'],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  };
  