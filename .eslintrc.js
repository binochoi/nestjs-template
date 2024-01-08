module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  extends: [
    '@binochoi/eslint-config-typescript',
  ],
  plugins: ['drizzle'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'drizzle/enforce-delete-with-where': ['error', { 'drizzleObjectName': ['db', 'tx'] }],
    'drizzle/enforce-update-with-where': ['error', { 'drizzleObjectName': ['db', 'tx'] }],
  }
};
